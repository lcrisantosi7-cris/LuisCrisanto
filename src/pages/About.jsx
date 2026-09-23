import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cloud, Server, Database, Layers, Terminal, Download, ChevronRight, Sparkles } from 'lucide-react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import SEO from '../components/SEO'

// ── Variantes ───────────────────────────────────────────────────────────────
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

// ── Datos ───────────────────────────────────────────────────────────────────
const LEARNING = [
  'AWS y servicios cloud',
  'Arquitectura de software',
  'Docker y contenedores',
  'APIs escalables',
]

const FOCUS = [
  {
    icon: Cloud,
    title: 'Arquitectura en la nube',
    text: 'Diseño sistemas pensando en escalabilidad, costo y disponibilidad desde el día uno.',
    accent: '252,143,84',
  },
  {
    icon: Server,
    title: 'Backend sólido',
    text: 'APIs, bases de datos y tiempo real: la lógica que sostiene todo el producto.',
    accent: '104,103,210',
  },
  {
    icon: Sparkles,
    title: 'Aprendizaje continuo',
    text: 'Me actualizo constantemente. Cada proyecto es una excusa para aprender algo nuevo.',
    accent: '252,143,84',
  },
]

const STACK = [
  { title: 'Cloud & Infra', icon: Cloud, accent: '252,143,84', tag: 'En foco', items: ['AWS', 'Docker'] },
  {
    title: 'Backend',
    icon: Server,
    accent: '104,103,210',
    items: ['Node.js / Express', 'FastAPI / Python', 'PHP / Laravel', 'REST APIs', 'WebSocket'],
  },
  { title: 'Datos', icon: Database, accent: '104,103,210', items: ['MySQL', 'SQL Server'] },
  { title: 'Frontend', icon: Layers, accent: '252,143,84', items: ['React', 'Vue.js'] },
]

const TIMELINE = [
  {
    date: 'Ahora',
    title: 'Profundizando en arquitectura cloud',
    sub: 'Aprendizaje continuo · AWS + Docker',
    tags: ['AWS', 'Arquitectura', 'Aprendizaje continuo'],
    active: true,
  },
  {
    date: '2024',
    title: 'RetailVision Analytics',
    sub: 'Proyecto de tesis · YOLOv8 + FastAPI + React',
    tags: ['Computer Vision', 'Full Stack', 'Tiempo real'],
    active: false,
  },
  {
    date: '2023',
    title: 'School Management System',
    sub: 'Proyecto académico · Node.js + MySQL',
    tags: ['REST API', 'Backend', 'Deployado'],
    active: false,
  },
]

const MARQUEE = [
  'AWS', 'Docker', 'Node.js', 'FastAPI', 'Python', 'PHP', 'Laravel',
  'React', 'Vue.js', 'MySQL', 'SQL Server', 'REST APIs', 'WebSocket',
]

// ── Tarjeta con spotlight que sigue el mouse ────────────────────────────────
function SpotlightCard({ children, className = '', accent = '252,143,84' }) {
  const x = useMotionValue(-300)
  const y = useMotionValue(-300)
  const bg = useMotionTemplate`radial-gradient(320px circle at ${x}px ${y}px, rgba(${accent},0.13), transparent 70%)`

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - r.left)
        y.set(e.clientY - r.top)
      }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: bg }} />
      <div className="relative">{children}</div>
    </div>
  )
}

// ── Palabras rotativas ──────────────────────────────────────────────────────
function Rotating() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % LEARNING.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom min-w-[190px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="block"
        >
          {LEARNING[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ── Diagrama de arquitectura cloud animado ──────────────────────────────────
function ArchDiagram() {
  const reduce = useReducedMotion()

  const flow = (d, delay = 0) => (
    <motion.path
      d={d}
      fill="none"
      stroke="#FC8F54"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="4 7"
      animate={reduce ? undefined : { strokeDashoffset: [0, -22] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay }}
    />
  )

  const node = (x, y, w, label, accent) => (
    <g>
      <rect x={x} y={y} width={w} height="44" rx="10" fill="rgba(13,11,20,0.92)" stroke={accent} strokeOpacity="0.55" />
      <text
        x={x + w / 2}
        y={y + 26}
        textAnchor="middle"
        fontSize="11"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fill="rgba(255,255,255,0.85)"
      >
        {label}
      </text>
    </g>
  )

  return (
    <svg
      viewBox="0 0 400 240"
      className="w-full h-full"
      role="img"
      aria-label="Diagrama de arquitectura cloud: cliente, API y base de datos"
    >
      {/* Frontera cloud */}
      <rect
        x="150" y="14" width="238" height="212" rx="18"
        fill="rgba(104,103,210,0.05)"
        stroke="rgba(104,103,210,0.45)"
        strokeDasharray="5 6"
      />
      <text
        x="166" y="33" fontSize="9" letterSpacing="3"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fill="rgba(104,103,210,0.8)"
      >
        CLOUD
      </text>

      {/* Flujos */}
      {flow('M114 120 H166')}
      {flow('M246 120 C268 120 268 64 290 64', 0.3)}
      {flow('M246 120 C268 120 268 176 290 176', 0.6)}

      {/* Nodos */}
      {node(14, 98, 100, 'React', 'rgba(255,255,255,0.4)')}
      {node(166, 98, 80, 'API', '#FC8F54')}
      {node(290, 42, 84, 'FastAPI', '#6867D2')}
      {node(290, 154, 84, 'MySQL', '#6867D2')}

      {/* Pulso en el nodo API */}
      <motion.rect
        x="166" y="98" width="80" height="44" rx="10"
        fill="none" stroke="#FC8F54" strokeWidth="1.5"
        animate={reduce ? undefined : { opacity: [0.15, 0.7, 0.15] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}

// ════════════════════════════════════════════════════════════════════════════
const About = () => {
  const { scrollY } = useScroll()
  const bloomA = useTransform(scrollY, [0, 900], [0, -120])
  const bloomB = useTransform(scrollY, [0, 900], [0, 90])

  return (
    <>
      <SEO
        title="Sobre Luis Crisanto | Arquitectura Cloud & Backend"
        description="Full Stack Developer enfocado en arquitectura en la nube y backend. En constante aprendizaje: AWS, Docker, Node.js, FastAPI y más."
        canonical="https://luis-crisanto.vercel.app/about"
        keywords="Luis Crisanto, Sobre mí, Arquitectura Cloud, AWS, Docker, Node.js, FastAPI, Backend, Full Stack"
      />

      {/* Marquee CSS (respeta reduced-motion) */}
      <style>{`
        @keyframes about-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .about-marquee-track { animation: about-marquee 32s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .about-marquee-track { animation: none; } }
      `}</style>

      <div className="min-h-screen relative overflow-hidden pt-28 pb-24" style={{ background: '#0d0b14' }}>
        {/* Fondo: textura de la foto del hero */}
        <div
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/Porfolio.webp')", opacity: 0.06, filter: 'blur(8px)' }}
        />
        {/* Patrón de puntos */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(104,103,210,0.25) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          }}
        />
        {/* Blooms con parallax */}
        <motion.div
          className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none blur-[140px]"
          style={{ background: 'rgba(104,103,210,0.07)', y: bloomA }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none blur-[130px]"
          style={{ background: 'rgba(252,143,84,0.06)', y: bloomB }}
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-6"
        >
          {/* ── ENCABEZADO ─────────────────────────────────────────────── */}
          <motion.header variants={up} className="mb-16 lg:mb-20">
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                className="h-px w-10 origin-left"
                style={{ background: '#FC8F54' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.35em]"
                style={{ color: 'rgba(252,143,84,0.7)' }}
              >
                Discovery Mode
              </span>
            </div>

            <h1
              className="font-black tracking-tighter leading-[0.88] mb-8"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(90deg, #FC8F54, #F5525B)' }}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  SOBRE
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block text-white"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.12)' }}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
                >
                  MÍ
                </motion.span>
              </span>
            </h1>

            <p
              className="text-xl sm:text-2xl leading-snug max-w-2xl font-light"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              Me enfoco en diseñar{' '}
              <span className="text-white font-semibold">arquitecturas en la nube</span> y estoy en
              constante aprendizaje.
            </p>

            <div
              className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md"
              style={{ background: 'rgba(252,143,84,0.07)', border: '1px solid rgba(252,143,84,0.25)' }}
            >
              <Sparkles size={14} style={{ color: '#FC8F54' }} />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.25em] hidden sm:inline"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                Aprendiendo ahora
              </span>
              <span className="text-sm font-semibold" style={{ color: '#ffb388' }}>
                <Rotating />
              </span>
            </div>

            <div
              className="h-px max-w-md mt-8"
              style={{ background: 'linear-gradient(90deg, #FC8F54, rgba(104,103,210,0.4), transparent)' }}
            />
          </motion.header>

          {/* ── LAYOUT PRINCIPAL ───────────────────────────────────────── */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* ═════ COLUMNA IZQUIERDA ═════ */}
            <div className="lg:col-span-7 space-y-16">
              {/* FOTO + BIO */}
              <motion.div variants={up} className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="relative flex-shrink-0 group">
                  <div
                    className="absolute -inset-0.5 rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, rgba(252,143,84,0.6), rgba(104,103,210,0.4))' }}
                  />
                  <div
                    className="relative w-40 h-40 lg:w-44 lg:h-44 rounded-2xl overflow-hidden"
                    style={{ background: '#1e1a24' }}
                  >
                    <img
                      src="/informalCV.webp"
                      alt="Luis Crisanto"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'rgba(252,143,84,0.08)' }}
                    />
                  </div>

                  {/* Badge flotante */}
                  <div className="absolute -bottom-3 left-0 right-0 flex justify-center pointer-events-none">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-md"
                      style={{ background: 'rgba(13,11,20,0.9)', border: '1px solid rgba(252,143,84,0.3)' }}
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        <span
                          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                          style={{ backgroundColor: '#FC8F54' }}
                        />
                        <span
                          className="relative inline-flex rounded-full h-1.5 w-1.5"
                          style={{ backgroundColor: '#FC8F54' }}
                        />
                      </span>
                      <span
                        className="text-[9px] font-mono font-bold uppercase tracking-wider"
                        style={{ color: '#ffb388' }}
                      >
                        Disponible
                      </span>
                    </motion.div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-lg leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    Soy Luis, <span className="text-white font-semibold italic">Full Stack Developer</span>{' '}
                    con enfoque en backend y arquitectura en la nube. Me interesa entender cómo se conectan
                    las piezas de un sistema (APIs, datos, infraestructura) para que crezca sin romperse.
                  </p>
                  <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Estoy en{' '}
                    <span style={{ color: '#FC8F54' }} className="font-medium">
                      constante aprendizaje
                    </span>
                    : me actualizo de forma continua y cada proyecto es una oportunidad para practicar
                    lo nuevo.
                  </p>

                  <div
                    className="flex gap-8 mt-6 pt-6"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    {[
                      { v: '8+', l: 'Proyectos' },
                      { v: '37+', l: 'Cursos' },
                      { v: 'Cloud', l: 'Enfoque' },
                    ].map((s) => (
                      <div key={s.l}>
                        <div className="text-xl font-black text-white font-mono leading-none mb-1">{s.v}</div>
                        <div className="text-[9px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ENFOQUE */}
              <motion.section {...inView}>
                <h2
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-6"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <Cloud size={16} style={{ color: '#FC8F54' }} />
                  Enfoque
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {FOCUS.map((f) => (
                    <SpotlightCard key={f.title} accent={f.accent} className="p-5 h-full">
                      <f.icon size={18} style={{ color: `rgb(${f.accent})` }} />
                      <h3 className="mt-4 mb-2 text-sm font-bold text-white leading-tight">{f.title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {f.text}
                      </p>
                    </SpotlightCard>
                  ))}
                </div>
              </motion.section>

              {/* STACK */}
              <motion.section {...inView}>
                <h2
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-6"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <Terminal size={16} style={{ color: '#6867D2' }} />
                  Core Tech Stack
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {STACK.map((g) => (
                    <SpotlightCard key={g.title} accent={g.accent} className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <g.icon size={15} style={{ color: `rgb(${g.accent})` }} />
                          <span className="text-xs font-bold uppercase tracking-widest text-white">
                            {g.title}
                          </span>
                        </div>
                        {g.tag && (
                          <span
                            className="text-[9px] px-2 py-0.5 rounded font-mono"
                            style={{
                              color: '#FC8F54',
                              background: 'rgba(252,143,84,0.1)',
                              border: '1px solid rgba(252,143,84,0.3)',
                            }}
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
              </motion.section>

              {/* CTAs */}
              <motion.div {...inView} className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <button
                    className="group px-8 py-4 font-bold rounded-2xl transition-all duration-300
                               flex items-center gap-2 hover:scale-[1.03] active:scale-95"
                    style={{ background: 'linear-gradient(90deg, #FC8F54, #F5525B)', color: '#fff' }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 28px rgba(252,143,84,0.35)')}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                  >
                    ¿Trabajamos juntos?
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <a
                  href="/cv-luis-crisanto.pdf"
                  download="CV_Luis_Crisanto.pdf"
                  className="px-8 py-4 font-bold rounded-2xl transition-all duration-300
                flex items-center gap-2 hover:scale-[1.03] active:scale-95 backdrop-blur-sm"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(104,103,210,0.45)'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                  }}
                >
                  <Download size={16} style={{ color: '#6867D2' }} />
                  Descargar CV
                </a>
              </motion.div>
            </div>

            {/* ═════ COLUMNA DERECHA (sticky en desktop) ═════ */}
            <motion.div variants={up} className="lg:col-span-5">
              <div
                className="lg:sticky lg:top-28 rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(104,103,210,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Cabecera: diagrama de arquitectura */}
                <div className="relative pt-6 px-5">
                  <div className="mb-2">
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.3em] mb-1"
                      style={{ color: 'rgba(252,143,84,0.7)' }}
                    >
                      Arquitectura
                    </p>
                    <h3 className="text-xl font-black text-white tracking-tight">Cómo pienso un sistema</h3>
                  </div>
                  <div className="h-48">
                    <ArchDiagram />
                  </div>
                </div>

                {/* Timeline */}
                <div className="p-7 pt-4 space-y-8 relative">
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    Bitácora
                  </p>
                  <div
                    className="absolute left-[39px] top-16 bottom-8 w-px"
                    style={{ background: 'linear-gradient(to bottom, #FC8F54, rgba(104,103,210,0.3), transparent)' }}
                  />

                  {TIMELINE.map((item, i) => (
                    <motion.div
                      key={item.title}
                      className="relative pl-10"
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.12 }}
                    >
                      <div
                        className="absolute left-0 top-1 w-5 h-5 rounded-full z-10 flex items-center justify-center"
                        style={{
                          background: '#0d0b14',
                          border: item.active ? '2px solid #FC8F54' : '2px solid rgba(104,103,210,0.4)',
                          boxShadow: item.active ? '0 0 10px rgba(252,143,84,0.4)' : 'none',
                        }}
                      >
                        {item.active && <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#FC8F54' }} />}
                      </div>

                      <p
                        className="font-mono text-[10px] uppercase tracking-widest mb-1"
                        style={{ color: item.active ? '#FC8F54' : 'rgba(104,103,210,0.6)' }}
                      >
                        {item.date}
                      </p>
                      <h4
                        className="font-bold text-base leading-tight mb-0.5"
                        style={{ color: item.active ? '#fff' : 'rgba(255,255,255,0.7)' }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-xs italic mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {item.sub}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] px-2 py-0.5 rounded font-mono"
                            style={{
                              background: item.active ? 'rgba(252,143,84,0.08)' : 'rgba(104,103,210,0.07)',
                              border: item.active ? '1px solid rgba(252,143,84,0.2)' : '1px solid rgba(104,103,210,0.2)',
                              color: item.active ? 'rgba(252,143,84,0.7)' : 'rgba(104,103,210,0.6)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Terminal */}
                <div
                  className="mx-7 mb-7 p-4 rounded-xl font-mono text-[11px]"
                  style={{ background: 'rgba(13,11,20,0.8)', border: '1px solid rgba(104,103,210,0.15)' }}
                >
                  <p style={{ color: 'rgba(255,255,255,0.3)' }}>
                    <span style={{ color: 'rgba(252,143,84,0.5)' }}>$ </span>
                    locate motivation
                  </p>
                  <p className="mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    "Mi meta es automatizar el presente
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.55)' }}>
                    &nbsp;para diseñar el futuro."
                    <motion.span
                      className="inline-block w-1.5 h-3 ml-1 align-middle"
                      style={{ background: '#FC8F54' }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div >

        {/* ── MARQUEE DE TECNOLOGÍAS ─────────────────────────────────── */}
        < motion.div
          {...inView}
          className="relative z-10 mt-24 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
          }
          }
        >
          <div className="about-marquee-track flex w-max gap-10">
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="font-mono text-sm uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ color: 'rgba(255,255,255,0.18)' }}
              >
                {t} <span style={{ color: 'rgba(252,143,84,0.4)' }}>/</span>
              </span>
            ))}
          </div>
        </motion.div >
      </div >
    </>
  )
}

export default About