import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Briefcase, BookOpen, Sparkles, Cloud, Server, Database, Layers, Cpu,
} from 'lucide-react'
import {
  motion, animate, useMotionValue, useMotionTemplate,
  useScroll, useTransform, useReducedMotion,
} from 'framer-motion'
import SEO from '../components/SEO'

// ── Variantes ───────────────────────────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const up = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const inView = {
  variants: up,
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-80px' },
}

// ── Datos ───────────────────────────────────────────────────────────────────
const KPIS = [
  { icon: Briefcase, label: 'Proyectos', to: 8, suffix: '+' },
  { icon: BookOpen, label: 'Cursos', to: 37, suffix: '+' },
  { icon: Sparkles, label: 'Aprendizaje constante', text: '∞' },
]

// Agrega aquí más hitos (prácticas, freelance, certificaciones) con el mismo formato.
const MILESTONES = [
  {
    date: '2023',
    icon: Server,
    title: 'School Management System',
    sub: 'Proyecto académico · Node.js + MySQL',
    tags: ['REST API', 'Backend', 'Deployado'],
    accent: '104,103,210',
  },
  {
    date: '2024',
    icon: Cpu,
    title: 'RetailVision Analytics',
    sub: 'Proyecto de tesis · YOLOv8 + FastAPI + React',
    tags: ['Computer Vision', 'Full Stack', 'Tiempo real'],
    accent: '252,143,84',
  },
  {
    date: 'Ahora',
    icon: Cloud,
    title: 'Arquitectura en la nube',
    sub: 'Aprendizaje continuo · AWS + Docker',
    tags: ['AWS', 'Docker', 'Arquitectura'],
    accent: '245,82,91',
    current: true,
  },
]

// level (0-100) → nivel: ≥80 Dominio · 60-79 Sólido · <60 Explorando
const tierOf = (l) => (l >= 80 ? 3 : l >= 60 ? 2 : 1)
const TIER_LABEL = { 3: 'Dominio', 2: 'Sólido', 1: 'Explorando' }

const SKILL_GROUPS = [
  {
    category: 'DevOps & Cloud',
    icon: Cloud,
    accent: '252,143,84',
    focus: true,
    items: [
      { name: 'AWS (EC2/S3)', level: 38 },
      { name: 'Docker', level: 50 },
      { name: 'Vercel / Render', level: 70 },
      { name: 'Git / GitHub', level: 85 },
    ],
  },
  {
    category: 'Backend',
    icon: Server,
    accent: '104,103,210',
    items: [
      { name: 'Node.js', level: 75 },
      { name: 'PHP / Laravel', level: 82 },
      { name: 'FastAPI', level: 68 },
      { name: 'Python', level: 70 },
    ],
  },
  {
    category: 'Datos & DB',
    icon: Database,
    accent: '85,70,173',
    items: [
      { name: 'MySQL', level: 88 },
      { name: 'SQL Server', level: 80 },
      { name: 'PostgreSQL', level: 55 },
      { name: 'MongoDB', level: 45 },
    ],
  },
  {
    category: 'Frontend',
    icon: Layers,
    accent: '245,82,91',
    items: [
      { name: 'React', level: 75 },
      { name: 'Vue.js', level: 55 },
      { name: 'Tailwind', level: 80 },
      { name: 'JavaScript', level: 78 },
    ],
  },
]

// ── Tarjeta con spotlight ───────────────────────────────────────────────────
function SpotlightCard({ children, className = '', accent = '252,143,84', style }) {
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
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', ...style }}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: bg }} />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

// ── Contador animado ────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }) {
  const reduce = useReducedMotion()
  const mv = useMotionValue(reduce ? to : 0)
  const text = useTransform(mv, (v) => `${Math.round(v)}${suffix}`)

  return (
    <motion.span
      viewport={{ once: true }}
      onViewportEnter={() => {
        if (!reduce) animate(mv, to, { duration: 1.4, ease: 'easeOut' })
      }}
    >
      {text}
    </motion.span>
  )
}

// ── Nivel en 3 segmentos ────────────────────────────────────────────────────
function TierBar({ tier, accent }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((n) => (
        <motion.span
          key={n}
          className="h-1 flex-1 rounded-full origin-left"
          style={{ background: n <= tier ? `rgb(${accent})` : 'rgba(255,255,255,0.08)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: n * 0.12 }}
        />
      ))}
    </div>
  )
}

