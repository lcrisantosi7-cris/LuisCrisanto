import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Code, Server, Terminal, Cpu, Download, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

// ── Variantes de animación ──────────────────────────────────────────────────
const container = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const up = {
  hidden:  { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

// ── Datos ───────────────────────────────────────────────────────────────────
const skills = [
  { name: 'Node.js / Express',    level: 75, status: 'Mastering' },
  { name: 'MySQL & SQL Server',   level: 90, status: 'Expert'    },
  { name: 'React & Vue.js',       level: 70, status: 'Sólido'    },
  { name: 'PHP & Laravel',        level: 85, status: 'Expert'    },
  { name: 'FastAPI / Python',     level: 70, status: 'Sólido'    },
  { name: 'AWS Cloud',            level: 40, status: 'Learning'  },
]

const statusColor = {
  Expert:    { color: '#FC8F54', bg: 'rgba(252,143,84,0.1)',  border: 'rgba(252,143,84,0.3)'  },
  Mastering: { color: '#6867D2', bg: 'rgba(104,103,210,0.1)', border: 'rgba(104,103,210,0.3)' },
  Sólido:    { color: '#a5a4e8', bg: 'rgba(104,103,210,0.07)',border: 'rgba(104,103,210,0.2)' },
  Learning:  { color: 'rgba(255,255,255,0.4)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.12)' },
}

const timeline = [
  {
    date: '2022 — Presente',
    title: 'Ingeniería de Sistemas y Computación',
    sub: 'Universidad César Vallejo · Piura',
    tags: ['Top 10%', 'Sistemas Operativos', 'Estructura de Datos'],
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

const About = () => (
  <>
    <SEO
      title="Sobre Luis Crisanto | Ingeniero de Sistemas en Formación"
      description="Trayectoria académica, habilidades técnicas en Node.js, MySQL, React y FastAPI. Especialista en arquitectura backend y desarrollo Full Stack."
      canonical="https://luis-crisanto.vercel.app/about"
      keywords="Luis Crisanto, Sobre mí, Ingeniero de Sistemas, Node.js, MySQL, React, FastAPI"
    />

    <div
      className="min-h-screen relative overflow-hidden pt-28 pb-24"
      style={{ background: '#0d0b14' }}
    >

      {/* ── FONDO: imagen de atardecer muy oscurecida ───────────────────────
           IMAGEN SUGERIDA: /Porfolio.webp (la misma del hero)
           Se ve apenas como una textura de color, no distrae              */}
      <div
        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/Porfolio.webp')",
          opacity: 0.06,           // muy sutil, solo da textura de color
          filter: 'blur(8px)',
        }}
      />

      {/* Patrón de puntos sobre el fondo — sutil con color de la paleta */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(104,103,210,0.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Blooms de color */}
      <div
        className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none blur-[140px]"
        style={{ background: 'rgba(104,103,210,0.06)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none blur-[130px]"
        style={{ background: 'rgba(252,143,84,0.05)' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6"
      >

        {/* ── ENCABEZADO EDITORIAL ────────────────────────────────────────── */}
        <motion.div variants={up} className="mb-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: '#FC8F54' }} />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.35em]"
              style={{ color: 'rgba(252,143,84,0.7)' }}
            >
              Discovery Mode
            </span>
          </div>

          {/* Título editorial: "SOBRE" estilo recorte de texto */}
          <h1
            className="font-black tracking-tighter leading-[0.88] mb-6"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            }}
          >
            <span
              className="block text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #FC8F54, #F5525B)' }}
            >
              SOBRE
            </span>
            <span
              className="block text-white"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.12)' }}
            >
              MÍ
            </span>
          </h1>

          {/* Línea divisora con gradiente */}
          <div
            className="h-px max-w-md"
            style={{
              background: 'linear-gradient(90deg, #FC8F54, rgba(104,103,210,0.4), transparent)',
            }}
          />
        </motion.div>

        {/* ── LAYOUT PRINCIPAL ────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ════════════════════════════════════════════════════════════════
              COLUMNA IZQUIERDA  (col 1-7)
          ════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 space-y-14">

            {/* ── FOTO + BIO ────────────────────────────────────────────── */}
            <motion.div variants={up} className="flex flex-col sm:flex-row gap-8 items-start">

              {/* Foto de perfil con marco naranja-índigo
                  IMAGEN: /informalCV.webp  (foto personal tuya) */}
              <div className="relative flex-shrink-0 group">
                <div
                  className="absolute -inset-0.5 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(252,143,84,0.6), rgba(104,103,210,0.4))',
                  }}
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
                  {/* Overlay sutil naranja al hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'rgba(252,143,84,0.08)' }}
                  />
                </div>
                {/* Badge "Disponible" */}
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5
                             px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-md"
                  style={{
                    background: 'rgba(13,11,20,0.9)',
                    border: '1px solid rgba(252,143,84,0.3)',
                  }}
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
                </div>
              </div>

              {/* Texto de presentación personal */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-lg leading-relaxed mb-4"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  Como futuro{' '}
                  <span className="text-white font-semibold italic">Ingeniero de Sistemas</span>,
                  mi enfoque va más allá de escribir código. Se trata de diseñar
                  arquitecturas que resuelvan problemas reales.
                </p>
                <p
                  className="leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  Actualmente en{' '}
                  <span style={{ color: '#FC8F54' }} className="font-medium">7mo ciclo en la UCV</span>,
                  construyo sistemas robustos y escalables con enfoque en backend —
                  donde la lógica y la eficiencia dictan el éxito de una aplicación.
                </p>

                {/* Stats en línea — compactos */}
                <div
                  className="flex gap-6 mt-6 pt-6"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {[
                    { v: '7mo', l: 'Ciclo',       icon: <Cpu size={12} /> },
                    { v: 'UCV', l: 'Universidad',  icon: <GraduationCap size={12} /> },
                    { v: 'FStack', l: 'Perfil',   icon: <Code size={12} /> },
                    { v: 'Back', l: 'Enfoque',    icon: <Server size={12} /> },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <div
                        className="flex items-center justify-center gap-1 mb-0.5"
                        style={{ color: '#FC8F54' }}
                      >
                        {s.icon}
                        <span className="text-lg font-black text-white font-mono">{s.v}</span>
                      </div>
                      <div
                        className="text-[9px] uppercase tracking-widest"
                        style={{ color: 'rgba(255,255,255,0.25)' }}
                      >
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── TECH STACK CON BARRAS ─────────────────────────────────── */}
            <motion.div variants={up}>
              <h2
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-8"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                <Terminal size={16} style={{ color: '#6867D2' }} />
                Core Tech Stack
              </h2>

              <div className="space-y-5">
                {skills.map((skill) => {
                  const sc = statusColor[skill.status]
                  return (
                    <div key={skill.name} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {/* Dot de color según status */}
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: sc.color }}
                          />
                          <span
                            className="text-sm font-medium group-hover:text-white transition-colors duration-200"
                            style={{ color: 'rgba(255,255,255,0.75)' }}
                          >
                            {skill.name}
                          </span>
                        </div>
                        <span
                          className="text-[9px] px-2 py-0.5 rounded font-mono"
                          style={{
                            color:       sc.color,
                            background:  sc.bg,
                            border:      `1px solid ${sc.border}`,
                          }}
                        >
                          {skill.status}
                        </span>
                      </div>
                      {/* Barra de progreso */}
                      <div
                        className="h-0.5 w-full rounded-full overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${sc.color}, rgba(104,103,210,0.5))`,
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* ── BOTONES CTA ───────────────────────────────────────────── */}
            <motion.div variants={up} className="flex flex-wrap gap-4">
              <Link to="/contact">
                <button
                  className="group px-8 py-4 font-bold rounded-2xl transition-all duration-300
                             flex items-center gap-2 hover:scale-[1.03] active:scale-95"
                  style={{
                    background: 'linear-gradient(90deg, #FC8F54, #F5525B)',
                    color: '#fff',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 28px rgba(252,143,84,0.35)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  ¿Trabajamos juntos?
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </Link>
              <a
                href="/cv-luis-crisanto.pdf"
                download="CV_Luis_Crisanto.pdf"
                className="px-8 py-4 font-bold rounded-2xl transition-all duration-300
                           flex items-center gap-2 hover:scale-[1.03] active:scale-95 backdrop-blur-sm"
                style={{
                  background:  'rgba(255,255,255,0.04)',
                  border:      '1px solid rgba(255,255,255,0.12)',
                  color:       'rgba(255,255,255,0.7)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(104,103,210,0.45)'
                  e.currentTarget.style.color       = '#fff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.color       = 'rgba(255,255,255,0.7)'
                }}
              >
                <Download size={16} style={{ color: '#6867D2' }} />
                Descargar CV
              </a>
            </motion.div>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              COLUMNA DERECHA  (col 8-12) — Timeline sticky
          ════════════════════════════════════════════════════════════════ */}
          <motion.div variants={up} className="lg:col-span-5">
            <div
              className="sticky top-28 rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border:     '1px solid rgba(104,103,210,0.15)',
                backdropFilter: 'blur(12px)',
              }}
            >

              {/* ── IMAGEN DECORATIVA DE CABECERA ──────────────────────────
                  IMAGEN: /about-banner.jpg  (sugerencia abajo)
                  Muestra algo que te represente — workspace, ciudad, código  */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src="../../public/about-banner.webp"
                  alt="Workspace de Luis Crisanto"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.55) saturate(1.2)' }}
                />
                {/* Overlay degradado al contenido */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent 30%, rgba(13,11,20,0.95) 100%)',
                  }}
                />
                {/* Label flotante sobre la imagen */}
                <div className="absolute bottom-4 left-5">
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.3em] mb-1"
                    style={{ color: 'rgba(252,143,84,0.7)' }}
                  >
                    Trayectoria
                  </p>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    Mi Camino
                  </h3>
                </div>
              </div>

              {/* ── TIMELINE ──────────────────────────────────────────── */}
              <div className="p-7 space-y-8 relative">
                {/* Línea vertical del timeline */}
                <div
                  className="absolute left-[39px] top-8 bottom-8 w-px"
                  style={{
                    background:
                      'linear-gradient(to bottom, #FC8F54, rgba(104,103,210,0.3), transparent)',
                  }}
                />

                {timeline.map((item, i) => (
                  <div key={i} className="relative pl-10">
                    {/* Nodo del timeline */}
                    <div
                      className="absolute left-0 top-1 w-5 h-5 rounded-full z-10 flex items-center justify-center"
                      style={{
                        background: item.active ? 'rgba(13,11,20,1)' : 'rgba(13,11,20,1)',
                        border: item.active
                          ? '2px solid #FC8F54'
                          : '2px solid rgba(104,103,210,0.4)',
                        boxShadow: item.active ? '0 0 10px rgba(252,143,84,0.4)' : 'none',
                      }}
                    >
                      {item.active && (
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: '#FC8F54' }}
                        />
                      )}
                    </div>

                    {/* Contenido */}
                    {item.date && (
                      <p
                        className="font-mono text-[10px] uppercase tracking-widest mb-1"
                        style={{ color: item.active ? '#FC8F54' : 'rgba(104,103,210,0.6)' }}
                      >
                        {item.date}
                      </p>
                    )}
                    <h4
                      className="font-bold text-base leading-tight mb-0.5"
                      style={{ color: item.active ? '#fff' : 'rgba(255,255,255,0.7)' }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-xs italic mb-3"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      {item.sub}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] px-2 py-0.5 rounded font-mono"
                          style={{
                            background: item.active
                              ? 'rgba(252,143,84,0.08)'
                              : 'rgba(104,103,210,0.07)',
                            border: item.active
                              ? '1px solid rgba(252,143,84,0.2)'
                              : '1px solid rgba(104,103,210,0.2)',
                            color: item.active
                              ? 'rgba(252,143,84,0.7)'
                              : 'rgba(104,103,210,0.6)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* ── TERMINAL QUOTE ────────────────────────────────────── */}
              <div
                className="mx-7 mb-7 p-4 rounded-xl font-mono text-[11px]"
                style={{
                  background: 'rgba(13,11,20,0.8)',
                  border:     '1px solid rgba(104,103,210,0.15)',
                }}
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
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  </>
)

export default About