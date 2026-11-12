import { useReducer, useRef, useState } from 'react'
import { consultGhost } from '../features/spirit-oracle/oracleService'
import { OuijaBoard } from '../features/ouija-board/components/OuijaBoard'
import { usePlanchetteAnimation } from '../features/ouija-board/hooks/usePlanchetteAnimation'

type State = 'IDLE' | 'SUMMONING' | 'SPELLING' | 'EXORCISED'
type Action = { type: 'SUBMIT' } | { type: 'ANSWER' } | { type: 'DONE' } | { type: 'EXORCISE' } | { type: 'RESET' }

function reducer(state: State, action: Action): State {
  switch (state) {
    case 'IDLE':
      return action.type === 'SUBMIT' ? 'SUMMONING' : action.type === 'EXORCISE' ? 'EXORCISED' : state
    case 'SUMMONING':
      return action.type === 'ANSWER' ? 'SPELLING' : action.type === 'EXORCISE' ? 'EXORCISED' : state
    case 'SPELLING':
      return action.type === 'DONE' ? 'IDLE' : action.type === 'EXORCISE' ? 'EXORCISED' : state
    case 'EXORCISED':
      return action.type === 'RESET' ? 'IDLE' : state
  }
}

const LABELS: Record<State, string> = {
  IDLE: 'El espíritu espera tu queja...',
  SUMMONING: 'Invocando al espíritu...',
  SPELLING: 'El espíritu habla...',
  EXORCISED: 'Fantasma exorcizado. Adiós.',
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, 'IDLE')
  const [apiKey, setApiKey] = useState('')
  const [question, setQuestion] = useState('')
  const exorcisedRef = useRef(false)
  const anim = usePlanchetteAnimation(() => dispatch({ type: 'DONE' }))

  const submit = async () => {
    if (state !== 'IDLE' || !question.trim()) return
    exorcisedRef.current = false
    dispatch({ type: 'SUBMIT' })
    anim.reset()
    const answer = await consultGhost(question, apiKey)
    // Exorcism during SUMMONING: reducer ignores ANSWER, but we must not animate.
    if (!exorcisedRef.current) {
      dispatch({ type: 'ANSWER' })
      anim.enqueueText(answer)
    }
  }

  const exorcise = () => {
    exorcisedRef.current = true
    dispatch({ type: 'EXORCISE' })
    anim.flushToGoodbye()
  }

  const restart = () => {
    exorcisedRef.current = false
    anim.reset()
    setQuestion('')
    dispatch({ type: 'RESET' })
  }

  return (
    <main className="app">
      <h1>Libro de Quejas Espectral</h1>
      <input
        className="key"
        type="password"
        placeholder="API Key de Gemini o Groq (opcional)"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        autoComplete="off"
      />
      <OuijaBoard position={anim.position} activeChar={anim.activeChar} />
      <p className="spelled">{anim.spelled || ' '}</p>
      <p className="status">{LABELS[state]}</p>
      <textarea
        placeholder="Escribe tu reclamo (ej: ¿Dónde dejaste mis llaves?)"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={state !== 'IDLE'}
        rows={3}
      />
      <div className="buttons">
        <button onClick={submit} disabled={state !== 'IDLE' || !question.trim()}>
          Invocar Respuesta
        </button>
        <button className="danger" onClick={exorcise} disabled={state === 'EXORCISED'}>
          ¡EXORCIZAR!
        </button>
        {state === 'EXORCISED' && <button onClick={restart}>Reiniciar sesión</button>}
      </div>
    </main>
  )
}
