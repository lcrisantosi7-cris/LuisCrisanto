import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
  motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion,
} from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { X, ArrowRight } from 'lucide-react'

const STORAGE_KEY = 'welcomeRobotClosed'
const ORANGE = '#FC8F54'

const getGreeting = () => {
  const h = new Date().getHours()
  return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'
}

// ── Texto que se escribe solo ─────────────────────────────────────────────────
function Typed({ text, instant }) {
  const [n, setN] = useState(instant ? text.length : 0)

  useEffect(() => {
    if (instant) { setN(text.length); return }
    setN(0)
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) { clearInterval(id); return v }
        return v + 1
      })
    }, 22)
    return () => clearInterval(id)
  }, [text, instant])

  return (
    // El texto completo va invisible para reservar el alto y evitar saltos
    <span className="relative block">
      <span className="invisible">{text}</span>
      <span className="absolute inset-0">
        {text.slice(0, n)}
        {n < text.length && <span style={{ color: ORANGE }}>▍</span>}
      </span>
    </span>
  )
}

// ── Robot SVG ─────────────────────────────────────────────────────────────────
function RobotSVG({ px, py, happy, waving, reduce }) {
  const rot = useTransform(px, [-4, 4], [-5, 5])
  const still = reduce

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className="w-[88px] h-[88px] sm:w-[124px] sm:h-[124px] overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rb-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FC8F54" />
          <stop offset="100%" stopColor="#6867D2" />
        </linearGradient>
        <radialGradient id="rb-flame">
          <stop offset="0%" stopColor="#FFD3A8" />
          <stop offset="45%" stopColor="#FC8F54" />
          <stop offset="100%" stopColor="#F5525B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sombra en el suelo */}
      <motion.ellipse
        cx="100" cy="192" rx="28" ry="4" fill="#FC8F54" opacity="0.15"
        animate={still ? undefined : { opacity: [0.08, 0.22, 0.08], rx: [22, 32, 22] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      />

      {/* Todo el robot flota */}
      <motion.g
        animate={still ? undefined : { y: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        {/* Símbolos de código flotando */}
        {!still && (
          <>
            <motion.text
              x="20" y="64" fontSize="11" fontFamily="ui-monospace, SFMono-Regular, monospace" fill="#6867D2"
              animate={{ y: [64, 56, 64], opacity: [0.3, 0.75, 0.3] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            >
              {'</>'}
            </motion.text>
            <motion.text
              x="160" y="50" fontSize="11" fontFamily="ui-monospace, SFMono-Regular, monospace" fill="#FC8F54"
              animate={{ y: [50, 42, 50], opacity: [0.3, 0.75, 0.3] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
            >
              {'{ }'}
            </motion.text>
          </>
        )}

        {/* Propulsor */}
        <motion.ellipse
          cx="100" cy="178" rx="9" ry="6" fill="url(#rb-flame)"
          animate={still ? undefined : { ry: [5, 9, 5], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
        />

        {/* Cuerpo */}
        <path
          d="M68 122 Q68 116 74 116 H126 Q132 116 132 122 L126 166 Q125 172 119 172 H81 Q75 172 74 166 Z"
          fill="#13101f" stroke="url(#rb-stroke)" strokeWidth="2"
        />
        <path d="M77 156 H123" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Panel del pecho */}
        <rect x="86" y="130" width="28" height="20" rx="5" fill="#0d0b14" stroke="rgba(252,143,84,0.35)" />
        <motion.text
          x="100" y="144" textAnchor="middle" fontSize="10" fontWeight="700"
          fontFamily="ui-monospace, SFMono-Regular, monospace" fill="#FC8F54"
          animate={still ? undefined : { opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          LC
        </motion.text>

        {/* Brazo izquierdo */}
        <path d="M68 128 Q54 140 58 158" stroke="#8a86a3" strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="58" cy="160" r="5.5" fill="#6867D2" />

        {/* Brazo derecho (saluda desde el hombro) */}
        <motion.g
          animate={{ rotate: waving && !still ? [0, -26, 10, -26, 10, 0] : 0 }}
          transition={
            waving && !still
              ? { duration: 1.8, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
          style={{ originX: 0, originY: 1 }}
        >
          <path d="M132 128 Q146 122 152 108" stroke="#8a86a3" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="153" cy="105" r="5.5" fill="#6867D2" />
        </motion.g>

        {/* Cabeza (se inclina hacia el cursor) */}
        <motion.g style={{ rotate: rot, originX: 0.5, originY: 1 }}>
          {/* Antena */}
          <line x1="100" y1="36" x2="100" y2="22" stroke="#8a86a3" strokeWidth="2.5" strokeLinecap="round" />
          <motion.circle
            cx="100" cy="18" r="4.5" fill="#F5525B"
            animate={still ? undefined : { opacity: [0.5, 1, 0.5], r: [4, 5, 4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />

          {/* Orejas */}
          <rect x="47" y="62" width="9" height="26" rx="4.5" fill="#13101f" stroke="#6867D2" strokeOpacity="0.6" />
          <rect x="144" y="62" width="9" height="26" rx="4.5" fill="#13101f" stroke="#6867D2" strokeOpacity="0.6" />

          {/* Cabeza y visor */}
          <rect x="54" y="36" width="92" height="74" rx="22" fill="#13101f" stroke="url(#rb-stroke)" strokeWidth="2" />
          <rect x="64" y="47" width="72" height="50" rx="16" fill="#0d0b14" stroke="rgba(255,255,255,0.06)" />

          {/* Ojos: siguen el cursor */}
          <motion.g style={{ x: px, y: py }}>
            {happy ? (
              <>
                <path d="M79 71 Q86 61 93 71" stroke="#FC8F54" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M107 71 Q114 61 121 71" stroke="#FC8F54" strokeWidth="4" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <motion.g
                animate={still ? undefined : { scaleY: [1, 0.1, 1] }}
                transition={{ duration: 0.22, repeat: Infinity, repeatDelay: 3.6 }}
                style={{ originX: 0.5, originY: 0.5 }}
              >
                <ellipse cx="86" cy="68" rx="7" ry="8.5" fill="#FC8F54" />
                <ellipse cx="114" cy="68" rx="7" ry="8.5" fill="#FC8F54" />
                <circle cx="88.5" cy="65" r="2.4" fill="#fff" />
                <circle cx="116.5" cy="65" r="2.4" fill="#fff" />
              </motion.g>
            )}
          </motion.g>

          {/* Mejillas */}
          <circle cx="74" cy="83" r="4" fill="#F5525B" opacity="0.28" />
          <circle cx="126" cy="83" r="4" fill="#F5525B" opacity="0.28" />

          {/* Boca */}
          <motion.path
            initial={false}
            animate={{ d: happy ? 'M89 82 Q100 95 111 82' : 'M92 84 Q100 89 108 84' }}
            transition={{ duration: 0.25 }}
            stroke="#FC8F54" strokeWidth="3" strokeLinecap="round" fill="none"
          />
        </motion.g>
      </motion.g>
    </svg>
  )
}

// ════════════════════════════════════════════════════════════════════════════
const WelcomeRobot = () => {
  const location = useLocation()
  const reduce = useReducedMotion()
  const isHome = location.pathname === '/'

  const messages = useMemo(
    () => [
      `${getGreeting()} 👋 Soy Luis.`,
      'Soy Full Stack Developer, con foco en backend y arquitectura en la nube.',
      'Mi proyecto destacado es RetailVision: detección de personas con YOLOv8 en tiempo real.',
      '¿Te muestro mis proyectos?',
    ],
    [],
  )

  const [mounted, setMounted] = useState(false)   // robot visible
  const [open, setOpen] = useState(false)   // globo visible
  const [idx, setIdx] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [greeting, setGreeting] = useState(true)    // saludo inicial con la mano
  const [happy, setHappy] = useState(false)

  const botRef = useRef(null)
  const happyTimer = useRef(null)

  // Seguimiento del cursor con los ojos
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 180, damping: 18 })
  const py = useSpring(my, { stiffness: 180, damping: 18 })

  // Aparición (solo en Home, y si no se ocultó en esta sesión)
  useEffect(() => {
    if (!isHome) {
      setMounted(false)
      setOpen(false)
      return
    }
    let dismissed = false
    try { dismissed = sessionStorage.getItem(STORAGE_KEY) === 'true' } catch { /* noop */ }
    if (dismissed) return

    const t1 = setTimeout(() => { setMounted(true); setOpen(true) }, 1000)
    const t2 = setTimeout(() => setGreeting(false), 4200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [isHome])

  // Avance automático de mensajes (se detiene en el último)
  useEffect(() => {
    if (!open || idx >= messages.length - 1) return
    const t = setTimeout(() => setIdx((i) => i + 1), 4800)
    return () => clearTimeout(t)
  }, [open, idx, messages.length])

  // Recoger el globo al hacer scroll y cerrar con Escape
  useEffect(() => {
    if (!mounted) return
    const onScroll = () => { if (window.scrollY > 320) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [mounted])

  // Ojos que siguen el cursor
  useEffect(() => {
    if (!mounted || reduce) return
    const onMove = (e) => {
      const el = botRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const dist = Math.hypot(dx, dy) || 1
      const k = Math.min(dist, 320) / 320
      mx.set((dx / dist) * 4 * k)
      my.set((dy / dist) * 3 * k)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mounted, reduce, mx, my])

  useEffect(() => () => clearTimeout(happyTimer.current), [])

  const celebrate = useCallback(() => {
    setHappy(true)
    clearTimeout(happyTimer.current)
    happyTimer.current = setTimeout(() => setHappy(false), 1400)
  }, [])

  const handleRobotClick = () => {
    celebrate()
    if (!open) setOpen(true)
    else setIdx((i) => (i + 1) % messages.length)
  }

  const dismiss = () => {
    setOpen(false)
    setMounted(false)
    try { sessionStorage.setItem(STORAGE_KEY, 'true') } catch { /* noop */ }
  }

  return (
    <AnimatePresence>
      {mounted && isHome && (
        <motion.div
          key="welcome-robot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex flex-col items-end pointer-events-none"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {/* ── GLOBO (compacto) ── */}
          <AnimatePresence>
            {open && (
              <motion.div
                key="bubble"
                role="region"
                aria-label="Mensaje de bienvenida"
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto relative mb-2.5 mr-1 w-[min(72vw,216px)] rounded-2xl px-3.5 py-3 origin-bottom-right"
                style={{
                  background: 'rgba(19,16,31,0.94)',
                  border: '1px solid rgba(252,143,84,0.25)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  boxShadow: '0 16px 40px -12px rgba(0,0,0,0.6), 0 0 24px rgba(252,143,84,0.08)',
                }}
              >
                <div className="flex items-start gap-2">
                  <p aria-live="polite" className="flex-1 text-[13px] leading-snug text-white/90 min-h-[2.4rem]">
                    <Typed key={idx} text={messages[idx]} instant={reduce} />
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar mensaje"
                    className="p-0.5 rounded-md transition-colors"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
                  >
                    <X size={13} />
                  </button>
                </div>

                {idx === messages.length - 1 && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-2.5">
                    <Link
                      to="/projects"
                      onClick={() => setOpen(false)}
                      className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white whitespace-nowrap transition-transform hover:scale-[1.03] active:scale-95"
                      style={{ background: 'linear-gradient(90deg, #FC8F54, #F5525B)' }}
                    >
                      Ver proyectos
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </motion.div>
                )}

                {/* Colita del globo */}
                <span
                  className="absolute -bottom-1.5 right-10 w-3 h-3 rotate-45"
                  style={{
                    background: 'rgba(19,16,31,0.94)',
                    borderRight: '1px solid rgba(252,143,84,0.25)',
                    borderBottom: '1px solid rgba(252,143,84,0.25)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── ROBOT ── */}
          <div className="relative group pointer-events-auto">
            <motion.button
              ref={botRef}
              type="button"
              onClick={handleRobotClick}
              onMouseEnter={() => { setHovered(true); celebrate() }}
              onMouseLeave={() => setHovered(false)}
              onFocus={() => setHovered(true)}
              onBlur={() => setHovered(false)}
              aria-label={open ? 'Siguiente mensaje' : 'Abrir mensaje de Luis'}
              aria-expanded={open}
              initial={{ y: 40, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              whileHover={reduce ? undefined : { scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="relative block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#FC8F54]/60"
            >
              <div
                className="absolute inset-0 -z-10 blur-2xl rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(252,143,84,0.2), rgba(104,103,210,0.12) 60%, transparent 75%)' }}
              />
              <RobotSVG px={px} py={py} happy={happy} waving={greeting || hovered} reduce={reduce} />
            </motion.button>

            {/* Ocultar el asistente en esta sesión */}
            <button
              type="button"
              onClick={dismiss}
              aria-label="Ocultar asistente"
              className="absolute -top-1 -left-1 p-1 rounded-full opacity-0 group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-70 transition-opacity"
              style={{
                background: 'rgba(19,16,31,0.95)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              <X size={10} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeRobot