import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Play } from 'lucide-react'
import {
  motion, AnimatePresence, animate, useInView, useMotionValue,
  useSpring, useReducedMotion,
} from 'framer-motion'
import SEO from '../components/SEO'
import Layers from '../components/Layers'
import { SocialSidebar, SocialRow } from '../components/SocialLinks'
import { Logo } from '../components/Header'
import { PROJECTS } from '../data/techData'
import { IS_LITE } from '../lib/lite'

// ── Contenido editable ───────────────────────────────────────────────────────
const LEMA = 'Aprendo de todo. Construyo lo que importa.'
const STAR_HREF = '/proyectos/retailvision'
const VIDEO_URL = 'https://youtu.be/cygu65ytwTc?si=QZDDV75dxKx0iAmt' // referencial
const WORDS = ['Diseño.', 'Programo.', 'Arquitecto.']
const FEATURED = PROJECTS.find((p) => p.slug === 'retailvision')

const STATS = [
  { to: PROJECTS.length, label: 'Proyectos construidos' },
  { to: 94.9, decimals: 1, suffix: '%', label: 'Recall detectando personas · RetailVision' },
  { to: 37, suffix: '+', label: 'Cursos y certificaciones' }, // confirma esta cifra
]

const SHOTS = [
  { label: 'Análisis', src: '/projects/retailvision-analisis.webp' },
  { label: 'Reportes', src: '/projects/retailvision-reporte.webp' },
]

const STAR_TAGS = ['Python', 'YOLOv8', 'FastAPI', 'React']

// ── Utilidades de animación ──────────────────────────────────────────────────
function Magnetic({ children }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 })
  const sy = useSpring(y, { stiffness: 220, damping: 16 })
  const onMove = (e) => {
    if (IS_LITE) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={reset} className="inline-block">
      {children}
    </motion.div>
  )
}

function CountUp({ to, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: setV })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref} className="tabular-nums">{v.toFixed(decimals)}{suffix}</span>
}

