import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, MapPin, Send, Linkedin, Github,
  CheckCircle2, Loader2, Terminal,
} from 'lucide-react'
import SEO from '../components/SEO'
import { buildNotificationHtml, buildConfirmationHtml } from '../lib/emailTemplates'

// ─── Config ───────────────────────────────────────────────────────────────────
const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY
const NOTIFY_TO = import.meta.env.VITE_NOTIFY_TO || 'lcrisantosi7@gmail.com'
const SENDER_EMAIL = import.meta.env.VITE_SENDER_EMAIL || 'a95bda001@smtp-brevo.com'
const MAX_MSG_LEN = 2000

if (!BREVO_API_KEY || BREVO_API_KEY === 'PEGA_AQUI_TU_API_KEY') {
  console.error('[Contact] VITE_BREVO_API_KEY no configurada — los emails no se enviarán.')
}

// ─── Static data ─────────────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    id: 'response',
    icon: Mail,
    label: 'Canal de Comunicación',
    value: 'Respuesta en menos de 24h',
    subValue: 'Usa el formulario para prioridad',
  },
  {
    id: 'location',
    icon: MapPin,
    label: 'Base de Operaciones',
    value: 'Perú (Remote Available)',
  },
]

const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/luis-crisanto-silupú' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/lcrisantosi7-cris/' },
]

// ─── Brevo API helper ─────────────────────────────────────────────────────────
const sendViaBrevo = ({ to, subject, html }) =>
  fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: 'LC.dev', email: SENDER_EMAIL },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  })

// ─── Helpers ──────────────────────────────────────────────────────────────────
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim())

const sanitize = (str) =>
  String(str)
    .replace(/<[^>]*>/g, '')
    .replace(/[\r\n]{3,}/g, '\n\n')
    .trim()
    .slice(0, MAX_MSG_LEN)

