import { useEffect, useMemo, useSyncExternalStore } from 'react'
import { ThemeContext } from './ThemeContext'
import {
    readPreference, writePreference, subscribePreference,
    readSystem, subscribeSystem,
} from './themeStore'

const THEME_COLOR = { dark: '#0d0b14', light: '#f7f5fc' }

export default function ThemeProvider({ children }) {
    const preference = useSyncExternalStore(subscribePreference, readPreference, () => 'system')
    const system = useSyncExternalStore(subscribeSystem, readSystem, () => 'dark')
    const resolved = preference === 'system' ? system : preference

    // Sincroniza el DOM (sistema externo): atributo, color-scheme y barra del navegador
    useEffect(() => {
        const root = document.documentElement
        root.dataset.theme = resolved
        root.dataset.themePref = preference
        root.style.colorScheme = resolved
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute('content', THEME_COLOR[resolved])
    }, [resolved, preference])

    const value = useMemo(
        () => ({ preference, resolved, setPreference: writePreference }),
        [preference, resolved],
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}