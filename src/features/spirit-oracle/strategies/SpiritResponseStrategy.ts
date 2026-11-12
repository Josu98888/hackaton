export interface SpiritResponseStrategy {
  askSpirit(question: string): Promise<string>
}
