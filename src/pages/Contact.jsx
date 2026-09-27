import { useState, useEffect } from 'react'
import {
  motion, AnimatePresence, useMotionValue, useMotionTemplate,
} from 'framer-motion'
import {
  MapPin, Send, Linkedin, Github, CheckCircle2, Loader2,
  ArrowUpRight, Clock, Mail,
} from 'lucide-react'
import SEO from '../components/SEO'

// ── Configuración ─────────────────────────────────────────────────────────────
const MAX_LEN = 2000
const COOLDOWN_KEY = 'contact:last'
const COOLDOWN_MS = 60_000

// ── Envío: pasa por tu backend (api/contact.js). La API key ya no está aquí ──
const sendMessage = async (payload) => {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'No se pudo enviar el mensaje.')
}

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

// ── Datos ─────────────────────────────────────────────────────────────────────
const PROJECT_TYPES = ['Backend & APIs', 'Arquitectura cloud', 'Full Stack', 'Otro']

const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/luis-crisanto-silupú' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/lcrisantosi7-cris/' },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const up = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// ── Hora de Perú en vivo ──────────────────────────────────────────────────────
function PeruTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(t)
  }, [])
  return (
    <>
      {new Intl.DateTimeFormat('es-PE', {
        hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Lima',
      }).format(now)}
    </>
  )
}

// ── Campo con label y error ───────────────────────────────────────────────────
const Field = ({ id, label, error, right, children }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{ color: error ? '#F5525B' : 'rgba(255,255,255,0.4)' }}
      >
        {label}
      </label>
      {right}
    </div>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          id={`${id}-error`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-xs mt-1.5"
          style={{ color: '#F5525B' }}
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
)

