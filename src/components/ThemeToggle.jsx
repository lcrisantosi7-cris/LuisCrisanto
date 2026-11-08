import { useEffect, useRef, useState } from 'react'
import { Sun, Moon, Monitor, Check } from 'lucide-react'
import { useTheme } from '../theme/ThemeContext'

const OPTIONS = [
    { id: 'light', label: 'Claro', icon: Sun },
    { id: 'system', label: 'Sistema', icon: Monitor },
    { id: 'dark', label: 'Oscuro', icon: Moon },
]

// Alfas que se adaptan al tema (ver tokens en index.css)
const fill = (a) => `rgba(var(--ink-rgb), calc(${a} * var(--k-fill)))`
const text = (a) => `rgba(var(--ink-rgb), calc(${a} * var(--k-text)))`

// ── Variante móvil: control segmentado con etiquetas ────────────────────────
function Segmented() {
    const { preference, setPreference } = useTheme()

    const onKeyDown = (e) => {
        const i = OPTIONS.findIndex((o) => o.id === preference)
        let next = null
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % OPTIONS.length
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i + OPTIONS.length - 1) % OPTIONS.length
        if (next === null) return
        e.preventDefault()
        setPreference(OPTIONS[next].id)
        e.currentTarget.parentElement.querySelectorAll('[role="radio"]')[next]?.focus()
    }

    return (
        <div
            role="radiogroup"
            aria-label="Tema de la web"
            className="flex w-full gap-1 p-1 rounded-xl"
            style={{ background: fill(0.04), border: `1px solid ${fill(0.08)}` }}
        >
            {OPTIONS.map(({ id, label, icon: Icon }) => {
                const active = preference === id
                return (
                    <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        tabIndex={active ? 0 : -1}
                        onClick={() => setPreference(id)}
                        onKeyDown={onKeyDown}
                        className="flex-1 flex items-center justify-center gap-2 min-h-[44px] rounded-lg text-sm font-medium transition-colors duration-200"
                        style={{
                            background: active ? 'linear-gradient(90deg, #FC8F54, #F5525B)' : 'transparent',
                            color: active ? 'var(--on-accent)' : text(0.7),
                        }}
                    >
                        <Icon size={16} aria-hidden="true" />
                        {label}
                    </button>
                )
            })}
        </div>
    )
}

// ── Variante escritorio: botón con menú ─────────────────────────────────────
function Menu() {
    const { preference, resolved, setPreference } = useTheme()
    const [open, setOpen] = useState(false)
    const rootRef = useRef(null)
    const current = OPTIONS.find((o) => o.id === preference) ?? OPTIONS[1]
    const CurrentIcon = current.icon

    useEffect(() => {
        if (!open) return
        const onDown = (e) => {
            if (!rootRef.current?.contains(e.target)) setOpen(false)
        }
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setOpen(false)
                rootRef.current?.querySelector('button')?.focus()
            }
        }
        document.addEventListener('pointerdown', onDown)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('pointerdown', onDown)
            document.removeEventListener('keydown', onKey)
        }
    }, [open])

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label={`Tema: ${current.label}. Cambiar tema`}
                title={`Tema: ${current.label}`}
                className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200"
                style={{ background: fill(0.04), border: `1px solid ${fill(0.1)}`, color: text(0.7) }}
            >
                <CurrentIcon size={17} aria-hidden="true" />
            </button>

            {open && (
                <div
                    role="menu"
                    aria-label="Tema de la web"
                    className="absolute right-0 top-full mt-2 w-48 p-1.5 rounded-xl z-50"
                    style={{
                        background: 'rgba(var(--surface-rgb), 0.98)',
                        border: `1px solid ${fill(0.12)}`,
                        boxShadow: '0 16px 40px -12px rgba(0,0,0,0.35)',
                    }}
                >
                    {OPTIONS.map(({ id, label, icon: Icon }) => {
                        const active = preference === id
                        return (
                            <button
                                key={id}
                                type="button"
                                role="menuitemradio"
                                aria-checked={active}
                                onClick={() => { setPreference(id); setOpen(false) }}
                                className="w-full flex items-center gap-3 px-3 min-h-[40px] rounded-lg text-sm transition-colors duration-150 text-left"
                                style={{
                                    background: active ? fill(0.06) : 'transparent',
                                    color: active ? 'var(--ink)' : text(0.75),
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = fill(0.08) }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = active ? fill(0.06) : 'transparent' }}
                            >
                                <Icon size={15} aria-hidden="true" />
                                <span className="flex-1">
                                    {label}
                                    {id === 'system' && (
                                        <span className="block text-[11px]" style={{ color: text(0.55) }}>
                                            Ahora: {resolved === 'dark' ? 'oscuro' : 'claro'}
                                        </span>
                                    )}
                                </span>
                                {active && <Check size={14} aria-hidden="true" style={{ color: 'var(--accent-ink)' }} />}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default function ThemeToggle({ variant = 'menu' }) {
    return variant === 'segmented' ? <Segmented /> : <Menu />
}