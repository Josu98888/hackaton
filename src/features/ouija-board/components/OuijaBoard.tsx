import { COORDINATES } from '../coordinates'
import type { Point } from '../coordinates'
import { Planchette } from './Planchette'

interface Props {
  position: Point
  activeChar: string | null
}

const KEYS = Object.keys(COORDINATES).filter((k) => k !== ' ')
const LABELS: Record<string, string> = { ADIOS: 'ADIÓS', SI: 'SÍ' }

export function OuijaBoard({ position, activeChar }: Props) {
  return (
    <div className="board">
      {KEYS.map((k) => {
        const p = COORDINATES[k]
        const cls = 'glyph' + (k.length > 1 ? ' word' : '') + (activeChar === k ? ' active' : '')
        return (
          <span key={k} className={cls} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            {LABELS[k] ?? k}
          </span>
        )
      })}
      <Planchette position={position} />
    </div>
  )
}