// ── Hito del timeline (se enciende con el scroll) ───────────────────────────
function TimelineItem({ m, i, total, progress }) {
  const t = (i + 0.5) / total
  const lit = useTransform(progress, [t - 0.2, t], [0.35, 1])
  const Icon = m.icon
  const left = i % 2 === 0

  return (
    <div className="relative md:grid md:grid-cols-2 mb-12 last:mb-0">
      {/* Nodo */}
      <div className="absolute left-5 md:left-1/2 top-6 -translate-x-1/2 z-10">
        <motion.div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{
            opacity: lit,
            background: '#0d0b14',
            border: `1px solid rgba(${m.accent},0.6)`,
            boxShadow: `0 0 24px rgba(${m.accent},0.3)`,
          }}
        >
          <Icon size={16} style={{ color: `rgb(${m.accent})` }} />
        </motion.div>
        {m.current && (
          <span
            className="absolute inset-0 rounded-2xl animate-ping opacity-30 pointer-events-none"
            style={{ border: `1px solid rgb(${m.accent})` }}
          />
        )}
      </div>

      {/* Contenido */}
      <motion.div
        style={{ opacity: lit }}
        className={`pl-16 md:pl-0 ${left ? 'md:pr-16 md:text-right' : 'md:col-start-2 md:pl-16'}`}
      >
        <SpotlightCard accent={m.accent} className="p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: `rgb(${m.accent})` }}>
            {m.date}
          </p>
          <h3 className="text-lg font-bold text-white leading-tight mb-1">{m.title}</h3>
          <p className="text-xs italic mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {m.sub}
          </p>
          <div className={`flex flex-wrap gap-1.5 ${left ? 'md:justify-end' : ''}`}>
            {m.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] px-2 py-0.5 rounded font-mono"
                style={{
                  background: `rgba(${m.accent},0.08)`,
                  border: `1px solid rgba(${m.accent},0.22)`,
                  color: `rgba(${m.accent},0.85)`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  )
}

function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })

  return (
    <div ref={ref} className="relative">
      <div
        className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
        style={{ background: 'rgba(255,255,255,0.08)' }}
      >
        <motion.div
          className="w-full h-full origin-top"
          style={{
            scaleY: scrollYProgress,
            background: 'linear-gradient(to bottom, #FC8F54, #F5525B, #6867D2)',
          }}
        />
      </div>
      {MILESTONES.map((m, i) => (
        <TimelineItem key={m.title} m={m} i={i} total={MILESTONES.length} progress={scrollYProgress} />
      ))}
    </div>
  )
}

// ── Título de sección ───────────────────────────────────────────────────────
function SectionLabel({ color = '#FC8F54', children }) {
  return (
    <h2
      className="text-xs font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-3"
      style={{ color: 'rgba(255,255,255,0.35)' }}
    >
      <span className="h-px w-8" style={{ background: color }} />
      {children}
    </h2>
  )
}

