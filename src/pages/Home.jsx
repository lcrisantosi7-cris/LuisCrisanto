import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion, animate, useInView, useMotionValue, useSpring } from 'framer-motion'
import SEO from '../components/SEO'
import Layers from '../components/Layers'
import { SocialSidebar } from '../components/SocialLinks'
import { Rocket } from '../components/Rocket' // <-- Importamos el componente del cohete
import { PROJECTS } from '../data/techData'
import { IS_LITE } from '../lib/lite'

const SUBTITLE = 'Full Stack, Cloud y Visión por Computadora'
const TITLE_1 = 'Luis'
const TITLE_2 = 'Crisanto'
const DESCRIPTION = 'Full Stack Developer enfocado en backend y arquitectura en la nube que conecta las piezas detrás de cada sistema para hacerlo crecer de forma sólida y eficiente.'
const LEMA = 'Aprendo de todo. Construyo lo que importa.'
const STAR_HREF = '/proyectos/retailvision'
const WORDS = ['Diseño.', 'Programo.', 'Arquitecto.']
const FEATURED = PROJECTS.find((p) => p.slug === 'retailvision') || PROJECTS[0]

const STATS = [
  { to: PROJECTS.length, label: 'Proyectos construidos' },
  { to: 94.9, decimals: 1, suffix: '%', label: 'Recall detectando personas · RetailVision' },
  { to: 37, suffix: '+', label: 'Cursos y certificaciones' },
]

const C = { orange: '#FF6A2D', violet: '#5A4FE8', cream: '#F1E6D0', ink: '#070b19' }
const SPARK = 'M0,-26 C3,-9 9,-3 26,0 C9,3 3,9 0,26 C-3,9 -9,3 -26,0 C-9,-3 -3,-9 0,-26Z'
const SPARKS = [[140, 100, 1.1], [268, 62, 0.6], [720, 690, 1.2], [330, 850, 1], [650, 170, 0.5], [900, 430, 0.8]]
const DOTS = [[330, 100, 4], [700, 560, 5], [905, 700, 6], [90, 560, 4], [950, 80, 4], [640, 780, 4]]

const PLANETS = [
  { cx: 1320, cy: 320, r: 350, fill: C.orange, pat: 'pp-big', op: 0.95 },
  { cx: 470, cy: 790, r: 56, fill: C.cream, pat: 'pp-sm', op: 0.85 },
  { cx: 800, cy: 52, r: 92, fill: C.violet, pat: 'pp-sm', op: 0.85 },
]

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

function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#070b19] pt-32 lg:pt-36">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <pattern id="pp-big" patternUnits="userSpaceOnUse" width="512" height="512" patternTransform="scale(1.8)">
              <image href="/textures/speckle.png" width="512" height="512" />
            </pattern>
            <pattern id="pp-sm" patternUnits="userSpaceOnUse" width="512" height="512" patternTransform="translate(140 90) scale(0.7)">
              <image href="/textures/speckle.png" width="512" height="512" />
            </pattern>
            <linearGradient id="smoke-trail" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#F1E6D0" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FF6A2D" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#5A4FE8" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="1600" height="900" fill={C.ink} />

          {SPARKS.map(([x, y, s], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
              <path d={SPARK} fill={C.cream} className="twinkle" style={{ animationDelay: `${i * 0.5}s` }} />
            </g>
          ))}
          {DOTS.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={C.cream} opacity={0.6} />)}

          {PLANETS.map((p, idx) => (
            <g key={idx}>
              <circle cx={p.cx} cy={p.cy} r={p.r} fill={p.fill} />
              <circle cx={p.cx} cy={p.cy} r={p.r} fill={`url(#${p.pat})`} opacity={p.op} />
            </g>
          ))}

          {/* Cohete modularizado con la animación de órbita */}
          <Rocket />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-8">
        <div className="max-w-[42rem]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs uppercase tracking-[0.25em] text-slate-300"
          >
            {SUBTITLE}
          </motion.p>

          <h1 className="mt-4 font-poster text-[clamp(4.5rem,10vw,9.5rem)] uppercase leading-[0.9] text-poster-orange">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {TITLE_1}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {TITLE_2}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl font-normal"
          >
            {DESCRIPTION}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Link to="/proyectos" data-cursor="VER" className="inline-flex items-center gap-2 rounded-full bg-poster-orange px-7 py-3.5 font-semibold uppercase tracking-wider text-ink-950 transition hover:brightness-110 shadow-lg shadow-poster-orange/20">
                Ver proyectos <ArrowUpRight size={18} />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/contacto" data-cursor="HABLEMOS" className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-7 py-3 font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-ink-950">
                Hablemos
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const row = Array.from({ length: 4 })
  const half = (
    <div className="flex shrink-0 items-center">
      {row.map((_, i) => (
        <span key={i} className="flex items-center gap-8 px-4">
          <span className={`font-poster text-4xl uppercase md:text-6xl ${i % 2 ? 'text-transparent [-webkit-text-stroke:1px_#070b19]' : 'text-ink-950'}`}>
            {LEMA}
          </span>
        </span>
      ))}
    </div>
  )
  return (
    <div className="overflow-hidden bg-[#F1E6D0] py-6">
      <motion.div className="flex w-max" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 34, ease: 'linear', repeat: Infinity }}>
        {half}{half}
      </motion.div>
    </div>
  )
}

