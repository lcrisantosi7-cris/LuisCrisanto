import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Volume2, VolumeX, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CHANNELS, CONTACT, channelFor } from '../lib/channels'
import { sfx, setSound, useSound } from '../lib/sound'

export const Logo = ({ className = 'h-5 w-auto' }) => (
  <svg viewBox="0 0 140 106" fill="currentColor" className={className} aria-hidden="true">
    <polygon points="0,0 60,32 60,50 0,82 0,58 31,41 0,24" />
    <rect x="70" y="88" width="70" height="18" />
  </svg>
)

export const Header = () => {
  const { pathname } = useLocation()
  const ch = channelFor(pathname)
  const sound = useSound()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  const [prev, setPrev] = useState(pathname)
  if (prev !== pathname) {
    setPrev(pathname)
    setOpen(false)
    setHidden(false)
  }

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
          className={`border-b transition-all duration-300 ${scrolled || open ? 'border-white/10 bg-ink-950/80 py-3 backdrop-blur-xl' : 'border-transparent bg-transparent py-5'
            }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6">
            <Link
              to="/"
              aria-label="Luis Crisanto — Inicio"
              data-cursor="INICIO"
              className="flex items-center gap-3 text-white transition-colors hover:text-channel"
            >
              <Logo />
              <span className="hidden font-mono text-xs uppercase tracking-[0.25em] text-ink-200 sm:block">
                Luis Crisanto
              </span>
            </Link>

            <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
              {CHANNELS.map((c) => {
                const active = ch.path === c.path
                return (
                  <Link
                    key={c.path}
                    to={c.path}
                    onMouseEnter={sfx.tick}
                    aria-current={active ? 'page' : undefined}
                    className="group relative px-4 py-2"
                  >
                    <span className={`block font-mono text-[10px] tracking-widest ${active ? 'text-channel' : 'text-ink-400 group-hover:text-channel'}`}>
                      CAM {c.cam}
                    </span>
                    <span className={`block text-sm font-medium ${active ? 'text-white' : 'text-ink-200 group-hover:text-white'}`}>
                      {c.name}
                    </span>
                    {active && (
                      <motion.span layoutId="channel-underline" className="absolute inset-x-3 -bottom-px h-[2px] bg-channel" />
                    )}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 text-xs text-ink-200 xl:flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-channel opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-channel" />
                </span>
                Disponible
              </div>

              <button
                onClick={() => setSound(!sound)}
                aria-pressed={sound}
                aria-label={sound ? 'Silenciar sonidos' : 'Activar sonidos'}
                data-cursor={sound ? 'MUTE' : 'SONIDO'}
                className="rounded-lg p-2 text-ink-200 transition hover:bg-white/5 hover:text-white"
              >
                {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              <Link
                to="/contacto"
                data-cursor="HABLEMOS"
                onClick={sfx.click}
                className="hidden items-center gap-1.5 rounded-full bg-channel px-4 py-2 text-sm font-semibold text-ink-950 transition hover:brightness-110 sm:inline-flex"
              >
                Hablemos <ArrowUpRight size={14} />
              </Link>

              <button
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={open}
                aria-controls="menu-movil"
                className="rounded-lg p-2 text-white lg:hidden"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            className="fixed inset-0 z-40 bg-ink-950 px-6 pt-24 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-1">
              {[...CHANNELS, CONTACT].map((c, i) => (
                <motion.li
                  key={c.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.05 } }}
                >
                  <Link to={c.path} className="flex items-baseline gap-4 border-b border-white/5 py-4">
                    <span className="font-mono text-xs tracking-widest" style={{ color: `rgb(${c.rgb})` }}>
                      {c.cam}
                    </span>
                    <span className="font-display text-4xl font-bold text-white">{c.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}