// ════════════════════════════════════════════════════════════════════════════
const Experience = () => {
  const { scrollY } = useScroll()
  const bloomA = useTransform(scrollY, [0, 1000], [0, -120])
  const bloomB = useTransform(scrollY, [0, 1000], [0, 100])

  return (
    <>
      <SEO
        title="Experiencia y Aprendizaje | Luis Crisanto"
        description="Proyectos reales y aprendizaje continuo con enfoque en arquitectura cloud: AWS, Docker, Node.js, FastAPI y más."
        canonical="https://luis-crisanto.vercel.app/experience"
        keywords="Experiencia, Aprendizaje continuo, Arquitectura Cloud, AWS, Docker, Node.js, FastAPI, Proyectos"
      />

      <div className="min-h-screen relative overflow-hidden pt-28 pb-24" style={{ background: '#0d0b14' }}>
        {/* Patrón diagonal */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -55deg,
              rgba(104,103,210,0.04) 0px,
              rgba(104,103,210,0.04) 1px,
              transparent 1px,
              transparent 44px
            )`,
          }}
        />
        {/* Blooms con parallax */}
        <motion.div
          className="absolute top-[-5%] right-[-5%] w-[550px] h-[550px] rounded-full pointer-events-none blur-[150px]"
          style={{ background: 'rgba(252,143,84,0.08)', y: bloomA }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none blur-[140px]"
          style={{ background: 'rgba(85,70,173,0.08)', y: bloomB }}
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto px-6"
        >
          {/* ── ENCABEZADO ─────────────────────────────────────────────── */}
          <motion.header variants={up} className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                className="h-px w-10 origin-left"
                style={{ background: '#FC8F54' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: 'rgba(252,143,84,0.7)' }}>
                Experiencia
              </span>
            </div>

            <h1
              className="font-black tracking-tighter leading-[0.9] mb-5"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2.4rem, 8vw, 6rem)' }}
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block text-white"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  EXPERIENCIA
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(90deg, #FC8F54 0%, #F5525B 45%, #6867D2 100%)' }}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
                >
                  & APRENDIZAJE
                </motion.span>
              </span>
            </h1>

            <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Proyectos reales y aprendizaje constante, con la mira puesta en la{' '}
              <span className="text-white font-medium">arquitectura en la nube</span>.
            </p>
          </motion.header>

          {/* ── KPIs ───────────────────────────────────────────────────── */}
          <motion.div variants={up} className="grid sm:grid-cols-3 gap-4 mb-24">
            {KPIS.map((k) => (
              <SpotlightCard key={k.label} className="p-6" accent="104,103,210">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl" style={{ background: 'rgba(252,143,84,0.08)', border: '1px solid rgba(252,143,84,0.2)' }}>
                    <k.icon size={16} style={{ color: '#FC8F54' }} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-white font-mono leading-none">
                      {k.text ? k.text : <Counter to={k.to} suffix={k.suffix} />}
                    </p>
                    <p className="text-[9px] uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {k.label}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </motion.div>

          {/* ── TIMELINE ───────────────────────────────────────────────── */}
          <motion.section {...inView} className="mb-28">
            <SectionLabel color="#6867D2">Ruta hacia la nube</SectionLabel>
            <Timeline />
          </motion.section>

          {/* ── SKILLS ─────────────────────────────────────────────────── */}
          <motion.section {...inView} className="mb-24">
            <SectionLabel>Nivel técnico actual</SectionLabel>

            <div className="grid sm:grid-cols-2 gap-5">
              {SKILL_GROUPS.map((g) => (
                <div key={g.category} className={g.focus ? 'sm:col-span-2' : ''}>
                  <SpotlightCard
                    accent={g.accent}
                    className="h-full p-6"
                    style={g.focus ? { border: `1px solid rgba(${g.accent},0.3)` } : undefined}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{ background: `rgba(${g.accent},0.12)`, border: `1px solid rgba(${g.accent},0.3)` }}
                        >
                          <g.icon size={16} style={{ color: `rgb(${g.accent})` }} />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">{g.category}</p>
                          <p className="text-[9px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
                            {g.items.length} tecnologías
                          </p>
                        </div>
                      </div>
                      {g.focus && (
                        <span
                          className="text-[9px] px-2 py-0.5 rounded font-mono"
                          style={{ color: '#FC8F54', background: 'rgba(252,143,84,0.1)', border: '1px solid rgba(252,143,84,0.3)' }}
                        >
                          En foco
                        </span>
                      )}
                    </div>

                    <div className={g.focus ? 'grid sm:grid-cols-2 lg:grid-cols-4 gap-5' : 'space-y-5'}>
                      {g.items.map((s) => {
                        const tier = tierOf(s.level)
                        return (
                          <div key={s.name}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
                                {s.name}
                              </span>
                              <span className="font-mono text-[10px]" style={{ color: `rgba(${g.accent},0.9)` }}>
                                {TIER_LABEL[tier]}
                              </span>
                            </div>
                            <TierBar tier={tier} accent={g.accent} />
                          </div>
                        )
                      })}
                    </div>
                  </SpotlightCard>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── CTA FINAL ──────────────────────────────────────────────── */}
          <motion.div
            {...inView}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl"
            style={{ background: 'rgba(252,143,84,0.04)', border: '1px solid rgba(252,143,84,0.15)' }}
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'rgba(252,143,84,0.6)' }}>
                ¿Quieres ver el resultado?
              </p>
              <p className="text-xl font-bold text-white">Revisa mis proyectos deployados</p>
            </div>
            <Link to="/projects">
              <button
                className="group flex items-center gap-2 px-7 py-3.5 font-bold rounded-xl transition-all duration-300 hover:scale-[1.04] active:scale-95 whitespace-nowrap"
                style={{ background: 'linear-gradient(90deg, #FC8F54, #F5525B)', color: '#fff' }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 24px rgba(252,143,84,0.35)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
              >
                Ver Proyectos
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default Experience