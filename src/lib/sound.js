import { useSyncExternalStore } from 'react'
import { IS_LITE } from './lite'

const KEY = 'lc-sound'
let enabled = (() => {
    try {
        const v = localStorage.getItem(KEY)
        if (v !== null) return v === '1'
    } catch { /* noop */ }
    return !IS_LITE
})()
let unlocked = false
let ctx = null
const subs = new Set()

if (typeof window !== 'undefined') {
    window.addEventListener('pointerdown', () => { unlocked = true }, { once: true, passive: true })
}

const ensure = () => {
    if (!enabled || !unlocked) return null
    if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext
        if (!AC) return null
        ctx = new AC()
    }
    if (ctx.state === 'suspended') ctx.resume()
    return ctx
}

const tone = ({ f = 800, f2 = f, dur = 0.06, type = 'sine', vol = 0.03 }) => {
    const c = ensure()
    if (!c) return
    const t = c.currentTime
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = type
    o.frequency.setValueAtTime(f, t)
    o.frequency.exponentialRampToValueAtTime(f2, t + dur)
    g.gain.setValueAtTime(vol, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g).connect(c.destination)
    o.start(t)
    o.stop(t + dur + 0.01)
}

const noise = (dur = 0.18, vol = 0.02) => {
    const c = ensure()
    if (!c) return
    const n = Math.floor(c.sampleRate * dur)
    const buf = c.createBuffer(1, n, c.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n)
    const s = c.createBufferSource()
    const g = c.createGain()
    s.buffer = buf
    g.gain.value = vol
    s.connect(g).connect(c.destination)
    s.start()
}

export const sfx = {
    tick: () => tone({ f: 1500, f2: 1100, dur: 0.035, type: 'triangle', vol: 0.015 }),
    click: () => tone({ f: 520, f2: 260, dur: 0.07, type: 'square', vol: 0.015 }),
    channel: () => {
        noise(0.25, 0.012)
        tone({ f: 180, f2: 420, dur: 0.22, type: 'sine', vol: 0.02 })
    },
}

export const setSound = (v) => {
    enabled = v
    try { localStorage.setItem(KEY, v ? '1' : '0') } catch { /* noop */ }
    subs.forEach((cb) => cb())
    if (v) sfx.click()
}

export const useSound = () =>
    useSyncExternalStore(
        (cb) => { subs.add(cb); return () => subs.delete(cb) },
        () => enabled,
        () => false,
    )