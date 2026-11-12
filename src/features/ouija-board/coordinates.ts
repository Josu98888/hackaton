export interface Point {
  x: number
  y: number
}

export const REST: Point = { x: 50, y: 62 }
export const GOODBYE: Point = { x: 50, y: 92 }

const ROW1 = 'ABCDEFGHIJKLM'
const ROW2 = 'NOPQRSTUVWXYZ'

export const COORDINATES: Record<string, Point> = {}

function arc(letters: string, y0: number, depth: number) {
  const n = letters.length
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1)
    COORDINATES[letters[i]] = { x: 10 + t * 80, y: y0 - Math.sin(t * Math.PI) * depth }
  }
}

arc(ROW1, 36, 8)
arc(ROW2, 56, 8)
'0123456789'.split('').forEach((c, i) => {
  COORDINATES[c] = { x: 14 + i * (72 / 9), y: 76 }
})
COORDINATES['SI'] = { x: 14, y: 12 }
COORDINATES['NO'] = { x: 86, y: 12 }
COORDINATES['ADIOS'] = GOODBYE
COORDINATES[' '] = REST

export function pointFor(char: string): Point {
  return COORDINATES[char] ?? REST
}