function Stats() {
  return (
    <section className="bg-[#5A4FE8] px-6 py-20 text-white">
      <div className="mx-auto grid max-w-7xl md:grid-cols-3">
        {STATS.map((s, i) => (
          <div key={s.label} className={`p-8 md:p-10 ${i ? 'md:border-l md:border-white/25' : ''}`}>
            <div className="font-poster text-7xl text-[#F1E6D0] md:text-9xl">
              <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <p className="mt-3 max-w-[16rem] text-sm text-white/80">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ThreeLayers() {
  const [tab, setTab] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setTab((t) => (t + 1) % WORDS.length), 5500)
    return () => clearInterval(id)
  }, [paused])

  const pick = (i) => { setTab(i); setPaused(true) }

  return (
    <section className="px-6 py-24 lg:py-32 bg-[#070b19] text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold text-poster-orange">Proyecto estrella · {FEATURED.title}</p>
          <h2 className="mt-4">
            {WORDS.map((w, i) => (
              <button
                key={w}
                type="button"
                onClick={() => pick(i)}
                className={`block text-left font-poster text-6xl uppercase leading-[0.95] transition-colors duration-300 md:text-8xl ${tab === i ? 'text-[#F1E6D0]' : 'text-white/20 hover:text-white/50'}`}
              >
                {w}
              </button>
            ))}
          </h2>
          <p className="mt-6 max-w-md text-lg text-slate-300">
            Un mismo proyecto, visto en tres capas: la interfaz, el código real y la arquitectura.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to={STAR_HREF} className="inline-flex items-center gap-2 rounded-full bg-poster-orange px-6 py-3 font-semibold uppercase tracking-wider text-ink-950 transition hover:brightness-110">
              Ver expediente <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <Layers layers={FEATURED.layers} title={FEATURED.title} tab={tab} onTab={pick} />
        </div>
      </div>
    </section>
  )
}

function Closing() {
  return (
    <section className="bg-poster-orange px-6 py-24 text-ink-950">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold">06 — Contacto</p>
        <h2 className="mt-4 font-poster text-7xl uppercase leading-[0.9] md:text-[9rem]">
          ¿Tienes algo en mente?
        </h2>
        <div className="mt-10">
          <Link to="/contacto" className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-8 py-4 font-semibold text-xl uppercase tracking-wider text-[#F1E6D0] transition hover:bg-ink-800">
            Hablemos <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <SEO
        title="Luis Crisanto | Desarrollador Full Stack & Cloud"
        description="Desarrollador Full Stack enfocado en backend y arquitectura en la nube que conecta las piezas detrás de cada sistema."
        canonical="https://luis-crisanto.vercel.app/"
      />
      <SocialSidebar />
      <Hero />
      <Marquee />
      <Stats />
      <ThreeLayers />
      <Closing />
    </>
  )
}