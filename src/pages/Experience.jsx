import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Cloud, Server, Database, Layers, Cpu, ShieldCheck, Network, Camera, Monitor, School, PawPrint, Leaf } from 'lucide-react'
import SEO from '../components/SEO'
import Spotlight from '../components/Spotlight'

const ease = [0.22, 1, 0.36, 1]
const reveal = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay: d, ease },
})

const MILESTONES = [
  { date: '2023', icon: School, title: 'Sistema de Gestión Escolar', sub: 'Proyecto académico · MVC + MySQL', tags: ['Backend', 'MVC', 'Roles'], accent: '104 103 210' },
  { date: '2024', icon: Cpu, title: 'RetailVision Analytics', sub: 'Proyecto de tesis · YOLOv8 + FastAPI + React', tags: ['Visión por computadora', 'Full Stack', 'Tiempo real'], accent: '252 143 84' },
  { date: '2026', icon: Leaf, title: 'PlantMilk', sub: 'Ecommerce · React + Shopify + GSAP', tags: ['Ecommerce', 'Animación', 'Shopify'], accent: '143 142 232' }, // confirma el año
  { date: '2026', icon: PawPrint, title: 'AlfaPet', sub: 'Sistema veterinario · MVC + Supabase', tags: ['POO', 'ISO 25010', 'Supabase'], accent: '255 179 136' }, // confirma el año
  { date: 'Ahora', icon: Cloud, title: 'Arquitectura en la nube', sub: 'Aprendizaje continuo · AWS + Docker', tags: ['AWS', 'Docker', 'Arquitectura'], accent: '245 82 91', current: true },
]

const CREDENTIALS = [
  { icon: Network, label: 'Cisco' },
  { icon: Network, label: 'Redes' },
  { icon: Camera, label: 'Instalación de cámaras · nivel técnico' },
  { icon: Monitor, label: 'Sistemas operativos' },
]

const tierOf = (l) => (l >= 80 ? 3 : l >= 60 ? 2 : 1)
const TIER = { 3: 'Dominio', 2: 'Sólido', 1: 'Explorando' }

const STACK = [
  { title: 'Cloud & DevOps', icon: Cloud, accent: '252 143 84', focus: true, items: [['AWS (EC2/S3)', 38], ['Docker', 50], ['Vercel / Render', 70], ['Git / GitHub', 85]] },
  { title: 'Backend', icon: Server, accent: '104 103 210', items: [['Node.js', 75], ['PHP / Laravel', 82], ['FastAPI', 68], ['Python', 70]] },
  { title: 'Datos', icon: Database, accent: '85 70 173', items: [['MySQL', 88], ['SQL Server', 80], ['PostgreSQL', 55], ['MongoDB', 45]] },
  { title: 'Frontend', icon: Layers, accent: '245 82 91', items: [['React', 75], ['Vue.js', 55], ['Tailwind', 80], ['JavaScript', 78]] },
]

const Pips = ({ level }) => {
  const t = tierOf(level)
  return (
    <span className="flex items-center gap-3" title={TIER[t]}>
      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-400">{TIER[t]}</span>
      <span className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`h-1.5 w-5 rounded-full ${i <= t ? 'bg-channel' : 'bg-white/10'}`} />
        ))}
      </span>
    </span>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <>
      <SEO
        title="Experiencia | Luis Crisanto"
        description="Recorrido, stack y credenciales de Luis Crisanto: backend, datos, frontend y cloud."
        canonical="https://luis-crisanto.vercel.app/experiencia"
      />

      <section className="mx-auto max-w-7xl px-6 pt-12">
        <p className="font-mono text-[11px] uppercase tracking-widest text-channel">CAM 03 · Experiencia</p>
        <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">
          Mi <span className="text-channel">recorrido.</span>
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          {CREDENTIALS.map(({ icon: Icon, label }, i) => (
            <motion.span key={label} {...reveal(i * 0.07)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-ink-200">
              <ShieldCheck size={14} className="text-channel" />
              <Icon size={14} className="text-ink-400" /> {label}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Línea de tiempo */}
      <section ref={ref} className="relative mx-auto mt-20 max-w-5xl px-6">
        <div aria-hidden className="absolute bottom-0 left-[calc(1.5rem+5.5rem)] top-0 hidden w-px bg-white/10 md:block">
          <motion.div style={{ scaleY, transformOrigin: 'top' }} className="h-full w-full bg-channel" />
        </div>
        <ol className="space-y-8">
          {MILESTONES.map((m, i) => (
            <motion.li key={m.title} {...reveal(0.05)} className="grid items-start gap-4 md:grid-cols-[5.5rem_1fr] md:gap-10" style={{ '--ch': m.accent }}>
              <div className="font-display text-3xl font-bold text-channel md:pt-5 md:text-right">{m.date}</div>
              <Spotlight className="p-6 md:ml-4">
                <div className="flex items-start gap-4">
                  <m.icon className="mt-1 shrink-0 text-channel" size={22} />
                  <div>
                    <h2 className="font-display text-2xl font-bold">
                      {m.title}
                      {m.current && <span className="ml-3 rounded-full bg-channel px-2.5 py-0.5 align-middle font-mono text-[10px] uppercase tracking-widest text-ink-950">En curso</span>}
                    </h2>
                    <p className="mt-1 text-ink-200">{m.sub}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {m.tags.map((t) => (
                        <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-ink-200">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Spotlight>
              <span className="sr-only">{i}</span>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Stack */}
      <section className="mx-auto mt-28 max-w-7xl px-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-channel">Stack</p>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Con qué construyo.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {STACK.map((g, i) => (
            <motion.div key={g.title} {...reveal(i * 0.08)} style={{ '--ch': g.accent }}>
              <Spotlight className="h-full p-7">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-3 font-display text-xl font-bold">
                    <g.icon size={20} className="text-channel" /> {g.title}
                  </h3>
                  {g.focus && <span className="font-mono text-[10px] uppercase tracking-widest text-channel">En foco</span>}
                </div>
                <ul className="mt-5 divide-y divide-white/5">
                  {g.items.map(([name, level]) => (
                    <li key={name} className="flex items-center justify-between py-3">
                      <span className="text-ink-200">{name}</span>
                      <Pips level={level} />
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-28 mt-20 max-w-7xl px-6">
        <Link to="/proyectos" data-cursor="VER" className="group inline-flex items-center gap-3 font-display text-2xl font-bold transition-colors hover:text-channel md:text-3xl">
          Mira lo que construí con todo esto
          <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </Link>
      </section>
    </>
  )
}