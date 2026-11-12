import { useEffect, useReducer, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { consultGhost } from '../features/spirit-oracle/oracleService'
import { OuijaBoard } from '../features/ouija-board/components/OuijaBoard'
import { GOODBYE, REST, usePlanchetteSimulation } from '../features/ouija-board/hooks/usePlanchetteSimulation'

type State = 'IDLE' | 'WRITING' | 'SUMMONING' | 'MANIFESTING' | 'EXORCISED'
type Action = { type: 'SUBMIT' } | { type: 'SUMMON' } | { type: 'MANIFEST' } | { type: 'DONE' } | { type: 'EXORCISE' } | { type: 'RESET' }

function reducer(state: State, action: Action): State {
  if (action.type === 'EXORCISE') return 'EXORCISED'
  switch (state) {
    case 'IDLE':
      return action.type === 'SUBMIT' ? 'WRITING' : state
    case 'WRITING':
      return action.type === 'SUMMON' ? 'SUMMONING' : state
    case 'SUMMONING':
      return action.type === 'MANIFEST' ? 'MANIFESTING' : state
    case 'MANIFESTING':
      return action.type === 'DONE' ? 'IDLE' : state
    case 'EXORCISED':
      return action.type === 'RESET' ? 'IDLE' : state
  }
}

const STATUS: Record<State, string> = {
  IDLE: 'El fantasma espera tu reclamo.',
  WRITING: 'Registrando el reclamo en el libro…',
  SUMMONING: 'Consultando al más allá…',
  MANIFESTING: 'El fantasma delibera su veredicto…',
  EXORCISED: 'Sesión exorcizada.',
}

const MAX_CLAIM_LENGTH = 100
const D = 2000
const MANIFEST_DELAY = 900
const NBSP = ' '

export default function App() {
  const [state, dispatch] = useReducer(reducer, 'IDLE')
  const [apiKey, setApiKey] = useState('')
  const [question, setQuestion] = useState('')
  const [humanMessage, setHumanMessage] = useState('')
  const [ghostAnswer, setGhostAnswer] = useState('')
  const turn = useRef(0)
  const timers = useRef<number[]>([])
  const sim = usePlanchetteSimulation()

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }
  useEffect(() => clearTimers, [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const text = question.trim().slice(0, MAX_CLAIM_LENGTH)
    if (state !== 'IDLE' || !text) return
    const id = ++turn.current
    const alive = () => turn.current === id
    dispatch({ type: 'SUBMIT' })
    setQuestion('')
    clearTimers()
    timers.current.push(
      window.setTimeout(() => {
        if (!alive()) return
        setHumanMessage(text)
        dispatch({ type: 'SUMMON' })
      }, D),
      window.setTimeout(() => {
        if (alive()) dispatch({ type: 'MANIFEST' })
      }, D + MANIFEST_DELAY),
    )
    const oracle = consultGhost(text, apiKey).catch(() => 'Su queja fue archivada')
    const [answer] = await Promise.all([oracle, sim.simulate(2 * D + MANIFEST_DELAY)])
    if (!alive()) return
    clearTimers()
    setGhostAnswer(answer)
    dispatch({ type: 'DONE' })
  }

  const exorcise = () => {
    if (state === 'EXORCISED') return
    turn.current++
    clearTimers()
    sim.cancel(GOODBYE)
    setGhostAnswer('ADIÓS')
    dispatch({ type: 'EXORCISE' })
  }

  const restart = () => {
    turn.current++
    clearTimers()
    sim.cancel(REST)
    setQuestion('')
    setHumanMessage('')
    setGhostAnswer('')
    dispatch({ type: 'RESET' })
  }

  const busy = state !== 'IDLE'

  return (
    <main className="app">
      <header className="head">
        <div>
          <p className="eyebrow">HACKATÓN INTEGRAR</p>
          <h1>Libro de Quejas Espectral</h1>
        </div>
        <div className="keybox">
          <label htmlFor="apikey" className="key-label">Abrí el Inframundo con tu API Key</label>
          <input
            id="apikey"
            type="password"
            autoComplete="off"
            placeholder="Clave de Gemini o Groq"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="help">Dejala para conversar con el fantasma más cercano. Sin clave, atiende el de guardia.</p>
        </div>
      </header>

      <section className="panel ghost" aria-live="polite">
        <span className="panel-label">EL FANTASMA RESPONDE</span>
        <p className="ghost-text">{ghostAnswer || NBSP}</p>
      </section>

      <OuijaBoard pose={sim.pose} animate={sim.animate} />

      <p className="status">{STATUS[state]}</p>

      <section className="panel human">
        <span className="panel-label">TU RECLAMO</span>
        <p className="human-text">{humanMessage || NBSP}</p>
      </section>

      <form className="form" onSubmit={submit}>
        <div className="field">
          <label htmlFor="claim">Escribí tu reclamo para el fantasma</label>
          <input
            id="claim"
            type="text"
            maxLength={MAX_CLAIM_LENGTH}
            placeholder="¿Quién cortó el Wi-Fi anoche?"
            value={question}
            onChange={(e) => setQuestion(e.target.value.slice(0, MAX_CLAIM_LENGTH))}
            disabled={busy}
            aria-describedby="claim-counter"
          />
          <span
            id="claim-counter"
            className={`counter${question.length >= MAX_CLAIM_LENGTH ? ' full' : ''}`}
          >
            {question.length}/{MAX_CLAIM_LENGTH}
          </span>
        </div>
        <button type="submit" className="primary" disabled={busy}>
          Invocar Respuesta
        </button>
        <button type="button" className="danger" onClick={exorcise} disabled={state === 'EXORCISED'}>
          ¡EXORCIZAR!
        </button>
      </form>

      {state === 'EXORCISED' && (
        <div className="notice">
          <p>El fantasma fue despedido. No se aceptan más reclamos en esta sesión.</p>
          <button type="button" className="primary" onClick={restart}>
            Reiniciar sesión
          </button>
        </div>
      )}
    </main>
  )
}
