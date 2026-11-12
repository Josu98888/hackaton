import type { SpiritResponseStrategy } from './SpiritResponseStrategy'

const SYSTEM_PROMPT =
  'Eres el fantasma burocrata y sarcástico de una casa. Respondes quejas de clientes humanos en español, con sarcasmo, maximo 8 palabras, usando acentos y la letra Ñ cuando corresponda, sin emojis.'

// Tried in order; falls through on errors like 503 (high demand) or 404 (retired model).
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-flash-lite-latest', 'gemini-flash-latest']

export class AiOracleStrategy implements SpiritResponseStrategy {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async askSpirit(question: string): Promise<string> {
    // Groq keys start with "gsk_"; anything else is treated as Gemini ("AIza..." or the newer "AQ." format).
    return this.apiKey.startsWith('gsk_') ? this.groq(question) : this.gemini(question)
  }

  private async gemini(question: string): Promise<string> {
    let lastError: unknown
    for (const model of GEMINI_MODELS) {
      try {
        return await this.geminiModel(model, question)
      } catch (err) {
        lastError = err
      }
    }
    throw lastError
  }

  private async geminiModel(model: string, question: string): Promise<string> {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(this.apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: 'user', parts: [{ text: question }] }],
        }),
      },
    )
    if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`)
    const data = await res.json()
    const parts: { text?: string; thought?: boolean }[] = data?.candidates?.[0]?.content?.parts ?? []
    const text = parts.filter((p) => p.text && !p.thought).map((p) => p.text).join(' ')
    if (!text) throw new Error('Respuesta vacia')
    return text
  }

  private async groq(question: string): Promise<string> {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: question },
        ],
      }),
    })
    if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`)
    const data = await res.json()
    const text = data?.choices?.[0]?.message?.content
    if (!text) throw new Error('Respuesta vacia')
    return String(text)
  }
}
