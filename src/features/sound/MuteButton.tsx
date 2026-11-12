type Props = { muted: boolean; onToggle: () => void }

export function MuteButton({ muted, onToggle }: Props) {
  return (
    <button
      type="button"
      className="mute-btn"
      onClick={onToggle}
      aria-pressed={muted}
      aria-label={muted ? 'Activar sonidos' : 'Silenciar sonidos'}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#f0dcae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4z" fill="#f0dcae" />
        {muted ? (
          <>
            <line x1="17" y1="9" x2="22" y2="15" />
            <line x1="22" y1="9" x2="17" y2="15" />
          </>
        ) : (
          <>
            <path d="M16.5 8.5a5 5 0 0 1 0 7" />
            <path d="M19 6a8.5 8.5 0 0 1 0 12" />
          </>
        )}
      </svg>
    </button>
  )
}
