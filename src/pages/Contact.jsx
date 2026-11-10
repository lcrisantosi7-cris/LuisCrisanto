import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Github, Linkedin, Loader2, Send } from 'lucide-react'
import SEO from '../components/SEO'
import Spotlight from '../components/Spotlight'
import { sfx } from '../lib/sound'

const MAX_LEN = 2000
const COOLDOWN_KEY = 'contact:last'
const COOLDOWN_MS = 60_000
const EMAIL = 'lcrisantosi7@gmail.com'
// El servidor valida estos mismos valores (api/contact.js). Si agregas uno, agrégalo también allá.
const PROJECT_TYPES = ['Backend & APIs', 'Arquitectura cloud', 'Full Stack', 'Otro']
const SOCIALS = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/luis-crisanto-silupú' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/lcrisantosi7-cris/' },
]

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
const fmt = new Intl.DateTimeFormat('es-PE', { timeZone: 'America/Lima', hour: '2-digit', minute: '2-digit', hour12: false })

function LocalTime() {
  const [t, setT] = useState(() => fmt.format(new Date()))
  useEffect(() => {
    const id = setInterval(() => setT(fmt.format(new Date())), 30000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{t}</span>
}

function CopyEmail() {
  const [ok, setOk] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setOk(true)
      sfx.click()
      setTimeout(() => setOk(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }
  return (
    <button onClick={copy} data-cursor={ok ? 'COPIADO' : 'COPIAR'} className="group flex items-center gap-3 break-all text-left font-display text-xl font-bold transition hover:text-channel md:text-2xl">
      {EMAIL}
      {ok ? <Check size={18} className="shrink-0 text-channel" /> : <Copy size={18} className="shrink-0 text-ink-400 transition group-hover:text-channel" />}
    </button>
  )
}

const inputCls = (bad) =>
  `w-full rounded-xl border bg-ink-900 px-4 py-3 text-white outline-none transition placeholder:text-ink-600 focus:border-channel disabled:opacity-60 ${bad ? 'border-rec' : 'border-white/10'}`

function Field({ id, label, error, right, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-widest text-ink-400">{label}</label>
        {right}
      </div>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="mt-2 text-sm text-rec">{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [type, setType] = useState('')
  const [hp, setHp] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('')
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }))
  const touch = (f) => () => setTouched((t) => ({ ...t, [f]: true }))

  const errors = {
    name: !form.name.trim() ? 'Escribe tu nombre.' : '',
    email: !form.email.trim() ? 'Escribe tu correo.' : !isValidEmail(form.email) ? 'Ese correo no parece válido.' : '',
    message: form.message.trim().length < 10 ? 'Cuéntame un poco más (mínimo 10 caracteres).' : '',
  }
  const showErr = (f) => (touched[f] || submitted ? errors[f] : '')

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

    if (hp) {
      setStatus('success')
      resetForm()
      setTimeout(() => setStatus('idle'), 6000)
      return
    }

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
      await sendMessage({ name: form.name, email: form.email, message: form.message, type, company: hp })
      try { localStorage.setItem(COOLDOWN_KEY, String(Date.now())) } catch { /* noop */ }
      setStatus('success')
      resetForm()
      setTimeout(() => setStatus('idle'), 6000)
    } catch (err) {
      setErrMsg(err instanceof TypeError ? 'Sin conexión a internet. Verifica tu red e intenta de nuevo.' : err.message)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const locked = status === 'loading' || status === 'success'
  const left = MAX_LEN - form.message.length

  return (
    <>
      <SEO
        title="Contacto | Luis Crisanto"
        description="Escríbeme para tu próximo proyecto: backend, cloud, full stack o visión por computadora."
        canonical="https://luis-crisanto.vercel.app/contacto"
      />
      <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-28 pt-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-channel">CAM 06 · Contacto</p>
          <h1 className="mt-4 font-display text-6xl font-bold leading-none md:text-8xl">
            Hablemos<span className="text-channel">.</span>
          </h1>
          <p className="mt-6 max-w-sm text-lg text-ink-200">Cuéntame qué tienes en mente. Te respondo pronto.</p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] tracking-widest text-ink-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-channel opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-channel" />
            </span>
            DISPONIBLE · PERÚ <LocalTime />
          </div>

          <div className="mt-10 space-y-6">
            <CopyEmail />
            <div className="flex gap-3">
              {SOCIALS.map(({ name, icon: Icon, url }) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" data-cursor={name.toUpperCase()} onMouseEnter={sfx.tick}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-ink-200 transition hover:border-channel hover:text-channel">
                  <Icon size={16} /> {name} <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <motion.div className="lg:col-span-7" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          <Spotlight>
            <form onSubmit={handleSubmit} noValidate className="relative space-y-6 p-6 md:p-10">
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>Empresa<input name="company" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></label>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field id="name" label="Nombre" error={showErr('name')}>
                  <input id="name" autoComplete="name" value={form.name} onChange={update('name')} onBlur={touch('name')} disabled={locked}
                    aria-invalid={!!showErr('name')} aria-describedby={showErr('name') ? 'name-err' : undefined}
                    placeholder="Tu nombre" className={inputCls(showErr('name'))} />
                </Field>
                <Field id="email" label="Correo" error={showErr('email')}>
                  <input id="email" type="email" autoComplete="email" value={form.email} onChange={update('email')} onBlur={touch('email')} disabled={locked}
                    aria-invalid={!!showErr('email')} aria-describedby={showErr('email') ? 'email-err' : undefined}
                    placeholder="tu@correo.com" className={inputCls(showErr('email'))} />
                </Field>
              </div>

              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-ink-400">¿Qué necesitas?</p>
                <div role="group" aria-label="Tipo de proyecto" className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((t) => (
                    <button key={t} type="button" aria-pressed={type === t} disabled={locked}
                      onClick={() => { setType(type === t ? '' : t); sfx.click() }} onMouseEnter={sfx.tick}
                      className={`rounded-full border px-4 py-2 text-sm transition ${type === t ? 'border-channel bg-channel text-ink-950' : 'border-white/10 text-ink-200 hover:border-white/30'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Field id="message" label="Mensaje" error={showErr('message')}
                right={<span className={`font-mono text-[11px] ${left < 100 ? 'text-rec' : 'text-ink-400'}`}>{left}</span>}>
                <textarea id="message" rows={6} maxLength={MAX_LEN} value={form.message} onChange={update('message')} onBlur={touch('message')} disabled={locked}
                  aria-invalid={!!showErr('message')} aria-describedby={showErr('message') ? 'message-err' : undefined}
                  placeholder="Cuéntame sobre tu proyecto…" className={`${inputCls(showErr('message'))} resize-none`} />
              </Field>

              <button type="submit" disabled={locked} data-cursor="ENVIAR"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold transition md:w-auto ${status === 'error' ? 'bg-rec text-white' : 'bg-channel text-ink-950 hover:brightness-110'
                  } disabled:cursor-not-allowed`}>
                {status === 'loading' && <><Loader2 size={18} className="animate-spin" /> Enviando…</>}
                {status === 'success' && <><Check size={18} /> Mensaje enviado</>}
                {status === 'error' && 'No se pudo enviar'}
                {status === 'idle' && <><Send size={16} /> Enviar mensaje</>}
              </button>

              <div aria-live="polite" className="min-h-[1.5rem] text-sm">
                {status === 'error' && errMsg && <p className="text-rec">{errMsg}</p>}
                {status === 'success' && <p className="text-ink-200">Gracias. Revisa tu correo: te llegó una confirmación.</p>}
              </div>
            </form>
          </Spotlight>
        </motion.div>
      </section>
    </>
  )
}