const Bracket = ({ pos, className = 'h-3.5 w-3.5 border-vision' }) => {
  const m = {
    tl: 'top-0 left-0 border-t-2 border-l-2',
    tr: 'top-0 right-0 border-t-2 border-r-2',
    bl: 'bottom-0 left-0 border-b-2 border-l-2',
    br: 'bottom-0 right-0 border-b-2 border-r-2',
  }[pos]
  return <span className={`absolute ${className} ${m}`} />
}
// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [tab, setTab] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setTab((t) => (t + 1) % WORDS.length), 5500)
    return () => clearInterval(id)
  }, [paused])

  const pick = (i) => { setTab(i); setPaused(true) }

  return (
    <section className="-mt-20 flex min-h-[100svh] items-center pb-16 pt-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <img src="/me.webp" alt="" width="48" height="48" className="h-12 w-12 rounded-full bg-ink-700 object-cover object-top" />
            <div>
              <p className="font-semibold leading-tight">Luis Crisanto</p>
              <p className="flex items-center gap-2 text-sm text-ink-200">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-channel opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-channel" />
                </span>
                Disponible para proyectos
              </p>
            </div>
          </motion.div>

          <h1 className="mt-10" aria-label="Diseño. Programo. Arquitecto.">
            {WORDS.map((w, i) => (
              <span key={w} className="block overflow-hidden pb-1">
                <motion.button
                  type="button"
                  data-cursor="VER"
                  aria-pressed={tab === i}
                  onMouseEnter={() => pick(i)}
                  onFocus={() => pick(i)}
                  onMouseLeave={() => setPaused(false)}
                  onBlur={() => setPaused(false)}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.55 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={`block text-left font-display text-6xl font-extrabold leading-[0.95] tracking-tight transition-colors duration-300 sm:text-7xl xl:text-8xl ${tab === i ? 'text-white' : 'text-white/20 hover:text-white/50'
                    }`}
                >
                  {w}
                </motion.button>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8 max-w-md text-lg text-ink-200"
          >
            Full Stack, cloud y visión por computadora. A la derecha, <em className="font-serif text-xl italic text-white">un mismo proyecto</em> visto en tres capas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Link to="/proyectos" data-cursor="VER" className="inline-flex items-center gap-2 rounded-full bg-channel px-7 py-3.5 font-semibold text-ink-950 transition hover:brightness-110">
                Ver proyectos <ArrowUpRight size={18} />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/contacto" data-cursor="HABLEMOS" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold text-white transition hover:border-channel hover:text-channel">
                Hablemos
              </Link>
            </Magnetic>
            <div className="ml-1 hidden sm:block"><SocialRow size={18} /></div>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Layers layers={FEATURED.layers} title={FEATURED.title} tab={tab} onTab={pick} />
        </motion.div>
      </div>
    </section>
  )
}
// ── LEMA (marquesina) ────────────────────────────────────────────────────────
function Marquee() {
  const still = useReducedMotion()
  const row = Array.from({ length: 4 })
  const half = (
    <div className="flex shrink-0 items-center">
      {row.map((_, i) => (
        <span key={i} className="flex items-center gap-8 px-4">
          <span
            className={`font-display text-3xl font-extrabold uppercase md:text-5xl ${i % 2 ? 'text-transparent [-webkit-text-stroke:1px_#0b0b0f]' : 'text-ink-950'
              }`}
          >
            {LEMA}
          </span>
          <Logo className="h-5 w-auto text-ink-950" />
        </span>
      ))}
    </div>
  )
  return (
    <div aria-label={LEMA} className="overflow-hidden bg-channel py-6">
      <motion.div
        aria-hidden
        className="flex w-max"
        animate={still ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
      >
        {half}{half}
      </motion.div>
    </div>
  )
}
// ── DATOS ────────────────────────────────────────────────────────────────────
function Stats() {
  return (
    <section className="bg-vision px-6 py-20">
      <div className="mx-auto grid max-w-7xl md:grid-cols-3">
        {STATS.map((s, i) => (
          <div key={s.label} className={`p-8 md:p-10 ${i ? 'md:border-l md:border-white/25' : ''}`}>
            <div className="font-display text-6xl font-extrabold text-white md:text-8xl">
              <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <p className="mt-3 max-w-[16rem] text-sm text-white/80">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
// ── PROYECTO ESTRELLA ────────────────────────────────────────────────────────
function Star() {
  const [tab, setTab] = useState(0)
  const [paused, setPaused] = useState(false)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 120, damping: 18 })
  const sry = useSpring(ry, { stiffness: 120, damping: 18 })

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setTab((t) => (t + 1) % SHOTS.length), 4500)
    return () => clearInterval(id)
  }, [paused])

  const onMove = (e) => {
    if (IS_LITE) return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8)
  }
  const onLeave = () => { rx.set(0); ry.set(0); setPaused(false) }

  const shot = SHOTS[tab]

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-400">
            <span className="h-2 w-2 rounded-full bg-channel" /> Proyecto estrella · En desarrollo
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">RetailVision Analytics</h2>
          <p className="mt-5 max-w-md text-lg text-ink-200">
            Cámaras que cuentan quién entra, adónde va y cuánto se queda, para que el negocio ponga lo importante donde está la gente.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {STAR_TAGS.map((t) => (
              <span key={t} className="rounded-full border border-vision/40 bg-vision/10 px-3 py-1 font-mono text-xs text-vision-light">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to={STAR_HREF}
              data-cursor="VER"
              className="inline-flex items-center gap-2 rounded-full bg-channel px-6 py-3 font-semibold text-ink-950 transition hover:brightness-110"
            >
              Ver proyecto <ArrowUpRight size={16} />
            </Link>
            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="DEMO"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-200 transition hover:text-channel"
            >
              <Play size={16} /> Ver demo en video
            </a>
          </div>
        </motion.div>

        <div className="lg:col-span-7" style={{ perspective: 1200 }} onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={() => setPaused(true)}>
          <motion.div
            style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-3 hidden font-mono text-[11px] text-ink-400 sm:block">retailvision · cam entrada principal</span>
              </div>
              <div className="flex gap-1">
                {SHOTS.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => { setTab(i); setPaused(true) }}
                    data-cursor={s.label.toUpperCase()}
                    aria-pressed={tab === i}
                    className={`rounded-md px-3 py-1 font-mono text-[11px] transition ${tab === i ? 'bg-channel text-ink-950' : 'text-ink-400 hover:text-white'
                      }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative aspect-[1918/780] overflow-hidden bg-ink-800">
              <AnimatePresence mode="wait">
                <motion.img
                  key={shot.src}
                  src={shot.src}
                  alt={`RetailVision — ${shot.label}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── CIERRE ───────────────────────────────────────────────────────────────────
function Closing() {
  return (
    <section className="bg-channel px-6 py-24 text-ink-950">
      <motion.div
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-sm font-semibold">06 — Contacto</p>
        <h2 className="mt-4 font-display text-6xl font-extrabold leading-none md:text-9xl">
          ¿Tienes algo <em className="font-serif font-normal italic">en mente?</em>
        </h2>
        <div className="mt-10">
          <Magnetic>
            <Link
              to="/contacto"
              data-cursor="HABLEMOS"
              className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-8 py-4 text-lg font-semibold text-white transition hover:bg-ink-800"
            >
              Hablemos <ArrowUpRight size={20} />
            </Link>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  )
}

// ── PÁGINA ───────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <SEO
        title="Luis Crisanto | Desarrollador Full Stack & Cloud"
        description="Desarrollador Full Stack e Ingeniero de Sistemas. Construyo sistemas web, soluciones cloud y visión por computadora."
        canonical="https://luis-crisanto.vercel.app/"
        keywords="Luis Crisanto, Full Stack Developer, Cloud, AWS, React, Python, FastAPI, YOLOv8, Perú"
      />
      <SocialSidebar />
      <Hero />
      <Marquee />
      <Stats />
      <Star />
      <Closing />
    </>
  )
}