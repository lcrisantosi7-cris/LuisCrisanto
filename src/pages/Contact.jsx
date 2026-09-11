import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, MapPin, Send, Linkedin, Github,
  CheckCircle2, Loader2, Terminal, ArrowUpRight,
} from 'lucide-react'
import SEO from '../components/SEO'
import { buildNotificationHtml, buildConfirmationHtml } from '../lib/emailTemplates'

// ── Brevo config ──────────────────────────────────────────────────────────────
const BREVO_KEY    = import.meta.env.VITE_BREVO_API_KEY
const NOTIFY_TO    = 'lcrisantosi7@gmail.com'
const SENDER_EMAIL = 'lcrisantosi7@gmail.com'
const SENDER_NAME  = 'LC.dev'
const MAX_LEN      = 2000

// ── Email via Brevo API — sin cambios ────────────────────────────────────────
const sendEmail = async ({ to, subject, html }) => {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': BREVO_KEY },
    body: JSON.stringify({
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Brevo error ${res.status}`)
  }
}

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
const sanitize     = (v) => String(v).replace(/<[^>]*>/g, '').trim().slice(0, MAX_LEN)

// ── Datos estáticos ───────────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    id:    'response',
    icon:  Mail,
    label: 'Canal de comunicación',
    value: 'Respuesta en menos de 24h',
    sub:   'El formulario tiene prioridad',
  },
  {
    id:    'location',
    icon:  MapPin,
    label: 'Base de operaciones',
    value: 'Perú · Remote Available',
  },
]

const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/luis-crisanto-silupú' },
  { name: 'GitHub',   icon: Github,   url: 'https://github.com/lcrisantosi7-cris/'            },
]

// ── Componente principal ──────────────────────────────────────────────────────
export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', message: '' })
  const [status,  setStatus]  = useState('idle')   // idle | loading | success | error
  const [errMsg,  setErrMsg]  = useState('')
  const [focused, setFocused] = useState(null)

  const update = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading' || status === 'success') return

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrMsg('Todos los campos son obligatorios.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }
    if (!isValidEmail(form.email)) {
      setErrMsg('El correo electrónico no es válido.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    setStatus('loading')
    setErrMsg('')

    const name    = sanitize(form.name)
    const email   = sanitize(form.email)
    const message = sanitize(form.message)

    try {
      await sendEmail({
        to:      NOTIFY_TO,
        subject: `📬 Nuevo mensaje de ${name}`,
        html:    buildNotificationHtml(name, email, message),
      })
      sendEmail({
        to:      email,
        subject: `¡Gracias por escribirme, ${name}! — LC.dev`,
        html:    buildConfirmationHtml(name),
      }).catch(() => {})

      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setErrMsg(
        err.message.includes('Failed to fetch')
          ? 'Sin conexión a internet. Verifica tu red e intenta de nuevo.'
          : `Error al enviar: ${err.message}`,
      )
      setStatus('error')
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const charsLeft  = MAX_LEN - form.message.length
  const isDisabled = status === 'loading' || status === 'success'

  // Input con float label — helper de clases
  const labelCls = (f) =>
    focused === f || form[f]
      ? 'top-0 -translate-y-1/2 text-[10px] px-2 font-bold tracking-wider uppercase'
      : 'top-1/2 -translate-y-1/2 text-sm'

  const inputBase = {
    background:  'rgba(255,255,255,0.03)',
    border:      '1px solid rgba(255,255,255,0.09)',
    color:       '#fff',
    outline:     'none',
    transition:  'border-color 0.2s, box-shadow 0.2s',
  }
  const inputFocus = (f) =>
    focused === f
      ? { borderColor: 'rgba(252,143,84,0.5)', boxShadow: '0 0 0 3px rgba(252,143,84,0.08)' }
      : {}

  return (
    <>
      <SEO
        title="Contacto | Luis Crisanto"
        description="Contacto para proyectos de backend, arquitectura y Full Stack. Respuesta en menos de 24h."
        canonical="https://luis-crisanto.vercel.app/contact"
        keywords="Contacto, Colaboración, Desarrollo, Backend, Full Stack"
      />

      <div
        className="min-h-screen relative overflow-hidden flex items-center justify-center pt-28 pb-20 px-6"
        style={{ background: '#0d0b14' }}
      >

        {/* ── FONDO: imagen del atardecer muy apagada + overlay ── */}
        <div
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/Porfolio.webp')", opacity: 0.05, filter: 'blur(4px)' }}
        />

        {/* Patrón de líneas diagonales */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(30deg, rgba(104,103,210,0.05) 1px, transparent 1px),
                              linear-gradient(-30deg, rgba(104,103,210,0.05) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Blooms */}
        <div
          className="absolute top-1/4 right-[8%] w-[450px] h-[450px] rounded-full pointer-events-none blur-[130px]"
          style={{ background: 'rgba(252,143,84,0.07)' }}
        />
        <div
          className="absolute bottom-1/4 left-[8%] w-[400px] h-[400px] rounded-full pointer-events-none blur-[120px]"
          style={{ background: 'rgba(104,103,210,0.08)' }}
        />

        <div className="max-w-6xl w-full mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

            {/* ══════════════════════════════════════════════════════════════
                COLUMNA IZQUIERDA
            ══════════════════════════════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >

              {/* Encabezado */}
              <div className="mb-12">
                {/* Badge status */}
                <div
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
                  style={{
                    background: 'rgba(252,143,84,0.08)',
                    border:     '1px solid rgba(252,143,84,0.25)',
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: '#FC8F54' }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ backgroundColor: '#FC8F54' }}
                    />
                  </span>
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-widest"
                    style={{ color: '#ffb388' }}
                  >
                    Status: Disponible
                  </span>
                </div>

                {/* Título */}
                <h1
                  className="font-black tracking-tighter leading-[0.88] mb-6"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize:   'clamp(2.8rem, 7vw, 5.5rem)',
                  }}
                >
                  <span className="block text-white">INICIEMOS</span>
                  <span
                    className="block text-transparent bg-clip-text"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #FC8F54 0%, #F5525B 50%, #6867D2 100%)',
                    }}
                  >
                    UNA IDEA
                  </span>
                </h1>

                <p className="text-lg leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  ¿Tienes un desafío técnico complejo? Estoy listo para aportar
                  arquitectura sólida y código limpio a tu próximo proyecto.
                </p>
              </div>

              {/* Info cards */}
              <div className="space-y-3 mb-10">
                {CONTACT_INFO.map((info) => (
                  <div
                    key={info.id}
                    className="flex items-center gap-5 p-5 rounded-2xl transition-all duration-200 group"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border:     '1px solid rgba(255,255,255,0.07)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(252,143,84,0.3)'
                      e.currentTarget.style.background  = 'rgba(252,143,84,0.04)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.background  = 'rgba(255,255,255,0.025)'
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                      style={{
                        background: 'rgba(252,143,84,0.08)',
                        border:     '1px solid rgba(252,143,84,0.2)',
                      }}
                    >
                      <info.icon size={18} style={{ color: '#FC8F54' }} />
                    </div>
                    <div>
                      <p
                        className="text-[9px] uppercase tracking-widest font-bold mb-0.5"
                        style={{ color: 'rgba(255,255,255,0.25)' }}
                      >
                        {info.label}
                      </p>
                      <p className="text-white font-medium text-sm">{info.value}</p>
                      {info.sub && (
                        <p
                          className="text-[10px] font-mono mt-0.5"
                          style={{ color: 'rgba(252,143,84,0.55)' }}
                        >
                          {info.sub}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="group flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-250"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border:     '1px solid rgba(255,255,255,0.08)',
                      color:      'rgba(255,255,255,0.45)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color       = '#fff'
                      e.currentTarget.style.borderColor = 'rgba(104,103,210,0.4)'
                      e.currentTarget.style.background  = 'rgba(104,103,210,0.07)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color       = 'rgba(255,255,255,0.45)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.background  = 'rgba(255,255,255,0.03)'
                    }}
                  >
                    <s.icon size={17} />
                    {s.name}
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ══════════════════════════════════════════════════════════════
                COLUMNA DERECHA: FORMULARIO
            ══════════════════════════════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              {/* Glow decorativo detrás del form */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none blur-[60px]"
                style={{ background: 'rgba(252,143,84,0.12)' }}
              />

              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background:     'rgba(255,255,255,0.025)',
                  border:         '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Header del form */}
                <div
                  className="flex items-center gap-3 px-8 py-6"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      background: 'rgba(252,143,84,0.1)',
                      border:     '1px solid rgba(252,143,84,0.25)',
                    }}
                  >
                    <Terminal size={16} style={{ color: '#FC8F54' }} />
                  </div>
                  <h3 className="font-bold text-white">Enviar Mensaje</h3>
                  {/* Dots decorativos tipo OS window */}
                  <div className="ml-auto flex gap-1.5">
                    {['rgba(245,82,91,0.5)', 'rgba(252,143,84,0.5)', 'rgba(104,103,210,0.5)'].map((c, i) => (
                      <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5" noValidate>

                  {/* Campo Nombre */}
                  <div className="relative">
                    <label
                      htmlFor="c-name"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${labelCls('name')}`}
                      style={{
                        color: focused === 'name' || form.name ? '#FC8F54' : 'rgba(255,255,255,0.3)',
                        ...(focused === 'name' || form.name ? { background: '#13101f' } : {}),
                      }}
                    >
                      Tu Nombre
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      value={form.name}
                      onChange={update('name')}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      className="w-full rounded-xl px-4 py-3.5"
                      style={{ ...inputBase, ...inputFocus('name') }}
                    />
                  </div>

                  {/* Campo Email */}
                  <div className="relative">
                    <label
                      htmlFor="c-email"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${labelCls('email')}`}
                      style={{
                        color: focused === 'email' || form.email ? '#FC8F54' : 'rgba(255,255,255,0.3)',
                        ...(focused === 'email' || form.email ? { background: '#13101f' } : {}),
                      }}
                    >
                      Correo Electrónico
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      required
                      maxLength={200}
                      autoComplete="email"
                      value={form.email}
                      onChange={update('email')}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      className="w-full rounded-xl px-4 py-3.5"
                      style={{ ...inputBase, ...inputFocus('email') }}
                    />
                  </div>

                  {/* Campo Mensaje */}
                  <div className="relative">
                    <label
                      htmlFor="c-msg"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${labelCls('message')}`}
                      style={{
                        color: focused === 'message' || form.message ? '#FC8F54' : 'rgba(255,255,255,0.3)',
                        ...(focused === 'message' || form.message ? { background: '#13101f' } : {}),
                        top: focused === 'message' || form.message ? '0' : '14px',
                        transform: focused === 'message' || form.message ? 'translateY(-50%)' : 'none',
                      }}
                    >
                      Detalles del Proyecto
                    </label>
                    <textarea
                      id="c-msg"
                      rows={5}
                      required
                      maxLength={MAX_LEN}
                      value={form.message}
                      onChange={update('message')}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className="w-full rounded-xl px-4 py-3.5 resize-none"
                      style={{ ...inputBase, ...inputFocus('message') }}
                    />
                    {(focused === 'message' || form.message.length > 0) && (
                      <p
                        className="text-right text-[10px] font-mono mt-1"
                        style={{ color: charsLeft < 100 ? '#FC8F54' : 'rgba(255,255,255,0.2)' }}
                      >
                        {charsLeft} restantes
                      </p>
                    )}
                  </div>

                  {/* Botón submit */}
                  <motion.button
                    type="submit"
                    disabled={isDisabled}
                    whileHover={!isDisabled ? { scale: 1.02 } : {}}
                    whileTap={!isDisabled ? { scale: 0.98 } : {}}
                    className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed"
                    style={
                      status === 'success'
                        ? { background: 'linear-gradient(90deg, #FC8F54, #F5525B)', color: '#fff' }
                        : status === 'error'
                        ? { background: 'rgba(245,82,91,0.15)', border: '1px solid rgba(245,82,91,0.35)', color: '#F5525B' }
                        : status === 'loading'
                        ? { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }
                        : { background: 'linear-gradient(90deg, #FC8F54, #F5525B)', color: '#fff', boxShadow: '0 0 0 rgba(252,143,84,0)' }
                    }
                    onMouseEnter={(e) => {
                      if (status === 'idle') e.currentTarget.style.boxShadow = '0 0 24px rgba(252,143,84,0.35)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {status === 'loading' && <><Loader2 size={18} className="animate-spin" /> Enviando...</>}
                    {status === 'success' && <><CheckCircle2 size={18} /> Mensaje Enviado</>}
                    {status === 'error'   && 'Error — intenta de nuevo'}
                    {status === 'idle'    && <><Send size={16} /> Enviar Propuesta</>}
                  </motion.button>

                  {/* Mensaje de error inline */}
                  <AnimatePresence>
                    {status === 'error' && errMsg && (
                      <motion.p
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

                {/* ── OVERLAY DE ÉXITO ── */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center z-20 rounded-3xl"
                      style={{ background: 'rgba(13,11,20,0.92)', backdropFilter: 'blur(8px)' }}
                    >
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', damping: 12 }}
                        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                        style={{
                          background: 'linear-gradient(135deg, #FC8F54, #F5525B)',
                          boxShadow:  '0 0 40px rgba(252,143,84,0.4)',
                        }}
                      >
                        <CheckCircle2 size={38} style={{ color: '#fff' }} />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">¡Recibido!</h3>
                      <p
                        className="text-center max-w-xs text-sm leading-relaxed"
                        style={{ color: 'rgba(255,255,255,0.45)' }}
                      >
                        Te envié una confirmación a tu correo.
                        Te responderé en menos de 24 horas.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  )
}