export const THEME_KEY = 'theme'
export const THEME_QUERY = '(prefers-color-scheme: dark)'

const listeners = new Set()
let memory = null // respaldo si localStorage no está disponible

const isPreference = (v) => v === 'light' || v === 'dark' || v === 'system'

export const readPreference = () => {
    try {
        const v = localStorage.getItem(THEME_KEY)
        if (isPreference(v)) return v
    } catch { /* storage no disponible */ }
    return memory ?? 'system'
}

export const writePreference = (value) => {
    if (!isPreference(value)) return
    memory = value
    try { localStorage.setItem(THEME_KEY, value) } catch { /* noop */ }
    listeners.forEach((l) => l())
}

export const subscribePreference = (cb) => {
    listeners.add(cb)
    window.addEventListener('storage', cb) // sincroniza entre pestañas
    return () => {
        listeners.delete(cb)
        window.removeEventListener('storage', cb)
    }
}

export const readSystem = () =>
    window.matchMedia(THEME_QUERY).matches ? 'dark' : 'light'

export const subscribeSystem = (cb) => {
    const mq = window.matchMedia(THEME_QUERY)
    mq.addEventListener('change', cb)
    return () => mq.removeEventListener('change', cb)
}