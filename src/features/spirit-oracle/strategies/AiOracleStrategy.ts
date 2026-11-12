import type { SpiritResponseStrategy } from './SpiritResponseStrategy'

const SYSTEM_PROMPT =
  'Eres el fantasma burocrata y sarcástico de una casa. Respondes quejas de clientes humanos en español, con sarcasmo, maximo 8 palabras, usando acentos y la letra Ñ cuando corresponda, sin emojis.'

export class AiOracleStrategy implements SpiritResponseStrategy {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async askSpirit(question: string): Promise<string> {
    return this.apiKey.startsWith('AIza') ? this.gemini(question) : this.groq(question)
  }

  private async gemini(question: string): Promise<string> {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(this.apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: 'user', parts: [{ text: question }] }],
        }),
      },
    )
    if (!res.ok) throw new Error(`Gemini ${res.status}`)
    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) throw new Error('Respuesta vacia')
    return String(text)
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
    if (!res.ok) throw new Error(`Groq ${res.status}`)
    const data = await res.json()
    const text = data?.choices?.[0]?.message?.content
    if (!text) throw new Error('Respuesta vacia')
    return String(text)
  }
}
