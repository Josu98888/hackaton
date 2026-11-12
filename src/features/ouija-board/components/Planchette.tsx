import type { Point } from '../coordinates'

export function Planchette({ position }: { position: Point }) {
  return (
    <div className="planchette" style={{ left: `${position.x}%`, top: `${position.y}%` }}>
      <div className="planchette-eye" />
    </div>
  )
}