// ════════════════════════════════════════════════════════════════════════════
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [type, setType] = useState('')
  const [hp, setHp] = useState('')          // campo trampa anti-bots
  const [status, setStatus] = useState('idle')      // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('')
  const [focused, setFocused] = useState(null)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Spotlight del formulario
  const gx = useMotionValue(-300)
  const gy = useMotionValue(-300)
  const glow = useMotionTemplate`radial-gradient(360px circle at ${gx}px ${gy}px, rgba(252,143,84,0.09), transparent 70%)`

  const update = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }))
  const touch = (f) => () => { setFocused(null); setTouched((t) => ({ ...t, [f]: true })) }

  const errors = {
    name: !form.name.trim() ? 'Escribe tu nombre.' : '',
    email: !form.email.trim() ? 'Escribe tu correo.' : !isValidEmail(form.email) ? 'Ese correo no parece válido.' : '',
    message: form.message.trim().length < 10 ? 'Cuéntame un poco más (mínimo 10 caracteres).' : '',
  }
  const showErr = (f) => ((touched[f] || submitted) ? errors[f] : '')

  const resetForm = () => {
    setForm({ name: '', email: '', message: '' })
    setType('')
    setTouched({})
    setSubmitted(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading' || status === 'success') return

    setSubmitted(true)
    if (errors.name || errors.email || errors.message) return

    // Bot: se llenó el campo oculto → fingimos éxito sin enviar
    if (hp) {
      setStatus('success')
      resetForm()
      setTimeout(() => setStatus('idle'), 6000)
      return
    }

    // Pausa entre envíos
    try {
      const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0)
      if (Date.now() - last < COOLDOWN_MS) {
        setErrMsg('Espera un momento antes de enviar otro mensaje.')
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
        return
      }
    } catch { /* storage no disponible */ }

    setStatus('loading')
    setErrMsg('')

    try {
      await sendMessage({
        name: form.name,
        email: form.email,
        message: form.message,
        type,
        company: hp,
      })

      try { localStorage.setItem(COOLDOWN_KEY, String(Date.now())) } catch { /* noop */ }

      setStatus('success')
      resetForm()
      setTimeout(() => setStatus('idle'), 6000)
    } catch (err) {
      setErrMsg(
        err instanceof TypeError
          ? 'Sin conexión a internet. Verifica tu red e intenta de nuevo.'
          : err.message,
      )
      setStatus('error')
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const charsLeft = MAX_LEN - form.message.length
  const isDisabled = status === 'loading' || status === 'success'

  const inputStyle = (f) => ({
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${showErr(f) ? 'rgba(245,82,91,0.5)' : focused === f ? 'rgba(252,143,84,0.5)' : 'rgba(255,255,255,0.09)'
      }`,
    boxShadow: focused === f ? '0 0 0 3px rgba(252,143,84,0.08)' : 'none',
    color: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  })

  return (
    <>
      <SEO
        title="Contacto | Luis Crisanto"
        description="Contacto para proyectos de backend, arquitectura en la nube y Full Stack. Respuesta en menos de 24h."
        canonical="https://luis-crisanto.vercel.app/contact"
        keywords="Contacto, Colaboración, Backend, Arquitectura Cloud, Full Stack"
      />

      <div
        className="min-h-screen relative overflow-hidden flex items-center justify-center pt-28 pb-20 px-6"
        style={{ background: '#0d0b14' }}
      >
        {/* Fondo */}
        <div
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/Porfolio.webp')", opacity: 0.05, filter: 'blur(4px)' }}
        />
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(30deg, rgba(104,103,210,0.05) 1px, transparent 1px),
                              linear-gradient(-30deg, rgba(104,103,210,0.05) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 80%)',
          }}
        />
        <div className="absolute top-1/4 right-[8%] w-[450px] h-[450px] rounded-full pointer-events-none blur-[130px]" style={{ background: 'rgba(252,143,84,0.07)' }} />
        <div className="absolute bottom-1/4 left-[8%] w-[400px] h-[400px] rounded-full pointer-events-none blur-[120px]" style={{ background: 'rgba(104,103,210,0.08)' }} />

        <div className="max-w-6xl w-full mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

            {/* ═════ IZQUIERDA ═════ */}
            <motion.div variants={container} initial="hidden" animate="visible">
              <motion.div variants={up} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
                style={{ background: 'rgba(252,143,84,0.08)', border: '1px solid rgba(252,143,84,0.25)' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#FC8F54' }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#FC8F54' }} />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: '#ffb388' }}>
                  Disponible para proyectos
                </span>
              </motion.div>

              <h1
                className="font-black tracking-tighter leading-[0.9] mb-6"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2.6rem, 6vw, 4.75rem)' }}
              >
                <span className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className="block text-white"
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  >
                    HABLEMOS
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className="block text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(90deg, #FC8F54 0%, #F5525B 50%, #6867D2 100%)' }}
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
                  >
                    DE TU IDEA
                  </motion.span>
                </span>
              </h1>

              <motion.p variants={up} className="text-lg leading-relaxed max-w-md mb-10" style={{ color: 'rgba(255,255,255,0.45)' }}>
                ¿Tienes una idea o un problema técnico por resolver? Cuéntame y vemos cómo abordarlo.
              </motion.p>

              {/* Info */}
              <motion.div variants={up} className="space-y-3 mb-10">
                {[
                  { icon: Mail, label: 'Tiempo de respuesta', value: 'Menos de 24 horas', sub: 'A través del formulario' },
                  { icon: MapPin, label: 'Ubicación', value: 'Perú · Trabajo remoto', sub: null },
                ].map((info) => (
                  <motion.div
                    key={info.label}
                    whileHover={{ y: -2, borderColor: 'rgba(252,143,84,0.3)' }}
                    className="flex items-center gap-5 p-5 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(252,143,84,0.08)', border: '1px solid rgba(252,143,84,0.2)' }}>
                      <info.icon size={18} style={{ color: '#FC8F54' }} />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest font-bold mb-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                        {info.label}
                      </p>
                      <p className="text-white font-medium text-sm">{info.value}</p>
                      {info.sub && (
                        <p className="text-[10px] font-mono mt-0.5" style={{ color: 'rgba(252,143,84,0.6)' }}>{info.sub}</p>
                      )}
                      {info.icon === MapPin && (
                        <p className="flex items-center gap-1.5 text-[10px] font-mono mt-0.5" style={{ color: 'rgba(252,143,84,0.6)' }}>
                          <Clock size={10} /> <PeruTime /> · UTC−5
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Redes */}
              <motion.div variants={up} className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="group flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#fff'
                      e.currentTarget.style.borderColor = 'rgba(104,103,210,0.4)'
                      e.currentTarget.style.background = 'rgba(104,103,210,0.07)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                    }}
                  >
                    <s.icon size={17} />
                    {s.name}
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* ═════ DERECHA: FORMULARIO ═════ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none blur-[60px]"
                style={{ background: 'rgba(252,143,84,0.12)' }}
              />

              <div
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect()
                  gx.set(e.clientX - r.left)
                  gy.set(e.clientY - r.top)
                }}
                onMouseLeave={() => { gx.set(-300); gy.set(-300) }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(19,16,31,0.7)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />

                {/* Cabecera */}
                <div className="relative flex items-center gap-3 px-8 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="p-2 rounded-lg" style={{ background: 'rgba(252,143,84,0.1)', border: '1px solid rgba(252,143,84,0.25)' }}>
                    <Send size={16} style={{ color: '#FC8F54' }} />
                  </div>
                  <h2 className="font-bold text-white">Cuéntame tu proyecto</h2>
                </div>

                <form onSubmit={handleSubmit} className="relative p-8 space-y-6" noValidate>
                  {/* Campo trampa (los humanos no lo ven) */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                    <label htmlFor="c-company">Empresa</label>
                    <input id="c-company" type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                  </div>

                  <Field id="c-name" label="Nombre" error={showErr('name')}>
                    <input
                      id="c-name"
                      type="text"
                      maxLength={100}
                      autoComplete="name"
                      value={form.name}
                      onChange={update('name')}
                      onFocus={() => setFocused('name')}
                      onBlur={touch('name')}
                      aria-invalid={Boolean(showErr('name'))}
                      aria-describedby={showErr('name') ? 'c-name-error' : undefined}
                      className="w-full rounded-xl px-4 py-3.5 text-sm"
                      style={inputStyle('name')}
                    />
                  </Field>

                  <Field id="c-email" label="Correo electrónico" error={showErr('email')}>
                    <input
                      id="c-email"
                      type="email"
                      maxLength={200}
                      autoComplete="email"
                      value={form.email}
                      onChange={update('email')}
                      onFocus={() => setFocused('email')}
                      onBlur={touch('email')}
                      aria-invalid={Boolean(showErr('email'))}
                      aria-describedby={showErr('email') ? 'c-email-error' : undefined}
                      className="w-full rounded-xl px-4 py-3.5 text-sm"
                      style={inputStyle('email')}
                    />
                  </Field>

                  {/* Tipo de proyecto (opcional) */}
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Tipo de proyecto <span style={{ color: 'rgba(255,255,255,0.2)' }}>· opcional</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((t) => {
                        const active = type === t
                        return (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setType(active ? '' : t)}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                            style={{
                              background: active ? 'rgba(252,143,84,0.12)' : 'rgba(255,255,255,0.03)',
                              border: active ? '1px solid rgba(252,143,84,0.45)' : '1px solid rgba(255,255,255,0.09)',
                              color: active ? '#ffb388' : 'rgba(255,255,255,0.5)',
                            }}
                          >
                            {t}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <Field
                    id="c-msg"
                    label="Detalles"
                    error={showErr('message')}
                    right={
                      (focused === 'message' || form.message.length > 0) && (
                        <span className="text-[10px] font-mono" style={{ color: charsLeft < 100 ? '#FC8F54' : 'rgba(255,255,255,0.2)' }}>
                          {charsLeft} restantes
                        </span>
                      )
                    }
                  >
                    <textarea
                      id="c-msg"
                      rows={5}
                      maxLength={MAX_LEN}
                      value={form.message}
                      onChange={update('message')}
                      onFocus={() => setFocused('message')}
                      onBlur={touch('message')}
                      aria-invalid={Boolean(showErr('message'))}
                      aria-describedby={showErr('message') ? 'c-msg-error' : undefined}
                      placeholder="¿Qué necesitas construir o resolver? Si tienes un plazo aproximado, cuéntamelo."
                      className="w-full rounded-xl px-4 py-3.5 text-sm resize-none placeholder:text-white/20"
                      style={inputStyle('message')}
                    />
                  </Field>

                  {/* Botón */}
                  <motion.button
                    type="submit"
                    disabled={isDisabled}
                    whileHover={!isDisabled ? { scale: 1.02 } : {}}
                    whileTap={!isDisabled ? { scale: 0.98 } : {}}
                    className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed"
                    style={
                      status === 'error'
                        ? { background: 'rgba(245,82,91,0.15)', border: '1px solid rgba(245,82,91,0.35)', color: '#F5525B' }
                        : status === 'loading'
                          ? { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }
                          : { background: 'linear-gradient(90deg, #FC8F54, #F5525B)', color: '#fff' }
                    }
                    onMouseEnter={(e) => { if (status === 'idle') e.currentTarget.style.boxShadow = '0 0 24px rgba(252,143,84,0.35)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
                  >
                    {status === 'loading' && <><Loader2 size={18} className="animate-spin" /> Enviando...</>}
                    {status === 'success' && <><CheckCircle2 size={18} /> Mensaje enviado</>}
                    {status === 'error' && 'No se pudo enviar'}
                    {status === 'idle' && <><Send size={16} /> Enviar mensaje</>}
                  </motion.button>

                  <AnimatePresence>
                    {status === 'error' && errMsg && (
                      <motion.p
                        role="alert"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-center"
                        style={{ color: '#F5525B' }}
                      >
                        {errMsg}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>

                {/* Overlay de éxito */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center z-20 rounded-3xl px-6"
                      style={{ background: 'rgba(13,11,20,0.94)', backdropFilter: 'blur(8px)' }}
                    >
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', damping: 14 }}
                        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                        style={{ background: 'linear-gradient(135deg, #FC8F54, #F5525B)', boxShadow: '0 0 40px rgba(252,143,84,0.4)' }}
                      >
                        <svg viewBox="0 0 52 52" className="w-10 h-10" aria-hidden="true">
                          <motion.path
                            d="M14 27 l8 8 l16-17"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                          />
                        </svg>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">¡Recibido!</h3>
                      <p className="text-center max-w-xs text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        Te envié una confirmación a tu correo. Te responderé en menos de 24 horas.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="px-5 py-2 rounded-lg text-sm transition-colors"
                        style={{ color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                      >
                        Cerrar
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div >
    </>
  )
}