// ─── Component ────────────────────────────────────────────────────────────────
const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const [focusedField, setFocusedField] = useState(null)

  const updateField = (field) => (e) =>
    setFormState((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading' || status === 'success') return

    // Client-side validation
    if (!formState.name || !formState.email || !formState.message) {
      setErrorMessage('Todos los campos son obligatorios.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }
    if (!isValidEmail(formState.email)) {
      setErrorMessage('El correo electrónico no es válido.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    setStatus('loading')
    setErrorMessage('')

    const cleanName = sanitize(formState.name)
    const cleanEmail = sanitize(formState.email)
    const cleanMessage = sanitize(formState.message)

    try {
      // 1. Notificación a ti — bloqueante
      const res = await sendViaBrevo({
        to: NOTIFY_TO,
        subject: `Nuevo mensaje de ${cleanName}`,
        html: buildNotificationHtml(cleanName, cleanEmail, cleanMessage),
      })

      // Brevo devuelve 201 en éxito, cualquier otro código es error
      if (!res.ok) {
        let errMsg = `Error Brevo (${res.status})`
        try {
          const data = await res.json()
          errMsg = data.message || data.error || errMsg
        } catch { /* body vacío */ }
        throw new Error(errMsg)
      }

      // 2. Confirmación al remitente — no bloqueante
      sendViaBrevo({
        to: cleanEmail,
        subject: `¡Gracias por escribirme, ${cleanName}!`,
        html: buildConfirmationHtml(cleanName),
      }).catch(() => {/* silencioso */ })

      setStatus('success')
      setFormState({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)

    } catch (err) {
      setErrorMessage(
        err.message.includes('Failed to fetch')
          ? 'Sin conexión. Verifica tu internet e intenta de nuevo.'
          : err.message || 'No se pudo enviar. Intenta de nuevo.'
      )
      setStatus('error')
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const charsLeft = MAX_MSG_LEN - formState.message.length
  const isDisabled = status === 'loading' || status === 'success'

  const floatLabel = (field) =>
    focusedField === field || formState[field]
      ? '-top-2.5 bg-zinc-900 px-2 text-xs text-emerald-500 font-bold'
      : 'top-3.5 text-zinc-500'

  return (
    <>
      <SEO
        title="Contacto | Luis Crisanto - Colaboración y Proyectos"
        description="Ponte en contacto conmigo para proyectos de desarrollo backend, arquitectura de software y soluciones Full Stack. Respuesta en menos de 24h."
        canonical="https://mi-portafolio-khaki-two.vercel.app/contact"
        keywords="Contacto, Colaboración, Desarrollo, Backend, Full Stack, Proyectos, Email, LinkedIn"
      />
      <div className="min-h-screen bg-zinc-950 py-24 px-6 relative overflow-hidden flex items-center justify-center">

        {/* Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-emerald-500/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-blue-600/8 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(30deg,#6ee7b7 1px,transparent 1px),linear-gradient(-30deg,#6ee7b7 1px,transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="max-w-6xl w-full mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

            {/* ── Columna izquierda ── */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-emerald-500 text-xs font-mono font-bold uppercase tracking-widest">
                    Status: Disponible
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                  Iniciemos una <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                    Colaboración
                  </span>
                </h1>

                <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                  ¿Tienes un desafío técnico complejo? Estoy listo para aportar arquitectura sólida
                  y código limpio a tu próximo gran proyecto.
                </p>
              </div>

              <div className="space-y-4 mb-12">
                {CONTACT_INFO.map((info) => (
                  <div
                    key={info.id}
                    className="group bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl flex items-center gap-5 transition-all hover:border-emerald-500/30 hover:bg-zinc-900/80"
                  >
                    <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-emerald-500/50 transition-all">
                      <info.icon className="text-zinc-400 group-hover:text-emerald-500 transition-colors" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                      {info.subValue && (
                        <p className="text-[10px] text-emerald-500/70 font-mono mt-0.5">{info.subValue}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white hover:border-emerald-500 hover:bg-emerald-500/10 hover:-translate-y-1 transition-all duration-300"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ── Columna derecha: Formulario ── */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />

              <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">

                {/* Header del form */}
                <div className="flex items-center gap-3 mb-8 pb-8 border-b border-zinc-800">
                  <Terminal className="text-emerald-500 shrink-0" size={24} />
                  <h3 className="text-xl font-bold text-white">Enviar Mensaje</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                  {/* Nombre */}
                  <div className="relative">
                    <label
                      htmlFor="contact-name"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${floatLabel('name')}`}
                    >
                      Tu Nombre
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      value={formState.name}
                      onChange={updateField('name')}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label
                      htmlFor="contact-email"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${floatLabel('email')}`}
                    >
                      Correo Electrónico
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      maxLength={200}
                      autoComplete="email"
                      value={formState.email}
                      onChange={updateField('email')}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>

                  {/* Mensaje */}
                  <div className="relative">
                    <label
                      htmlFor="contact-message"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${floatLabel('message')}`}
                    >
                      Detalles del Proyecto
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      maxLength={MAX_MSG_LEN}
                      value={formState.message}
                      onChange={updateField('message')}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none"
                    />
                    {(focusedField === 'message' || formState.message.length > 0) && (
                      <p className={`text-right text-xs font-mono mt-1 transition-colors ${charsLeft < 100 ? 'text-amber-400' : 'text-zinc-600'}`}>
                        {charsLeft} caracteres restantes
                      </p>
                    )}
                  </div>

                  {/* Botón enviar */}
                  <button
                    type="submit"
                    disabled={isDisabled}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed ${status === 'success' ? 'bg-emerald-500 text-zinc-950'
                      : status === 'error' ? 'bg-red-500/20 border border-red-500/40 text-red-400'
                        : status === 'loading' ? 'bg-zinc-800 text-zinc-400'
                          : 'bg-white text-zinc-950 hover:bg-zinc-100 active:scale-[0.98]'
                      }`}
                  >
                    {status === 'loading' && <><Loader2 size={20} className="animate-spin shrink-0" /> Enviando...</>}
                    {status === 'success' && <><CheckCircle2 size={20} className="shrink-0" /> Mensaje Enviado</>}
                    {status === 'error' && 'Error — intenta de nuevo'}
                    {status === 'idle' && <><Send size={18} className="shrink-0" /> Enviar Propuesta</>}
                  </button>

                  {/* Mensaje de error */}
                  <AnimatePresence>
                    {status === 'error' && errorMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-sm text-center"
                      >
                        {errorMessage}
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
                      className="absolute inset-0 bg-zinc-900/90 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-3xl"
                    >
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', damping: 12 }}
                        className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                      >
                        <CheckCircle2 size={40} className="text-zinc-900" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">¡Recibido!</h3>
                      <p className="text-zinc-400 text-center max-w-xs text-sm leading-relaxed">
                        Analizaré tu propuesta y te responderé en menos de 24 horas.
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

export default Contact
