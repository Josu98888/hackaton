import { useCallback, useEffect, useRef, useState } from 'react'
import type { Pose } from '../components/Planchette'

export const REST: Pose = { left: 50, top: 60, rot: 0 }
export const GOODBYE: Pose = { left: 50, top: 90, rot: 0 }
const rand = (a: number, b: number) => a + Math.random() * (b - a)

export function usePlanchetteSimulation() {
  const [pose, setPose] = useState<Pose>(REST)
  const [animate, setAnimate] = useState(true)
  const timer = useRef<number | undefined>(undefined)
  const finish = useRef<(() => void) | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const upd = () => setAnimate(!mq.matches)
    upd()
    mq.addEventListener('change', upd)
    return () => mq.removeEventListener('change', upd)
  }, [])

  const stop = useCallback(() => {
    window.clearInterval(timer.current)
    timer.current = undefined
    const f = finish.current
    finish.current = null
    f?.()
  }, [])

  const cancel = useCallback(
    (to: Pose = REST) => {
      stop()
      setPose(to)
    },
    [stop],
  )

  const simulate = useCallback(
    (durationMs: number) => {
      stop()
      return new Promise<void>((resolve) => {
        const jump = () => setPose({ left: rand(12, 88), top: rand(34, 88), rot: rand(-25, 25) })
        jump()
        timer.current = window.setInterval(jump, 480)
        const end = window.setTimeout(() => {
          cancel(REST)
        }, durationMs)
        finish.current = () => {
          window.clearTimeout(end)
          resolve()
        }
      })
    },
    [stop, cancel],
  )

  useEffect(() => () => stop(), [stop])

  return { pose, animate, simulate, cancel }
}
