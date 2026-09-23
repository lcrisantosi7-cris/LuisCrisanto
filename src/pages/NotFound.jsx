import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  motion, useMotionValue, useSpring, useTransform, useReducedMotion,
} from 'framer-motion'
import { Home, ArrowLeft, Compass, ArrowUpRight } from 'lucide-react'

// ── Rutas del sitio (para sugerencias) ────────────────────────────────────────
const ROUTES = [
  { path: '/', label: 'Inicio', aliases: ['inicio', 'home'] },
  { path: '/about', label: 'Sobre mí', aliases: ['sobre-mi', 'sobremi', 'acerca', 'about-me'] },
  { path: '/experience', label: 'Experiencia', aliases: ['experiencia'] },
  { path: '/projects', label: 'Proyectos', aliases: ['proyectos', 'portfolio', 'portafolio', 'work'] },
  { path: '/skills', label: 'Habilidades', aliases: ['habilidades', 'stack', 'tecnologias'] },
  { path: '/services', label: 'Servicios', aliases: ['servicios'] },
  { path: '/contact', label: 'Contacto', aliases: ['contacto', 'contactar'] },
]

const levenshtein = (a, b) => {
  const m = a.length
  const n = b.length
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)])
  for (let j = 1; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
  }
  return dp[m][n]
}

const findSuggestion = (pathname) => {
  const slug = pathname.toLowerCase().replace(/^\/+|\/+$/g, '').split('/')[0].slice(0, 30)
  if (!slug) return null

  for (const r of ROUTES) if (r.aliases.includes(slug)) return r

  let best = null
  let bestDist = Infinity
  for (const r of ROUTES) {
    const target = r.path.replace('/', '')
    if (!target) continue
    const d = levenshtein(slug, target)
    if (d < bestDist) { bestDist = d; best = r }
  }
  return bestDist <= 3 ? best : null
}

const TONES = {
  muted: 'rgba(255,255,255,0.4)',
  error: '#F5525B',
  warn: '#FC8F54',
  ok: '#a5a4e8',
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const up = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// ── "404" con glitch ──────────────────────────────────────────────────────────
function Glitch404() {
  const reduce = useReducedMotion()

  const layer = (color, dx, delay) => (
    <motion.span
      aria-hidden="true"
      className="absolute inset-0 select-none"
      style={{ color, mixBlendMode: 'screen' }}
      animate={
        reduce
          ? undefined
          : {
            x: [0, dx, -dx, 0, 0],
            opacity: [0, 0.9, 0.9, 0, 0],
            clipPath: [
              'inset(0 0 60% 0)',
              'inset(40% 0 20% 0)',
              'inset(70% 0 0 0)',
              'inset(0 0 0 0)',
              'inset(0 0 0 0)',
            ],
          }
      }
      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3.2, delay, times: [0, 0.25, 0.5, 0.75, 1] }}
      initial={{ opacity: 0 }}
    >
      404
    </motion.span>
  )

  return (
    <h1
      className="relative inline-block font-black tracking-tighter leading-none"
      style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(5.5rem, 18vw, 10rem)' }}
    >
      <span className="sr-only">Error 404: página no encontrada</span>
      <span
        aria-hidden="true"
        className="relative block text-transparent bg-clip-text"
        style={{ backgroundImage: 'linear-gradient(90deg, #FC8F54 0%, #F5525B 50%, #6867D2 100%)' }}
      >
        404
      </span>
      {layer('#F5525B', -5, 0)}
      {layer('#6867D2', 5, 0.08)}
    </h1>
  )
}

