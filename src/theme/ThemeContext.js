import { createContext, useContext } from 'react'

export const ThemeContext = createContext({
    preference: 'system', // 'light' | 'dark' | 'system'
    resolved: 'dark',     // 'light' | 'dark' (el tema realmente aplicado)
    setPreference: () => { },
})

export const useTheme = () => useContext(ThemeContext)