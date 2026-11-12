import { useCallback, useEffect, useRef, useState } from 'react'
import { GOODBYE, pointFor, REST, type Point } from '../coordinates'

interface MoveCommand {
  char: string
  target: Point
}

const STEP_MS = 600

export function usePlanchetteAnimation(onDone?: () => void) {
  const queue = useRef<MoveCommand[]>([])
  const timer = useRef<number | null>(null)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  const [position, setPosition] = useState<Point>(REST)
  const [activeChar, setActiveChar] = useState<string | null>(null)
  const [spelled, setSpelled] = useState('')

  const stop = () => {
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = null
  }

  const step = useCallback(() => {
    const cmd = queue.current.shift()
    if (!cmd) {
      timer.current = null
      setActiveChar(null)
      onDoneRef.current?.()
      return
    }
    setPosition(cmd.target)
    setActiveChar(cmd.char === ' ' ? null : cmd.char)
    setSpelled((s) => s + cmd.char)
    timer.current = window.setTimeout(step, STEP_MS)
  }, [])

  const enqueueText = useCallback(
    (text: string) => {
      stop()
      setSpelled('')
      queue.current = text.split('').map((char) => ({ char, target: pointFor(char) }))
      timer.current = window.setTimeout(step, 300)
    },
    [step],
  )

  const flushToGoodbye = useCallback(() => {
    stop()
    queue.current = []
    setPosition(GOODBYE)
    setActiveChar('ADIOS')
  }, [])

  const reset = useCallback(() => {
    stop()
    queue.current = []
    setPosition(REST)
    setActiveChar(null)
    setSpelled('')
  }, [])

  useEffect(() => stop, [])

  return { position, activeChar, spelled, enqueueText, flushToGoodbye, reset }
}