// ── Robot roto ────────────────────────────────────────────────────────────────
function BrokenRobot({ px, py, rebooting, reduce }) {
  const still = reduce
  const headRot = useTransform(px, [-3, 3], [-4, 4])

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] overflow-visible mx-auto"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nf-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FC8F54" />
          <stop offset="100%" stopColor="#6867D2" />
        </linearGradient>
        <radialGradient id="nf-flame">
          <stop offset="0%" stopColor="#FFD3A8" />
          <stop offset="45%" stopColor="#FC8F54" />
          <stop offset="100%" stopColor="#F5525B" stopOpacity="0" />
        </radialGradient>
        <clipPath id="nf-visor">
          <rect x="64" y="47" width="72" height="50" rx="16" />
        </clipPath>
      </defs>

      {/* Sombra */}
      <motion.ellipse
        cx="100" cy="192" rx="34" ry="4" fill="#F5525B" opacity="0.15"
        animate={still ? undefined : { opacity: [0.08, 0.22, 0.08], rx: [28, 38, 28] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      />

      {/* Tornillos que se caen */}
      {!still &&
        [0, 1].map((i) => (
          <motion.circle
            key={i}
            cx={i ? 116 : 86}
            r="2.5"
            fill="#8a86a3"
            initial={{ cy: 140, opacity: 0 }}
            animate={{ cy: [140, 190], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.2 + i, delay: i * 1.3, ease: 'easeIn' }}
          />
        ))}

      {/* Todo el robot flota de forma errática */}
      <motion.g
        animate={still ? undefined : { y: [-4, 6, -2, 5, -4], rotate: [0, -1.5, 1, -1, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        style={{ originX: 0.5, originY: 1 }}
      >
        {/* Propulsor que tose */}
        <motion.ellipse
          cx="100" cy="178" rx="8" ry="5" fill="url(#nf-flame)"
          animate={
            still
              ? { opacity: 0.3 }
              : { opacity: [0.9, 0.1, 0.7, 0, 0.5, 0.1, 0.9], ry: [5, 2, 6, 1, 4, 2, 5] }
          }
          transition={{ duration: 1.4, repeat: Infinity }}
        />

        {/* Cuerpo */}
        <path
          d="M68 122 Q68 116 74 116 H126 Q132 116 132 122 L126 166 Q125 172 119 172 H81 Q75 172 74 166 Z"
          fill="#13101f" stroke="url(#nf-stroke)" strokeWidth="2"
        />
        {/* Grieta */}
        <path d="M96 118 L102 130 L96 140 L103 152" stroke="#F5525B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />

        {/* Panel del pecho */}
        <rect x="84" y="132" width="32" height="20" rx="5" fill="#0d0b14" stroke="rgba(245,82,91,0.45)" />
        <motion.text
          x="100" y="146" textAnchor="middle" fontSize="10" fontWeight="700"
          fontFamily="ui-monospace, SFMono-Regular, monospace" fill="#F5525B"
          animate={still ? undefined : { opacity: [1, 0.3, 1, 0.6, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          {rebooting ? '...' : '404'}
        </motion.text>

        {/* Brazo izquierdo colgando */}
        <motion.g
          animate={still ? undefined : { rotate: [0, 12, -6, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
          style={{ originX: 1, originY: 0 }}
        >
          <path d="M68 128 Q54 140 58 158" stroke="#8a86a3" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="58" cy="160" r="5.5" fill="#8a86a3" />
        </motion.g>

        {/* Brazo derecho desconectado */}
        <path d="M132 128 L146 138" stroke="#8a86a3" strokeWidth="2" strokeDasharray="2 3" strokeLinecap="round" />
        <motion.circle
          cx="138" cy="133" r="2.5" fill="#F5525B"
          animate={still ? undefined : { opacity: [1, 0, 1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        />
        <motion.g
          animate={still ? undefined : { y: [0, -6, 0], rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          style={{ originX: 0.5, originY: 0.5 }}
        >
          <path d="M148 140 Q160 150 158 168" stroke="#8a86a3" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="158" cy="170" r="5.5" fill="#6867D2" />
        </motion.g>

        {/* Cabeza mareada (más agitada al reiniciar) */}
        <motion.g
          animate={
            still
              ? undefined
              : rebooting
                ? { x: [0, -5, 5, -4, 4, 0], rotate: [0, -8, 8, -6, 6, 0] }
                : { x: 0, rotate: [-3, 4, -2, 3, -3] }
          }
          transition={
            rebooting
              ? { duration: 0.6 }
              : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{ originX: 0.5, originY: 1 }}
        >
          <motion.g style={{ rotate: headRot, originX: 0.5, originY: 1 }}>
            {/* Antena doblada con chispas */}
            <path d="M100 36 L100 28 L108 22" stroke="#8a86a3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <motion.circle
              cx="110" cy="19" r="4.5" fill="#F5525B"
              animate={still ? undefined : { opacity: [1, 0.2, 0.9, 0.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.3 }}
            />
            <motion.path
              d="M116 14 l7 -7 M119 21 l9 0 M112 11 l1 -9"
              stroke="#FC8F54" strokeWidth="2" strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={still ? { opacity: 0 } : { opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, repeatDelay: 1.4 }}
            />

            {/* Orejas */}
            <rect x="47" y="62" width="9" height="26" rx="4.5" fill="#13101f" stroke="#6867D2" strokeOpacity="0.6" />
            <rect x="144" y="62" width="9" height="26" rx="4.5" fill="#13101f" stroke="#6867D2" strokeOpacity="0.6" />

            {/* Cabeza y visor */}
            <rect x="54" y="36" width="92" height="74" rx="22" fill="#13101f" stroke="url(#nf-stroke)" strokeWidth="2" />
            <rect x="64" y="47" width="72" height="50" rx="16" fill="#0d0b14" stroke="rgba(255,255,255,0.06)" />

            <g clipPath="url(#nf-visor)">
              {/* Línea de escaneo glitcheada */}
              {!still && (
                <motion.rect
                  x="64" width="72" height="2" fill="#F5525B" opacity="0.25"
                  initial={{ y: 47 }}
                  animate={{ y: [47, 95] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                />
              )}

              {/* Ojo izquierdo: X (muerto) */}
              <motion.g
                animate={still ? undefined : { opacity: [1, 0.3, 1, 1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2.4 }}
              >
                <path d="M79 61 L93 75 M93 61 L79 75" stroke="#F5525B" strokeWidth="4" strokeLinecap="round" />
              </motion.g>

              {/* Ojo derecho: sigue el cursor con fallos */}
              <motion.g style={{ x: px, y: py }}>
                <motion.g
                  animate={still ? undefined : { opacity: [1, 1, 0.2, 1, 1], scaleY: [1, 1, 0.3, 1, 1] }}
                  transition={{ repeat: Infinity, duration: 0.3, repeatDelay: 2.8 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                >
                  <ellipse cx="114" cy="68" rx="7" ry="8.5" fill="#FC8F54" />
                  <circle cx="116.5" cy="65" r="2.4" fill="#fff" />
                </motion.g>
              </motion.g>
            </g>

            {/* Mejillas */}
            <circle cx="74" cy="83" r="4" fill="#F5525B" opacity="0.2" />
            <circle cx="126" cy="83" r="4" fill="#F5525B" opacity="0.2" />

            {/* Boca ondulada */}
            <path
              d="M86 86 l4 -3 l4 3 l4 -3 l4 3 l4 -3 l4 3 l4 -3"
              stroke="#FC8F54" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
            />
          </motion.g>
        </motion.g>
      </motion.g>
    </svg>
  )
}

// ════════════════════════════════════════════════════════════════════════════
const NotFound = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const reduce = useReducedMotion()

  // Si entró directo a la URL rota, "Regresar" lo sacaría del sitio
  const canGoBack = location.key !== 'default'

  const shownPath = location.pathname.length > 40
    ? `${location.pathname.slice(0, 37)}…`
    : location.pathname
  const suggestion = useMemo(() => findSuggestion(location.pathname), [location.pathname])

  const [logs, setLogs] = useState([])
  const [rebooting, setRebooting] = useState(false)
  const botRef = useRef(null)
  const rebootTimer = useRef(null)

  // Ojo que sigue el cursor
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 160, damping: 18 })
  const py = useSpring(my, { stiffness: 160, damping: 18 })

  useEffect(() => {
    const previous = document.title
    document.title = '404 | Luis Crisanto'
    return () => { document.title = previous }
  }, [])

  const sequence = useMemo(
    () => [
      { text: `> GET ${shownPath}`, tone: 'muted' },
      { text: '> connecting to server...', tone: 'muted' },
      { text: '> error: 404_not_found_exception', tone: 'error' },
      { text: '> searching routes...', tone: 'muted' },
      suggestion
        ? { text: `> did you mean: ${suggestion.path} ?`, tone: 'warn' }
        : { text: '> no similar route found', tone: 'warn' },
      { text: '> initiating recovery protocol...', tone: 'muted' },
      { text: '> status: system_ready', tone: 'ok' },
    ],
    [shownPath, suggestion],
  )

  // Logs de la terminal
  useEffect(() => {
    if (reduce) {
      setLogs(sequence)
      return
    }
    setLogs([])
    const timers = sequence.map((log, i) =>
      setTimeout(() => setLogs((prev) => [...prev, log]), 400 + i * 550),
    )
    return () => timers.forEach(clearTimeout)
  }, [sequence, reduce])

  // Seguimiento del cursor
  useEffect(() => {
    if (reduce) return
    const onMove = (e) => {
      const el = botRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const dist = Math.hypot(dx, dy) || 1
      const k = Math.min(dist, 320) / 320
      mx.set((dx / dist) * 3 * k)
      my.set((dy / dist) * 2.5 * k)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, mx, my])

  useEffect(() => () => clearTimeout(rebootTimer.current), [])

  const reboot = () => {
    if (rebooting) return
    setRebooting(true)
    setLogs((prev) => [
      ...prev.slice(-6),
      { text: '> reboot --force', tone: 'warn' },
      { text: '> ok: still 404, but we are fine', tone: 'ok' },
    ])
    rebootTimer.current = setTimeout(() => setRebooting(false), 1400)
  }

  const quickLinks = ROUTES.filter((r) => r.path !== '/')

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center pt-28 pb-16 px-6"
      style={{ background: '#0d0b14' }}
    >
      {/* Fondo */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(104,103,210,0.2) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 20%, transparent 75%)',
        }}
      />
      <div className="absolute top-[10%] left-[10%] w-[420px] h-[420px] rounded-full pointer-events-none blur-[130px]" style={{ background: 'rgba(245,82,91,0.08)' }} />
      <div className="absolute bottom-[5%] right-[8%] w-[420px] h-[420px] rounded-full pointer-events-none blur-[130px]" style={{ background: 'rgba(104,103,210,0.1)' }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
      >
        {/* ═════ ROBOT + 404 ═════ */}
        <motion.div variants={up} className="text-center">
          <div className="relative">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl -z-10"
              style={{ background: 'radial-gradient(circle, rgba(245,82,91,0.16), rgba(104,103,210,0.1) 60%, transparent 75%)' }}
            />
            <button
              ref={botRef}
              type="button"
              onClick={reboot}
              aria-label="Reiniciar al robot"
              className="block mx-auto rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#FC8F54]/60"
            >
              <BrokenRobot px={px} py={py} rebooting={rebooting} reduce={reduce} />
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] mt-1" style={{ color: 'rgba(255,255,255,0.22)' }}>
              haz clic para reiniciarlo
            </p>
          </div>

          <div className="mt-4">
            <Glitch404 />
          </div>
        </motion.div>

        {/* ═════ TEXTO + TERMINAL + ACCIONES ═════ */}
        <div className="text-center lg:text-left">
          <motion.div variants={up}>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
              Houston, tenemos un problema.
            </p>
            <p className="max-w-md mx-auto lg:mx-0 mb-7 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              La página que buscas no existe, cambió de lugar o nunca estuvo aquí.
            </p>
          </motion.div>

          {/* Terminal */}
          <motion.div
            variants={up}
            className="rounded-xl p-4 max-w-md mx-auto lg:mx-0 mb-6 text-left font-mono text-[13px] overflow-hidden"
            style={{
              background: 'rgba(19,16,31,0.8)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px -20px rgba(0,0,0,0.6)',
            }}
          >
            <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['rgba(245,82,91,0.6)', 'rgba(252,143,84,0.6)', 'rgba(104,103,210,0.6)'].map((c) => (
                <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
              ))}
              <span className="text-[10px] ml-auto" style={{ color: 'rgba(255,255,255,0.25)' }}>
                bash — 404
              </span>
            </div>

            <div className="space-y-1 min-h-[190px]" aria-live="polite">
              {logs.map((log, i) => (
                <motion.div
                  key={`${log.text}-${i}`}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ color: TONES[log.tone] }}
                  className="break-all"
                >
                  {log.text}
                </motion.div>
              ))}
              <motion.span
                aria-hidden="true"
                animate={reduce ? undefined : { opacity: [0, 1] }}
                transition={{ repeat: Infinity, duration: 0.5, repeatType: 'reverse' }}
                style={{ color: '#FC8F54' }}
              >
                _
              </motion.span>
            </div>
          </motion.div>

          {/* Sugerencia */}
          {suggestion && (
            <motion.div variants={up} className="max-w-md mx-auto lg:mx-0 mb-5">
              <Link
                to={suggestion.path}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                style={{ background: 'rgba(252,143,84,0.07)', border: '1px solid rgba(252,143,84,0.28)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(252,143,84,0.55)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(252,143,84,0.28)' }}
              >
                <Compass size={16} style={{ color: '#FC8F54' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  ¿Buscabas{' '}
                  <span className="font-mono font-bold" style={{ color: '#ffb388' }}>{suggestion.path}</span>
                  {' '}({suggestion.label})?
                </span>
                <ArrowUpRight size={14} className="ml-auto opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: '#FC8F54' }} />
              </Link>
            </motion.div>
          )}

          {/* Accesos rápidos */}
          <motion.div variants={up} className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
            {quickLinks.map((r) => (
              <Link
                key={r.path}
                to={r.path}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(104,103,210,0.5)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
              >
                {r.label}
              </Link>
            ))}
          </motion.div>

          {/* Botones */}
          <motion.div variants={up} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            {canGoBack && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(104,103,210,0.5)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
              >
                <ArrowLeft size={18} />
                Regresar
              </button>
            )}

            <Link
              to="/"
              className="px-6 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] active:scale-95"
              style={{ background: 'linear-gradient(90deg, #FC8F54, #F5525B)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 28px rgba(252,143,84,0.4)' }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
            >
              <Home size={18} />
              Ir al inicio
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound