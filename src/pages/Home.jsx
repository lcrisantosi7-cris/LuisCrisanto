import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Terminal, ExternalLink, Cloud, Server, Database, Layers,
  Sparkles, Camera, Cpu, Radio, LayoutDashboard,
} from 'lucide-react'
import {
  motion, useMotionValue, useMotionTemplate, useSpring,
  useScroll, useTransform, useReducedMotion,
} from 'framer-motion'
import SEO from '../components/SEO'
import { SocialSidebar, SocialRow } from '../components/SocialLinks'

// ── Animaciones ──────────────────────────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const up = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const inView = {
  variants: up,
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-80px' },
}

// ── Datos ────────────────────────────────────────────────────────────────────
const STAR_PROJECT = {
  label: 'Proyecto destacado',
  title: 'RetailVision Analytics',
  description:
    'Sistema de analítica en tiempo real con procesamiento de video, APIs, WebSockets y métricas de afluencia para múltiples cámaras.',
  problem: 'El negocio no sabe por dónde se mueve realmente su gente.',
  solution:
    'Detecta personas por cámara y muestra dónde se concentra la afluencia, para poner productos y promociones donde más se mueve la gente.',
  tags: ['Python', 'FastAPI', 'YOLOv8', 'React', 'WebSocket'],
  github: 'https://github.com/lcrisantosi7-cris/retailvision-analytics',
}

const PIPELINE = [
  { icon: Camera, title: 'Cámaras', text: 'Video del retail en tiempo real.' },
  { icon: Cpu, title: 'Detección', text: 'YOLOv8 identifica personas en cada frame.' },
  { icon: Server, title: 'API', text: 'FastAPI procesa métricas de afluencia por cámara.' },
  { icon: Radio, title: 'WebSocket', text: 'Los datos llegan al panel sin recargar.' },
  { icon: LayoutDashboard, title: 'Dashboard', text: 'React muestra zonas calientes y afluencia.' },
]

const STACK_LAYERS = [
  { title: 'Cloud & Infra', icon: Cloud, accent: '252,143,84', tag: 'En foco', items: ['AWS', 'Docker'] },
  { title: 'Backend', icon: Server, accent: '104,103,210', items: ['Node.js', 'Python', 'FastAPI', 'PHP', 'REST APIs', 'WebSocket'] },
  { title: 'Datos', icon: Database, accent: '104,103,210', items: ['MySQL'] },
  { title: 'Frontend', icon: Layers, accent: '252,143,84', items: ['React'] },
]

const STATS = [
  { value: '8+', label: 'Proyectos' },
  { value: '37+', label: 'Cursos' },
  { value: '∞', label: 'Aprendizaje constante' },
]

// ── Tarjeta con spotlight ────────────────────────────────────────────────────
function SpotlightCard({ children, className = '', accent = '252,143,84' }) {
  const x = useMotionValue(-300)
  const y = useMotionValue(-300)
  const bg = useMotionTemplate`radial-gradient(340px circle at ${x}px ${y}px, rgba(${accent},0.13), transparent 70%)`

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - r.left)
        y.set(e.clientY - r.top)
      }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: bg }} />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

// ── Plano de tienda con mapa de calor (simulación) ───────────────────────────
function StoreMap() {
  const reduce = useReducedMotion()

  const heat = [
    { cx: 95, cy: 82, r: 50, delay: 0 },
    { cx: 225, cy: 128, r: 62, delay: 0.9 },
    { cx: 150, cy: 180, r: 36, delay: 1.6 },
  ]
  const shelves = [
    [50, 55, 90, 12], [50, 98, 90, 12], [190, 55, 80, 12],
    [190, 98, 80, 12], [50, 150, 70, 12], [180, 176, 90, 12],
  ]
  const people = [
    { x: [40, 90, 150, 90, 40], y: [190, 150, 110, 70, 30], d: 9 },
    { x: [280, 230, 220, 250, 280], y: [40, 80, 130, 170, 200], d: 11 },
    { x: [60, 130, 210, 290, 210, 130, 60], y: [125, 132, 128, 120, 128, 132, 125], d: 12 },
    { x: [150, 160, 150, 140, 150], y: [30, 90, 175, 100, 30], d: 10 },
    { x: [230, 220, 230], y: [190, 140, 190], d: 7 },
  ]

  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full h-full"
      role="img"
      aria-label="Simulación de mapa de calor de afluencia en una tienda"
    >
      <defs>
        <radialGradient id="rv-heat">
          <stop offset="0%" stopColor="#F5525B" stopOpacity="0.65" />
          <stop offset="45%" stopColor="#FC8F54" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#FC8F54" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Piso */}
      <rect x="4" y="4" width="312" height="212" rx="14" fill="rgba(255,255,255,0.02)" stroke="rgba(104,103,210,0.3)" />

      {/* Zonas calientes */}
      {heat.map((h, i) => (
        <motion.circle
          key={i}
          cx={h.cx}
          cy={h.cy}
          r={h.r}
          fill="url(#rv-heat)"
          style={{ transformOrigin: `${h.cx}px ${h.cy}px` }}
          animate={reduce ? undefined : { scale: [1, 1.18, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: h.delay }}
        />
      ))}

      {/* Estantes */}
      {shelves.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="rgba(104,103,210,0.22)" stroke="rgba(104,103,210,0.45)" />
      ))}

      {/* Personas */}
      {people.map((p, i) => (
        <motion.circle
          key={i}
          r="3"
          fill="#fff"
          initial={{ cx: p.x[0], cy: p.y[0] }}
          animate={reduce ? undefined : { cx: p.x, cy: p.y }}
          transition={{ duration: p.d, repeat: Infinity, ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 0 4px rgba(252,143,84,0.9))' }}
        />
      ))}

      {/* Cámaras */}
      {[[16, 16], [304, 16], [16, 204], [304, 204]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="3.5" fill="#6867D2" />
          <motion.circle
            cx={cx}
            cy={cy}
            r="3.5"
            fill="none"
            stroke="#6867D2"
            animate={reduce ? undefined : { r: [3.5, 11], opacity: [0.8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: i * 0.5 }}
          />
        </g>
      ))}
    </svg>
  )
}

// ── Chip flotante 3D ─────────────────────────────────────────────────────────
function Chip({ icon: Icon, label, z, className = '', delay = 0, accent = '252,143,84' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`absolute flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-md whitespace-nowrap ${className}`}
      style={{
        z,
        background: 'rgba(13,11,20,0.9)',
        border: `1px solid rgba(${accent},0.35)`,
        boxShadow: `0 12px 30px -8px rgba(${accent},0.35)`,
      }}
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <Icon size={13} style={{ color: `rgb(${accent})` }} />
      <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.85)' }}>
        {label}
      </span>
    </motion.div>
  )
}

// ── Escena 3D del hero ───────────────────────────────────────────────────────
function HeroScene() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 18 })

  const onMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full max-w-[540px] mx-auto py-8"
      style={{ perspective: '1200px' }}
    >
      <motion.div className="relative" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        {/* Glow */}
        <div
          className="absolute -inset-8 rounded-[2rem] blur-3xl opacity-50 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(252,143,84,0.35), rgba(104,103,210,0.2) 60%, transparent 75%)' }}
        />

        {/* Capa trasera (profundidad) */}
        <motion.div
          className="absolute inset-3 rounded-3xl"
          style={{
            z: -50,
            background: 'rgba(104,103,210,0.08)',
            border: '1px solid rgba(104,103,210,0.25)',
          }}
        />

        {/* Tarjeta base */}
        <div
          className="relative rounded-3xl p-3 backdrop-blur-xl"
          style={{
            background: 'rgba(13,11,20,0.75)',
            border: '1px solid rgba(252,143,84,0.2)',
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.65)',
          }}
        >
          <div className="flex items-center justify-between px-2 pb-3">
            <div className="flex gap-1.5">
              {['#F5525B', '#FC8F54', '#6867D2'].map((c) => (
                <span key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.8 }} />
              ))}
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              retailvision · simulación
            </span>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <StoreMap />
          </div>
        </div>

        {/* Chips a distintas profundidades */}
        <Chip icon={Camera} label="Cámara 01" z={70} className="-top-3 -left-2 sm:-left-8" />
        <Chip icon={Cpu} label="YOLOv8 · detección" z={110} accent="104,103,210" delay={0.7} className="top-1/3 -right-2 sm:-right-10" />
        <Chip icon={Radio} label="WebSocket · tiempo real" z={60} accent="104,103,210" delay={1.3} className="-bottom-2 left-4 sm:left-8" />
        <Chip icon={Sparkles} label="Zona de mayor afluencia" z={95} delay={2} className="-bottom-5 -right-1 sm:-right-6" />
      </motion.div>
    </div>
  )
}

// ── Paso del pipeline (se enciende con el scroll) ────────────────────────────
function PipelineStep({ step, i, total, progress }) {
  const start = i / total
  const lit = useTransform(progress, [start - 0.05, start + 0.12], [0.25, 1])
  const scale = useTransform(progress, [start - 0.05, start + 0.12], [0.92, 1])
  const Icon = step.icon

  return (
    <motion.div className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center" style={{ opacity: lit }}>
      <motion.div
        className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 md:mb-4"
        style={{
          scale,
          background: '#0d0b14',
          border: '1px solid rgba(252,143,84,0.4)',
          boxShadow: '0 0 24px rgba(252,143,84,0.18)',
        }}
      >
        <Icon size={18} style={{ color: '#FC8F54' }} />
      </motion.div>
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: 'rgba(104,103,210,0.8)' }}>
          0{i + 1}
        </p>
        <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
        <p className="text-xs leading-relaxed max-w-[180px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {step.text}
        </p>
      </div>
    </motion.div>
  )
}

function Pipeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })

  return (
    <div ref={ref} className="relative">
      <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
      <motion.div
        className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px origin-left"
        style={{ scaleX: scrollYProgress, background: 'linear-gradient(90deg, #FC8F54, #F5525B, #6867D2)' }}
      />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {PIPELINE.map((s, i) => (
          <PipelineStep key={s.title} step={s} i={i} total={PIPELINE.length} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  )
}

// ── Título de sección ────────────────────────────────────────────────────────
function SectionTitle({ eyebrow, children }) {
  return (
    <motion.div {...inView} className="mb-10 lg:mb-14">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-8" style={{ background: '#FC8F54' }} />
        <span className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: 'rgba(252,143,84,0.7)' }}>
          {eyebrow}
        </span>
      </div>
      <h2
        className="font-black tracking-tighter leading-[0.95] text-white"
        style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        {children}
      </h2>
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress: pageProgress } = useScroll()
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(heroProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(heroProgress, [0, 1], [0, 60])
  const contentOpacity = useTransform(heroProgress, [0, 0.8], [1, 0.15])

  return (
    <>
      <SEO
        title="Luis Crisanto | Backend, Software Architecture & Cloud"
        description="Ingeniero de Sistemas enfocado en backend, arquitectura de software y cloud computing. Construyo APIs, sistemas escalables y soluciones web."
        canonical="https://luis-crisanto.vercel.app/"
        keywords="Luis Crisanto, Ingeniero de Sistemas, Backend Developer, Software Architecture, Cloud Computing, AWS, Node.js, FastAPI, Python, React"
      />

      {/* Barra de progreso de scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
        style={{ scaleX: pageProgress, background: 'linear-gradient(90deg, #FC8F54, #F5525B, #6867D2)' }}
      />

      <SocialSidebar />

      {/* ════════════ HERO ════════════ */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden flex items-center">
        {/* Fondo con parallax */}
        <motion.div
          className="absolute -inset-y-10 inset-x-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/Porfolio.webp')", y: bgY }}
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(13,11,20,0.6) 0%, rgba(13,11,20,0.8) 50%, #0d0b14 100%)' }}
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
          style={{ background: 'linear-gradient(to right, rgba(13,11,20,0.75) 0%, rgba(13,11,20,0.3) 55%, transparent 100%)' }}
        />
        {/* Puntos sutiles */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(104,103,210,0.22) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(ellipse at 70% 50%, black 10%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 10%, transparent 70%)',
          }}
        />

        {/* CONTENIDO */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-20 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-16 pt-28 pb-16 lg:pt-0 lg:pb-0 min-h-screen flex items-center"
        >
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-10"
          >
            {/* ── Texto ── */}
            <div className="flex-1 text-center lg:text-left w-full lg:max-w-[52%]">
              {/* Badge con avatar */}
              <motion.div variants={up} className="flex justify-center lg:justify-start mb-6">
                <div
                  className="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full backdrop-blur-md"
                  style={{ background: 'rgba(252,143,84,0.1)', border: '1px solid rgba(252,143,84,0.3)' }}
                >
                  <img
                    src="/informalCV.webp"
                    alt="Luis Crisanto"
                    className="w-6 h-6 rounded-full object-cover object-top"
                  />
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#FC8F54' }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#FC8F54' }} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: '#ffb388' }}>
                    Disponible para proyectos
                  </span>
                </div>
              </motion.div>

              <motion.p
                variants={up}
                className="font-mono text-xs uppercase tracking-[0.3em] mb-3"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                Ingeniero · Arquitectura de Software · Cloud
              </motion.p>

              {/* Título con revelado por máscara */}
              <h1
                className="font-black leading-[0.88] tracking-tighter mb-5"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(3rem, 9vw, 6rem)' }}
              >
                <span className="sr-only">
                  Luis Crisanto — Ingeniero de Sistemas enfocado en backend, arquitectura de software y cloud computing
                </span>
                <span className="block overflow-hidden pb-[0.08em]" aria-hidden>
                  <motion.span
                    className="block text-white"
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  >
                    LUIS
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-[0.08em]" aria-hidden>
                  <motion.span
                    className="block text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(90deg, #FC8F54 0%, #F5525B 50%, #6867D2 100%)' }}
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
                  >
                    CRISANTO
                  </motion.span>
                </span>
              </h1>

              <motion.p
                variants={up}
                className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                Diseño sistemas que escalan.{' '}
                <span className="text-white font-medium">Construyo backends robustos y arquitecturas cloud</span>{' '}
                pensadas para crecer.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={up} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                <Link to="/contact" className="w-full sm:w-auto">
                  <button
                    className="w-full group px-7 py-3.5 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 text-white"
                    style={{ background: 'linear-gradient(90deg, #FC8F54, #F5525B)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 32px rgba(252,143,84,0.45)'
                      e.currentTarget.style.transform = 'scale(1.03)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    Hablemos
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <Link to="/projects" className="w-full sm:w-auto">
                  <button
                    className="w-full group px-7 py-3.5 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 backdrop-blur-sm"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      color: 'rgba(255,255,255,0.8)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(104,103,210,0.55)'
                      e.currentTarget.style.color = '#fff'
                      e.currentTarget.style.transform = 'scale(1.03)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                      e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <Terminal className="w-4 h-4" style={{ color: '#6867D2' }} />
                    Ver proyectos
                  </button>
                </Link>
              </motion.div>

              <motion.div variants={up} className="flex justify-center lg:hidden">
                <SocialRow size={18} />
              </motion.div>
            </div>

            {/* ── Escena 3D ── */}
            <motion.div variants={up} className="flex-1 w-full">
              <HeroScene />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Indicador de scroll */}
        <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full flex justify-center pt-1.5" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
            <motion.span
              className="w-1 h-1.5 rounded-full"
              style={{ background: '#FC8F54' }}
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </section>

      {/* ════════════ PIPELINE (scroll) ════════════ */}
      <section
        className="relative z-10 px-5 sm:px-8 lg:px-16 py-20 lg:py-28"
        style={{ background: '#0d0b14', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle eyebrow="Arquitectura">
            Del video a la decisión,
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #FC8F54, #F5525B)' }}>
              en tiempo real.
            </span>
          </SectionTitle>
          <Pipeline />
        </div>
      </section>

      {/* ════════════ BENTO ════════════ */}
      <section className="relative z-10 px-5 sm:px-8 lg:px-16 pb-24 lg:pb-32" style={{ background: '#0d0b14' }}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle eyebrow="Trabajo y stack">
            Lo que construyo,
            <br />
            <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)', color: 'transparent' }}>y con qué.</span>
          </SectionTitle>

          <div className="grid gap-4 lg:grid-cols-6">
            {/* Proyecto estrella */}
            <motion.div {...inView} className="lg:col-span-4 lg:row-span-2">
              <SpotlightCard className="h-full p-6 sm:p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: 'rgba(252,143,84,0.7)' }}>
                      {STAR_PROJECT.label}
                    </span>
                    <h3
                      className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {STAR_PROJECT.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {STAR_PROJECT.description}
                    </p>

                    <div className="mt-5 space-y-3">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: 'rgba(104,103,210,0.85)' }}>
                          Problema
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {STAR_PROJECT.problem}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: 'rgba(252,143,84,0.85)' }}>
                          Solución
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {STAR_PROJECT.solution}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {STAR_PROJECT.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono px-2 py-0.5 rounded"
                          style={{
                            background: 'rgba(252,143,84,0.08)',
                            border: '1px solid rgba(252,143,84,0.2)',
                            color: 'rgba(252,143,84,0.75)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-5">
                      <Link
                        to="/projects"
                        className="group inline-flex items-center gap-1.5 text-xs font-bold text-white"
                      >
                        Ver proyectos
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" style={{ color: '#FC8F54' }} />
                      </Link>
                      <a
                        href={STAR_PROJECT.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono transition-colors"
                        style={{ color: 'rgba(255,255,255,0.35)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#FC8F54')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                      >
                        GitHub <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  <div
                    className="rounded-2xl p-2"
                    style={{ background: 'rgba(13,11,20,0.6)', border: '1px solid rgba(104,103,210,0.2)' }}
                  >
                    <StoreMap />
                    <p className="text-center font-mono text-[9px] uppercase tracking-[0.25em] pt-2 pb-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      Simulación de afluencia
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Stats */}
            <motion.div {...inView} className="lg:col-span-2">
              <SpotlightCard className="h-full p-6" accent="104,103,210">
                <div className="flex items-center justify-between gap-4 h-full">
                  {STATS.map((s) => (
                    <div key={s.label}>
                      <p className="text-3xl font-black text-white font-mono leading-none mb-1">{s.value}</p>
                      <p className="text-[9px] uppercase tracking-widest max-w-[80px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Aprendiendo ahora */}
            <motion.div {...inView} className="lg:col-span-2">
              <SpotlightCard className="h-full p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#FC8F54' }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#FC8F54' }} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Aprendiendo ahora
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['AWS', 'Docker', 'Arquitectura de software'].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-[11px] font-mono"
                      style={{ color: '#ffb388', background: 'rgba(252,143,84,0.08)', border: '1px solid rgba(252,143,84,0.25)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Stack por capas */}
            <motion.div {...inView} className="lg:col-span-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {STACK_LAYERS.map((g) => (
                  <SpotlightCard key={g.title} accent={g.accent} className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <g.icon size={15} style={{ color: `rgb(${g.accent})` }} />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-white">{g.title}</span>
                      </div>
                      {g.tag && (
                        <span
                          className="text-[9px] px-2 py-0.5 rounded font-mono"
                          style={{ color: '#FC8F54', background: 'rgba(252,143,84,0.1)', border: '1px solid rgba(252,143,84,0.3)' }}
                        >
                          {g.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map((it) => (
                        <span
                          key={it}
                          className="px-2.5 py-1 rounded-full text-[11px] font-mono"
                          style={{
                            color: 'rgba(255,255,255,0.6)',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section >
    </>
  )
}