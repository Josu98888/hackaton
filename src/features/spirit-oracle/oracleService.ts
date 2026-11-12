import { AiOracleStrategy } from './strategies/AiOracleStrategy'
import { LocalOracleStrategy } from './strategies/LocalOracleStrategy'
import type { SpiritResponseStrategy } from './strategies/SpiritResponseStrategy'

const MAX_LEN = 60

export function normalizeForBoard(text: string): string {
  return text
    .toUpperCase()
    .replace(/[^A-ZÁÉÍÓÚÜÑ0-9 ¿?¡!.,]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_LEN)
    .trim()
}

export async function consultGhost(question: string, apiKey?: string): Promise<string> {
  const key = apiKey?.trim()
  const strategy: SpiritResponseStrategy = key ? new AiOracleStrategy(key) : new LocalOracleStrategy()
  let answer: string
  try {
    answer = await strategy.askSpirit(question)
  } catch (err) {
    console.warn('[oracle] AI failed, falling back to local:', err)
    answer = await new LocalOracleStrategy().askSpirit(question)
  }
  const normalized = normalizeForBoard(answer)
  return normalized || normalizeForBoard(await new LocalOracleStrategy().askSpirit(question))
}
