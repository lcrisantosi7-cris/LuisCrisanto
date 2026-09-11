import React from 'react'
import { motion } from 'framer-motion'
import {
  Server, Code2, Database, Cloud, Layers, Zap,
  CheckCircle2, ArrowRight, MessageSquare, FileText,
  Terminal, Rocket, ShieldCheck, Clock, Users
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

// ── Variantes ────────────────────────────────────────────────────────────────
const up = {
  hidden:  { y: 24, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
}
const container = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

// ── Servicios ancla (grandes) ─────────────────────────────────────────────────
const ANCHOR_SERVICES = [
  {
    icon:  Server,
    label: 'Servicio principal',
    title: 'Arquitectura Backend',
    description:
      'Núcleos lógicos robustos con foco en seguridad, escalabilidad y código limpio. APIs diseñadas para crecer sin deuda técnica.',
    features: [
      'APIs RESTful & GraphQL',
      'Autenticación OAuth2 / JWT',
      'Integración de pasarelas de pago',
      'Microservicios desacoplados',
    ],
    technologies: ['Node.js', 'PHP', 'FastAPI', 'Swagger'],
    accent: '#FC8F54',
  },
  {
    icon:  Code2,
    label: 'Servicio principal',
    title: 'Desarrollo Full Stack',
    description:
      'Soluciones de extremo a extremo: interfaces reactivas conectadas a lógicas de negocio complejas y datos en tiempo real.',
    features: [
      'SPA con React / Vue',
      'Dashboards administrativos',
      'Integración WebSockets',
      'SSR y rendimiento web',
    ],
    technologies: ['React', 'Tailwind', 'TypeScript', 'Axios'],
    accent: '#6867D2',
  },
]

// ── Servicios secundarios (grid compacto) ────────────────────────────────────
const SECONDARY_SERVICES = [
  {
    icon:  Database,
    title: 'Ingeniería de Datos',
    description: 'Modelado relacional, optimización SQL y estrategias de backup para datos críticos.',
    technologies: ['MySQL', 'PostgreSQL', 'SQL Server'],
    accent: '#5546AD',
  },
  {
    icon:  Cloud,
    title: 'Cloud & DevOps',
    description: 'Contenedorización, CI/CD pipelines y despliegue en infraestructura moderna.',
    technologies: ['AWS', 'Docker', 'GitHub Actions'],
    accent: '#F5525B',
  },
  {
    icon:  Layers,
    title: 'Consultoría de Software',
    description: 'Auditoría de código, refactorización y selección de stack para proyectos existentes.',
    technologies: ['Clean Arch', 'SOLID', 'UML'],
    accent: '#6867D2',
  },
  {
    icon:  Zap,
    title: 'Optimización',
    description: 'Reducción de tiempos de respuesta, caching strategies y database indexing.',
    technologies: ['Profiling', 'Caching', 'Indexing'],
    accent: '#FC8F54',
  },
]

// ── Proceso de trabajo ────────────────────────────────────────────────────────
const PROCESS = [
  { step: '01', title: 'Discovery',    desc: 'Reunión para entender requerimientos, alcance y objetivos.',          icon: MessageSquare },
  { step: '02', title: 'Blueprint',    desc: 'Arquitectura, stack y planificación de sprints.',                      icon: FileText      },
  { step: '03', title: 'Development',  desc: 'Codificación iterativa con entregables y code reviews constantes.',    icon: Terminal      },
  { step: '04', title: 'Deployment',   desc: 'Pruebas finales, configuración de producción y despliegue en vivo.',   icon: Rocket        },
]

// ── Valores ───────────────────────────────────────────────────────────────────
const VALUES = [
  { icon: ShieldCheck, title: 'Clean Code',     desc: 'Código mantenible y escalable.'    },
  { icon: Users,       title: 'Comunicación',   desc: 'Reportes de avance semanales.'     },
  { icon: Clock,       title: 'Puntualidad',    desc: 'Respeto estricto a los deadlines.' },
  { icon: Zap,         title: 'Soporte',        desc: 'Garantía post-implementación.'     },
]

// ════════════════════════════════════════════════════════════════════════════
export default function Services() {
  return (
    <>
      <SEO
        title="Servicios | Luis Crisanto"
        description="Desarrollo Backend, Full Stack, Cloud & DevOps, Consultoría de Software y Optimización."
        canonical="https://luis-crisanto.vercel.app/services"
        keywords="Servicios, Backend, Full Stack, Cloud, DevOps, Consultoría, APIs REST"
      />

      <div
        className="min-h-screen relative overflow-hidden pt-28 pb-24 px-6"
        style={{ background: '#0d0b14' }}
      >

        {/* ── Fondo: hexágonos SVG sutiles ── */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-2l26-15V18L28 2 2 18v31l26 15z' fill='rgba(104%2C103%2C210%2C0.07)'/%3E%3C/svg%3E")`,
            backgroundSize: '56px 100px',
          }}
        />
        <div
          className="absolute top-[5%] left-[5%] w-[500px] h-[500px] rounded-full pointer-events-none blur-[140px]"
          style={{ background: 'rgba(104,103,210,0.07)' }}
        />
        <div
          className="absolute bottom-[5%] right-[5%] w-[450px] h-[450px] rounded-full pointer-events-none blur-[130px]"
          style={{ background: 'rgba(252,143,84,0.06)' }}
        />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ══════════════════════════════════════════════════════════════
              ENCABEZADO
          ══════════════════════════════════════════════════════════════ */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.div variants={up} className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: '#FC8F54' }} />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.35em]"
                style={{ color: 'rgba(252,143,84,0.7)' }}
              >
                Catálogo de Servicios
              </span>
            </motion.div>

            <motion.h1
              variants={up}
              className="font-black tracking-tighter leading-[0.88] mb-5"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(3rem, 9vw, 7rem)',
              }}
            >
              <span className="block text-white">SOLUCIONES</span>
              <span
                className="block text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #FC8F54 0%, #F5525B 45%, #6867D2 100%)',
                }}
              >
                DE SOFTWARE
              </span>
            </motion.h1>

            <motion.p
              variants={up}
              className="text-lg max-w-xl"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Transformo requerimientos complejos en software funcional, seguro y escalable —
              ya sea para tu startup, empresa o proyecto académico.
            </motion.p>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════
              SERVICIOS ANCLA — 2 cards horizontales grandes
          ══════════════════════════════════════════════════════════════ */}
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {ANCHOR_SERVICES.map((service, i) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55 }}
                  className="relative rounded-2xl overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, ${service.accent}0a, rgba(13,11,20,0.95))`,
                    border:     `1px solid ${service.accent}20`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${service.accent}45`
                    e.currentTarget.style.boxShadow   = `0 8px 40px ${service.accent}12`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${service.accent}20`
                    e.currentTarget.style.boxShadow   = 'none'
                  }}
                >
                  {/* Número de fondo decorativo */}
                  <span
                    className="absolute top-4 right-6 font-black font-mono select-none pointer-events-none leading-none"
                    style={{ fontSize: '6rem', color: `${service.accent}07` }}
                  >
                    0{i + 1}
                  </span>

                  <div className="relative p-8">
                    {/* Label + ícono */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className="text-[9px] font-bold uppercase tracking-[0.3em] font-mono"
                        style={{ color: `${service.accent}70` }}
                      >
                        {service.label}
                      </span>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `${service.accent}12`,
                          border:     `1px solid ${service.accent}30`,
                        }}
                      >
                        <Icon size={24} style={{ color: service.accent }} />
                      </div>
                    </div>

                    {/* Título */}
                    <h2
                      className="text-2xl font-black mb-3 tracking-tight text-white transition-colors duration-200"
                      style={{}}
                    >
                      {service.title}
                    </h2>

                    {/* Descripción */}
                    <p
                      className="text-sm leading-relaxed mb-7"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                    >
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-7">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <CheckCircle2
                            size={14}
                            className="shrink-0"
                            style={{ color: service.accent }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: 'rgba(255,255,255,0.65)' }}
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div
                      className="flex flex-wrap gap-2 pt-5"
                      style={{ borderTop: `1px solid ${service.accent}15` }}
                    >
                      {service.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-lg"
                          style={{
                            background:  `${service.accent}0c`,
                            border:      `1px solid ${service.accent}22`,
                            color:       `${service.accent}90`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* ══════════════════════════════════════════════════════════════
              SERVICIOS SECUNDARIOS — grid 2×2 compacto
          ══════════════════════════════════════════════════════════════ */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
            {SECONDARY_SERVICES.map((service, i) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="relative rounded-2xl p-6 group transition-all duration-250"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border:     '1px solid rgba(255,255,255,0.07)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${service.accent}35`
                    e.currentTarget.style.background  = `${service.accent}06`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.background  = 'rgba(255,255,255,0.025)'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${service.accent}10`,
                      border:     `1px solid ${service.accent}25`,
                    }}
                  >
                    <Icon size={18} style={{ color: service.accent }} />
                  </div>

                  <h3
                    className="font-bold text-sm text-white mb-2 leading-tight"
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed mb-4"
                    style={{ color: 'rgba(255,255,255,0.38)' }}
                  >
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {service.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                        style={{
                          background: `${service.accent}0a`,
                          border:     `1px solid ${service.accent}18`,
                          color:      `${service.accent}80`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* ══════════════════════════════════════════════════════════════
              PROCESO — línea horizontal minimalista
          ══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="mb-12">
              <p
                className="font-mono text-[10px] uppercase tracking-[0.35em] mb-3"
                style={{ color: 'rgba(252,143,84,0.7)' }}
              >
                Metodología
              </p>
              <h2 className="text-3xl font-black text-white tracking-tight">
                Flujo de Trabajo
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-4 relative">
              {/* Línea conectora desktop */}
              <div
                className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(252,143,84,0.3), rgba(104,103,210,0.3), transparent)',
                }}
              />

              {PROCESS.map((item, i) => {
                const Icon = item.icon
                const accent = i < 2 ? '#FC8F54' : '#6867D2'
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative text-center"
                  >
                    {/* Nodo */}
                    <div className="flex justify-center mb-5">
                      <div className="relative">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{
                            background: `${accent}10`,
                            border:     `1px solid ${accent}30`,
                          }}
                        >
                          <Icon size={22} style={{ color: accent }} />
                        </div>
                        {/* Número */}
                        <span
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black font-mono"
                          style={{
                            background: accent,
                            color:      '#0d0b14',
                          }}
                        >
                          {item.step}
                        </span>
                      </div>
                    </div>

                    <h3
                      className="font-bold text-sm text-white mb-2"
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════
              VALORES + CTA
          ══════════════════════════════════════════════════════════════ */}
          <div className="grid lg:grid-cols-12 gap-5 items-stretch">

            {/* Valores — grid 2×2 */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {VALUES.map((v, i) => {
                const Icon = v.icon
                const accent = i % 2 === 0 ? '#FC8F54' : '#6867D2'
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 group"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border:     '1px solid rgba(255,255,255,0.07)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${accent}30`
                      e.currentTarget.style.background  = `${accent}05`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.background  = 'rgba(255,255,255,0.025)'
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{
                        background: `${accent}10`,
                        border:     `1px solid ${accent}25`,
                      }}
                    >
                      <Icon size={18} style={{ color: accent }} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{v.title}</h4>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {v.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA banner con gradiente Painted Clouds */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative rounded-2xl overflow-hidden flex flex-col justify-between p-8"
              style={{
                background: 'linear-gradient(135deg, #FC8F54 0%, #F5525B 50%, #5546AD 100%)',
              }}
            >
              {/* Patrón decorativo de fondo */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              {/* Blob de luz */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[50px] pointer-events-none"
                style={{ background: 'rgba(255,255,255,0.15)', transform: 'translate(30%, -30%)' }}
              />

              <div className="relative">
                <p
                  className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] mb-4"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  ¿Listo para empezar?
                </p>
                <h2 className="text-3xl font-black text-white leading-tight mb-4 tracking-tight">
                  Convierte esa idea en un sistema real.
                </h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Consulta técnica gratuita de 15 minutos para analizar tu proyecto y definir el camino.
                </p>
              </div>

              <Link to="/contact" className="relative">
                <button
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-250 hover:scale-[1.03] active:scale-95"
                  style={{
                    background: 'rgba(13,11,20,0.85)',
                    color:      '#fff',
                    border:     '1px solid rgba(255,255,255,0.2)',
                  }}
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