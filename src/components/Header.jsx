import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Volume2, VolumeX, ArrowUpRight, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { sfx, useSound } from '../lib/sound'

export const Logo = ({ className = 'h-5 w-auto' }) => (
  <svg viewBox="0 0 140 106" fill="currentColor" className={className} aria-hidden="true">
    <polygon points="0,0 60,32 60,50 0,82 0,58 31,41 0,24" />
    <rect x="70" y="88" width="70" height="18" />
  </svg>
)

const NAV_LINKS = [
  { name: 'Inicio', path: '/' },
  { name: 'Sobre mí', path: '/sobre-mi' },
  { name: 'Experiencia', path: '/experiencia' },
  { name: 'Proyectos', path: '/proyectos' },
]

export const Header = () => {
  const { pathname } = useLocation()
  const sound = useSound()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 20)
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > 140)
          last = y
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${hidden && !open ? '-translate-y-full' : ''}`}
      >
        <div
          className={`transition-all duration-300 ${scrolled || open
              ? 'border-b border-white/10 bg-[#070b19]/90 py-3 backdrop-blur-xl'
              : 'border-transparent bg-transparent py-5'
            }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6">
            {/* Logo y marca */}
            <Link
              to="/"
              aria-label="Lux.dev — Inicio"
              className="flex items-center gap-2.5 text-white transition-colors hover:text-blue-400"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                <Logo className="h-4 w-auto" />
              </div>
              <span className="font-display text-base font-bold tracking-wider text-white">
                Lux.dev
              </span>
            </Link>

            {/* Navegación central tipo píldoras */}
            <nav aria-label="Principal" className="hidden items-center gap-1 rounded-full bg-[#0b132b]/80 p-1.5 border border-white/10 backdrop-blur-md lg:flex">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onMouseEnter={sfx.tick}
                    aria-current={active ? 'page' : undefined}
                    className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${active ? 'text-white' : 'text-slate-300 hover:text-white'
                      }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-blue-600 shadow-lg shadow-blue-600/30"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Controles de la derecha */}
            <div className="flex items-center gap-3">
              <Link
                to="/contacto"
                data-cursor="HABLEMOS"
                onClick={sfx.click}
                className="hidden items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 shadow-md shadow-blue-600/20 sm:inline-flex"
              >
                Hablemos
              </Link>

              <button
                onClick={() => setSound(!sound)}
                aria-pressed={sound}
                aria-label={sound ? 'Silenciar sonidos' : 'Activar sonidos'}
                className="rounded-full p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white border border-white/10"
              >
                {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              <button
                aria-label="Configuración"
                className="rounded-full p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white border border-white/10"
              >
                <Settings size={16} />
              </button>

              <button
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={open}
                className="rounded-lg p-2 text-white lg:hidden"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            className="fixed inset-0 z-40 bg-[#070b19] px-6 pt-24 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.05 } }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-white/10 py-4 text-2xl font-semibold text-white"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={20} className="text-blue-500" />
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.35 } }}
                className="pt-4"
              >
                <Link
                  to="/contacto"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-blue-600 py-3.5 text-center font-semibold text-white"
                >
                  Hablemos
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}