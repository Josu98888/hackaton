import { useEffect, useMemo, useRef } from 'react'
import { DiplomaArt } from './DiplomaArt'

type Props = { claimCount: number; onClose: () => void; onRestart: () => void }

const DEFAULT_NAME = 'el Humano de esta Casa'

function claimsText(n: number): string {
  if (n === 0) return 'sin presentar un solo reclamo'
  return n === 1 ? 'tras presentar 1 reclamo' : `tras presentar ${n} reclamos`
}

function todayText(): string {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`
}

export function DiplomaModal({ claimCount, onClose, onRestart }: Props) {
  const saveRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  // Generated once per mount (i.e. once per opening).
  const acta = useMemo(() => `666-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`, [])
  const date = useMemo(todayText, [])

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    saveRef.current?.focus()
    return () => {
      const target = previous && document.contains(previous) ? previous : document.getElementById('claim')
      target?.focus()
    }
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key !== 'Tab') return
    const items = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])')
    if (!items || items.length === 0) return
    const first = items[0]
    const last = items[items.length - 1]
    const active = document.activeElement
    if (e.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && (active === last || !dialogRef.current?.contains(active))) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="diploma-overlay" onKeyDown={onKeyDown}>
      <div
        ref={dialogRef}
        className="diploma-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="diploma-titulo"
      >
        <div className="diploma-print">
          <DiplomaArt name={DEFAULT_NAME} claims={claimsText(claimCount)} date={date} acta={acta} />
        </div>
        <div className="diploma-actions">
          <button ref={saveRef} type="button" className="primary" onClick={() => window.print()}>
            Guardar diploma
          </button>
          <button type="button" className="secondary" onClick={onRestart}>
            Reiniciar sesión
          </button>
        </div>
      </div>
    </div>
  )
}
