export type SoundName = 'susurro' | 'pluma' | 'veredicto' | 'muajaja' | 'uuuh'

const CONFIG: Record<SoundName, { volume: number; loop?: boolean }> = {
  susurro: { volume: 0.25, loop: true },
  pluma: { volume: 0.4 },
  veredicto: { volume: 0.5 },
  muajaja: { volume: 0.7 },
  uuuh: { volume: 0.15 },
}

const STORAGE_KEY = 'ouija-muted'
const FADE_MS = 300

const audios: Partial<Record<SoundName, HTMLAudioElement>> = {}
let muted = readMuted()
let fadeTimer: number | undefined

function readMuted(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function safe(fn: () => void) {
  try {
    fn()
  } catch {
    /* audio must never break the app */
  }
}

function init() {
  if (typeof Audio === 'undefined') return
  ;(Object.keys(CONFIG) as SoundName[]).forEach((name) => {
    safe(() => {
      const a = new Audio(`/sounds/${name}.mp3`)
      a.preload = 'auto'
      a.loop = !!CONFIG[name].loop
      a.volume = CONFIG[name].volume
      audios[name] = a
    })
  })
}
init()

function cancelFade() {
  if (fadeTimer !== undefined) {
    window.clearInterval(fadeTimer)
    fadeTimer = undefined
  }
}

export function play(name: SoundName) {
  if (muted) return
  safe(() => {
    const a = audios[name]
    if (!a) return
    if (name === 'susurro') cancelFade()
    a.volume = CONFIG[name].volume
    a.currentTime = 0
    const p = a.play()
    if (p && typeof p.catch === 'function') p.catch(() => {})
  })
}

export function stop(name: SoundName) {
  safe(() => {
    if (name === 'susurro') cancelFade()
    const a = audios[name]
    if (!a) return
    a.pause()
    a.currentTime = 0
  })
}

export function stopAll() {
  ;(Object.keys(CONFIG) as SoundName[]).forEach(stop)
}

export function fadeOut(name: SoundName, ms = FADE_MS) {
  safe(() => {
    const a = audios[name]
    if (!a || a.paused) return
    cancelFade()
    const start = a.volume
    const steps = 10
    let i = 0
    fadeTimer = window.setInterval(() => {
      i++
      safe(() => {
        a.volume = Math.max(0, start * (1 - i / steps))
      })
      if (i >= steps) {
        cancelFade()
        stop(name)
        safe(() => {
          a.volume = CONFIG[name].volume
        })
      }
    }, ms / steps)
  })
}

export function isMuted() {
  return muted
}

export function setMuted(value: boolean) {
  muted = value
  try {
    window.localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
  } catch {
    /* ignore */
  }
  if (value) stopAll()
}
