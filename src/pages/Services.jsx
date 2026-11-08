import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Server, Cloud, Code2, Database, Camera, Layers,
  CheckCircle2, ArrowRight, MessageSquare, FileText,
  Terminal, Rocket, ShieldCheck, Clock, Users, Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

// ── Animaciones ──────────────────────────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const up = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const inView = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

// ── Servicios principales ────────────────────────────────────────────────────
// accent en formato 'r,g,b'
const ANCHOR_SERVICES = [
  {
    icon: Server,
    label: 'Servicio principal',
    title: 'Backend & APIs',
    description:
      'La lógica de negocio que sostiene tu producto: APIs claras, seguras y pensadas para crecer sin volverse un enredo.',
    features: [
      'APIs REST bien estructuradas',
      'Autenticación con JWT y roles',
      'Tiempo real con WebSockets',
      'Integración con servicios externos',
    ],
    technologies: ['Node.js', 'PHP', 'FastAPI', 'MySQL'],
    accent: '252,143,84',
  },
  {
    icon: Cloud,
    label: 'Foco actual',
    focus: true,
    title: 'Arquitectura en la nube',
    description:
      'Sistemas diseñados para desplegarse y escalar en la nube, con contenedores y servicios administrados.',
    features: [
      'Despliegue en AWS',
      'Contenedores con Docker',
      'Correo y notificaciones con AWS SES',
      'Arquitectura pensada para escalar',
    ],
    technologies: ['AWS', 'Docker', 'Vercel', 'Render'],
    accent: '104,103,210',
  },
]

// ── Servicios secundarios ────────────────────────────────────────────────────
const SECONDARY_SERVICES = [
  {
    icon: Code2,
    title: 'Desarrollo Full Stack',
    description: 'Interfaces en React conectadas a tu backend: paneles administrativos, dashboards y aplicaciones web completas.',
    technologies: ['React', 'Tailwind', 'WebSocket'],
    accent: '252,143,84',
  },
  {
    icon: Database,
    title: 'Datos',
    description: 'Modelado relacional, consultas optimizadas y reportes para que la información sea confiable.',
    technologies: ['MySQL', 'SQL Server'],
    accent: '85,70,173',
  },
  {
    icon: Camera,
    title: 'Analítica y visión por computador',
    description: 'Detección de personas con cámaras y métricas de afluencia en tiempo real, como en RetailVision.',
    technologies: ['Python', 'YOLOv8', 'OpenCV', 'FastAPI'],
    accent: '245,82,91',
  },
  {
    icon: Layers,
    title: 'Revisión y mejora de código',
    description: 'Auditoría, refactorización y ajustes de rendimiento sobre proyectos que ya existen.',
    technologies: ['Refactorización', 'SQL', 'Git'],
    accent: '104,103,210',
  },
]

// ── Proceso ──────────────────────────────────────────────────────────────────
const PROCESS = [
  { step: '01', title: 'Entender', desc: 'Conversamos para aclarar qué necesitas, el alcance y los objetivos.', icon: MessageSquare },
  { step: '02', title: 'Diseñar', desc: 'Defino la arquitectura, el stack y el plan de entregas.', icon: FileText },
  { step: '03', title: 'Construir', desc: 'Desarrollo por etapas, con avances que puedes revisar.', icon: Terminal },
  { step: '04', title: 'Desplegar', desc: 'Pruebas finales, puesta en producción y ajustes iniciales.', icon: Rocket },
]

// ── Valores ──────────────────────────────────────────────────────────────────
const VALUES = [
  { icon: ShieldCheck, title: 'Código mantenible', desc: 'Claro, ordenado y fácil de extender.' },
  { icon: Users, title: 'Comunicación', desc: 'Avances compartidos de forma regular.' },
  { icon: Clock, title: 'Cumplimiento', desc: 'Plazos acordados desde el inicio.' },
  { icon: Zap, title: 'Soporte', desc: 'Ajustes después de la entrega.' },
]

