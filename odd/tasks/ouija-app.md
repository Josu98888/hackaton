# Ouija App

Objective: working Vite + React + TS app per README.md and docs/patrones-de-diseno.md. Speed over polish.
Constraints: NO tests of any kind (user decision). TDD: off (user). Checks: `pnpm build` passes.
Route: delegated direct (writer trigger: 2+ non-trivial files).

- [x] T1 Scaffold Vite React TS (pnpm), .gitignore
- [x] T2 spirit-oracle feature: Strategy (AI Gemini/Groq + Local) + Facade `consultGhost`
- [x] T3 ouija-board feature: board, coordinates.ts, usePlanchetteAnimation queue
- [x] T4 App.tsx state machine (IDLE/SUMMONING/SPELLING/EXORCISED) + Exorcise button + API key input
- [x] T5 `pnpm build` green, commit

## Rework: final design (docs/diseno/README.md, main 876902e)
Route: delegated direct (writer trigger). Branch rebased onto main.
- [x] T6 Replace letter-spelling queue with `usePlanchetteSimulation` (simulate/cancel), drop coordinates.ts
- [x] T7 5-state machine IDLE/WRITING/SUMMONING/MANIFESTING/EXORCISED with timed turn sequence + cancel on exorcise
- [x] T8 Inline tablero.svg/plancheta.svg, fonts, colors, layout, texts, a11y per design doc
- [x] T9 Facade keeps accents/Ñ; `pnpm build` green, commit

## Sounds and flying ghosts (docs/sonidos/README.md, docs/diseno/fantasma.md, main 9ef127c)
Route: delegated direct (writer trigger). Branch rebased onto main.
- [x] T10 Sound manager: preload, volumes, susurro loop + 300ms fade, pluma, veredicto, muajaja (exorcise cuts all), fail silently
- [x] T11 Mute button in header with aria-label, persisted in localStorage
- [x] T12 Three flying ghosts (inline fantasma.svg), hidden on reduced-motion and EXORCISED
- [x] T13 `pnpm build` green, commit
