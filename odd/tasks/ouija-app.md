# Ouija App

Objective: working Vite + React + TS app per README.md and docs/patrones-de-diseno.md. Speed over polish.
Constraints: NO tests of any kind (user decision). TDD: off (user). Checks: `pnpm build` passes.
Route: delegated direct (writer trigger: 2+ non-trivial files).

- [x] T1 Scaffold Vite React TS (pnpm), .gitignore
- [x] T2 spirit-oracle feature: Strategy (AI Gemini/Groq + Local) + Facade `consultGhost`
- [x] T3 ouija-board feature: board, coordinates.ts, usePlanchetteAnimation queue
- [x] T4 App.tsx state machine (IDLE/SUMMONING/SPELLING/EXORCISED) + Exorcise button + API key input
- [x] T5 `pnpm build` green, commit