// ── Paso del proceso (se enciende con el scroll) ─────────────────────────────
function ProcessStep({ item, i, total, progress }) {
  const start = i / total
  const lit = useTransform(progress, [start - 0.05, start + 0.15], [0.3, 1])
  const Icon = item.icon
  const accent = i < 2 ? '252,143,84' : '104,103,210'

  return (
    <motion.div
      style={{ opacity: lit }}
      className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-0 md:text-center"
    >
      <div className="relative shrink-0 md:mb-5">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: '#0d0b14', border: `1px solid rgba(${accent},0.4)`, boxShadow: `0 0 24px rgba(${accent},0.15)` }}
        >
          <Icon size={22} style={{ color: `rgb(${accent})` }} />
        </div>
        <span
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black font-mono"
          style={{ background: `rgb(${accent})`, color: '#0d0b14' }}
        >
          {item.step}
        </span>
      </div>
      <div>
        <h3 className="font-bold text-base text-white mb-1.5">{item.title}</h3>
        <p className="text-xs leading-relaxed max-w-[220px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })

  return (
    <div ref={ref} className="relative">
      <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
      <motion.div
        className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px origin-left"
        style={{ scaleX: scrollYProgress, background: 'linear-gradient(90deg, #FC8F54, #F5525B, #6867D2)' }}
      />
      <div className="grid md:grid-cols-4 gap-10 md:gap-4">
        {PROCESS.map((item, i) => (
          <ProcessStep key={item.step} item={item} i={i} total={PROCESS.length} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
export default function Services() {
  const { scrollY } = useScroll()
  const bloomA = useTransform(scrollY, [0, 1200], [0, -120])
  const bloomB = useTransform(scrollY, [0, 1200], [0, 100])

  return (
    <>
      <SEO
        title="Servicios | Luis Crisanto"
        description="Backend y APIs, arquitectura en la nube, desarrollo full stack, datos y analítica con visión por computador."
        canonical="https://luis-crisanto.vercel.app/services"
        keywords="Servicios, Backend, APIs REST, Arquitectura Cloud, AWS, Docker, Full Stack, Visión por computador"
      />

      <div className="min-h-screen relative overflow-hidden pt-28 pb-24 px-6" style={{ background: '#0d0b14' }}>
        {/* Fondo: hexágonos sutiles */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-2l26-15V18L28 2 2 18v31l26 15z' fill='rgba(104%2C103%2C210%2C0.07)'/%3E%3C/svg%3E")`,
            backgroundSize: '56px 100px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          }}
        />
        <motion.div
          className="absolute top-[5%] left-[5%] w-[500px] h-[500px] rounded-full pointer-events-none blur-[140px]"
          style={{ background: 'rgba(104,103,210,0.08)', y: bloomA }}
        />
        <motion.div
          className="absolute bottom-[5%] right-[5%] w-[450px] h-[450px] rounded-full pointer-events-none blur-[130px]"
          style={{ background: 'rgba(252,143,84,0.07)', y: bloomB }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* ── ENCABEZADO ── */}
          <motion.header variants={container} initial="hidden" animate="visible" className="mb-20">
            <motion.div variants={up} className="flex items-center gap-3 mb-5">
              <motion.div
                className="h-px w-10 origin-left"
                style={{ background: '#FC8F54' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: 'rgba(252,143,84,0.7)' }}>
                Servicios
              </span>
            </motion.div>

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
                  SERVICIOS
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
                  & SOLUCIONES
                </motion.span>
              </span>
            </h1>

            <motion.p variants={up} className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Diseño y construyo backends, integraciones y despliegues en la nube, para startups,
              negocios o proyectos académicos.
            </motion.p>
          </motion.header>

          {/* ── SERVICIOS PRINCIPALES ── */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {ANCHOR_SERVICES.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.article
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  whileHover={{ y: -4, borderColor: `rgba(${s.accent},0.45)`, boxShadow: `0 12px 40px rgba(${s.accent},0.12)` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative rounded-2xl overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, rgba(${s.accent},0.06), rgba(13,11,20,0.95))`,
                    border: `1px solid rgba(${s.accent},0.18)`,
                  }}
                >
                  <span
                    className="absolute top-4 right-6 font-black font-mono select-none pointer-events-none leading-none"
                    style={{ fontSize: '6rem', color: `rgba(${s.accent},0.06)` }}
                  >
                    0{i + 1}
                  </span>

                  <div className="relative p-8">
                    <div className="flex items-center justify-between mb-6">
                      {s.focus ? (
                        <span
                          className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.25em] font-mono px-2.5 py-1 rounded-full"
                          style={{ color: `rgb(${s.accent})`, background: `rgba(${s.accent},0.1)`, border: `1px solid rgba(${s.accent},0.3)` }}
                        >
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: `rgb(${s.accent})` }} />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: `rgb(${s.accent})` }} />
                          </span>
                          {s.label}
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] font-mono" style={{ color: `rgba(${s.accent},0.7)` }}>
                          {s.label}
                        </span>
                      )}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `rgba(${s.accent},0.1)`, border: `1px solid rgba(${s.accent},0.3)` }}
                      >
                        <Icon size={24} style={{ color: `rgb(${s.accent})` }} />
                      </div>
                    </div>

                    <h2 className="text-2xl font-black mb-3 tracking-tight text-white">{s.title}</h2>
                    <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {s.description}
                    </p>

                    <ul className="space-y-2.5 mb-7">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <CheckCircle2 size={14} className="shrink-0" style={{ color: `rgb(${s.accent})` }} />
                          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-5" style={{ borderTop: `1px solid rgba(${s.accent},0.14)` }}>
                      {s.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-lg"
                          style={{ background: `rgba(${s.accent},0.08)`, border: `1px solid rgba(${s.accent},0.22)`, color: `rgba(${s.accent},0.95)` }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          {/* ── SERVICIOS SECUNDARIOS ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-28">
            {SECONDARY_SERVICES.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.article
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  whileHover={{ y: -3, borderColor: `rgba(${s.accent},0.4)` }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="group rounded-2xl p-6"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `rgba(${s.accent},0.1)`, border: `1px solid rgba(${s.accent},0.25)` }}
                  >
                    <Icon size={18} style={{ color: `rgb(${s.accent})` }} />
                  </div>
                  <h3 className="font-bold text-sm text-white mb-2 leading-tight">{s.title}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.42)' }}>
                    {s.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                        style={{ background: `rgba(${s.accent},0.07)`, border: `1px solid rgba(${s.accent},0.18)`, color: `rgba(${s.accent},0.9)` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.article>
              )
            })}
          </div>

          {/* ── PROCESO ── */}
          <motion.section {...inView} className="mb-28">
            <div className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] mb-3" style={{ color: 'rgba(252,143,84,0.7)' }}>
                Cómo trabajo
              </p>
              <h2 className="text-3xl font-black text-white tracking-tight">Del requerimiento al despliegue</h2>
            </div>
            <Process />
          </motion.section>

          {/* ── VALORES + CTA ── */}
          <div className="grid lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {VALUES.map((v, i) => {
                const Icon = v.icon
                const accent = i % 2 === 0 ? '252,143,84' : '104,103,210'
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2, borderColor: `rgba(${accent},0.35)` }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="group flex items-center gap-4 p-5 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ background: `rgba(${accent},0.1)`, border: `1px solid rgba(${accent},0.25)` }}
                    >
                      <Icon size={18} style={{ color: `rgb(${accent})` }} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{v.title}</h4>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{v.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative rounded-2xl overflow-hidden flex flex-col justify-between p-8"
              style={{ background: 'linear-gradient(135deg, #FC8F54 0%, #F5525B 50%, #5546AD 100%)' }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              />
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[50px] pointer-events-none"
                style={{ background: 'rgba(255,255,255,0.15)', transform: 'translate(30%, -30%)' }}
              />

              <div className="relative">
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  ¿Tienes un proyecto?
                </p>
                <h2 className="text-3xl font-black text-white leading-tight mb-4 tracking-tight">
                  Cuéntame tu proyecto.
                </h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Una conversación inicial gratuita de 15 minutos para entender qué necesitas y ver cómo puedo ayudarte.
                </p>
              </div>

              <Link to="/contact" className="relative">
                <button
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95"
                  style={{ background: 'rgba(13,11,20,0.85)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(13,11,20,0.95)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(13,11,20,0.85)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  }}
                >
                  Iniciar conversación
                  <ArrowRight size={15} />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}