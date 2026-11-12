import { AiOracleStrategy } from './strategies/AiOracleStrategy'
import { LocalOracleStrategy } from './strategies/LocalOracleStrategy'
import type { SpiritResponseStrategy } from './strategies/SpiritResponseStrategy'

const MAX_LEN = 40

export function normalizeForBoard(text: string): string {
  return text
    .toUpperCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Z0-9 ]/g, '')
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
  } catch {
    answer = await new LocalOracleStrategy().askSpirit(question)
  }
  const normalized = normalizeForBoard(answer)
  return normalized || normalizeForBoard(await new LocalOracleStrategy().askSpirit(question))
}
