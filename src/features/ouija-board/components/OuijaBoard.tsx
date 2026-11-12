import { BoardArt } from './BoardArt'
import { Planchette } from './Planchette'
import type { Pose } from './Planchette'

export function OuijaBoard({ pose, animate }: { pose: Pose; animate: boolean }) {
  return (
    <div className="board">
      <BoardArt />
      <Planchette pose={pose} animate={animate} />
    </div>
  )
}
