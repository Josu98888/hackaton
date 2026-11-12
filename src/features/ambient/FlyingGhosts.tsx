import type { AnimationEvent } from 'react'

const GHOSTS = [
  { cls: 'fantasma-vuelo', width: 'clamp(44px, 8vw, 110px)', opacity: 0.35, top: '38%', float: '2.6s' },
  { cls: 'fantasma-vuelo-2', width: 'clamp(36px, 6vw, 84px)', opacity: 0.3, top: '14%', float: '3.2s' },
  { cls: 'fantasma-vuelo-3', width: 'clamp(28px, 4.5vw, 60px)', opacity: 0.25, top: '72%', float: '2.1s' },
]

type Props = { onCross?: () => void }

export function FlyingGhosts({ onCross }: Props) {
  const handleIteration = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onCross?.()
  }
  return (
    <div className="ghost-layer" aria-hidden="true">
      {GHOSTS.map((g) => (
        <div
          key={g.cls}
          className={`fantasma ${g.cls}`}
          style={{ width: g.width, opacity: g.opacity, top: g.top }}
          onAnimationIteration={handleIteration}
        >
          <svg
            className="fantasma-cuerpo"
            style={{ animationDuration: g.float }}
            viewBox="0 0 72 84"
            aria-hidden="true"
          >
            <path d="M4 80 V34 a32 32 0 0 1 64 0 V80 l-10.7 -10 l-10.6 10 l-10.7 -10 l-10.7 10 l-10.6 -10 z" fill="#f0e2c0" stroke="#fff8e6" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="25" cy="34" r="5" fill="#14100c" />
            <circle cx="47" cy="34" r="5" fill="#14100c" />
            <ellipse cx="36" cy="51" rx="6" ry="8" fill="#14100c" />
          </svg>
        </div>
      ))}
    </div>
  )
}
