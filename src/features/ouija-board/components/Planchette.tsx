export interface Pose {
  left: number
  top: number
  rot: number
}

export function Planchette({ pose, animate }: { pose: Pose; animate: boolean }) {
  return (
    <div
      className="planchette"
      aria-hidden="true"
      style={{
        left: `${pose.left}%`,
        top: `${pose.top}%`,
        transform: `translate(-50%, -50%) rotate(${pose.rot}deg)`,
        transition: animate ? 'left 520ms ease-in-out, top 520ms ease-in-out, transform 520ms ease-in-out' : 'none',
      }}
    >
      <svg viewBox="0 0 120 150" aria-hidden="true">
        <path d="M60 4 C95 30 116 70 104 108 C96 136 76 146 60 146 C44 146 24 136 16 108 C4 70 25 30 60 4 Z" fill="#3a2413" fillOpacity="0.94" stroke="#1c1108" strokeWidth="3" />
        <path d="M60 18 C88 40 104 72 95 104 C89 126 73 135 60 135 C47 135 31 126 25 104 C16 72 32 40 60 18 Z" fill="none" stroke="#e6cf9c" strokeOpacity="0.5" strokeWidth="1.5" />
        <circle cx="60" cy="88" r="22" fill="#f0dcae" fillOpacity="0.3" stroke="#e6cf9c" strokeWidth="3" />
      </svg>
    </div>
  )
}
