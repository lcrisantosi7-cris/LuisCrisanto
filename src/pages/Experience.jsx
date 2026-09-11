import React, { useState } from 'react'
import {
  Terminal, Cpu, Network, Database, Globe,
  Code2, Layers, Zap, ArrowRight, BookOpen,
  Briefcase, Award, ChevronDown
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

// ── Variantes ───────────────────────────────────────────────────────────────
const container = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const up = {
  hidden:  { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
}

// ── Datos de ciclos ─────────────────────────────────────────────────────────
// Cada ciclo tiene `img`: coloca ahí una foto real tuya de esa época/proyecto.
// Si aún no tienes foto, pon null y mostrará el color de fondo.
const cycles = [
  {
    cycle: 'I',
    label: 'Fundamentos',
    year: '2022-1',
    courses: ['Introducción a Sistemas', 'Lógica de Programación', 'Cálculo General'],
    icon: Terminal,
    img: '/cycles/cycle-1.jpg',   // foto: primer día de clases, libros, campus
    color: '#6867D2',
    done: true,
  },
  {
    cycle: 'II',
    label: 'Algoritmia',
    year: '2022-2',
    courses: ['Metodologías de Programación', 'Pensamiento Sistémico', 'Cálculo I'],
    icon: Code2,
    img: '/cycles/cycle-2.jpg',   // foto: cuaderno con pseudocódigo, diagrama de flujo a mano
    color: '#6867D2',
    done: true,
  },
  {
    cycle: 'III',
    label: 'Estructuras & HW',
    year: '2023-1',
    courses: ['Estructura de Datos', 'Circuitos Digitales', 'Cálculo II'],
    icon: Cpu,
    img: '/cycles/cycle-3.jpg',   // foto: placa de circuito, lab de hardware
    color: '#5546AD',
    done: true,
  },
  {
    cycle: 'IV',
    label: 'Análisis & Diseño',
    year: '2023-2',
    courses: ['POO Avanzado', 'Análisis de Sistemas', 'Modelado de Datos I'],
    icon: Layers,
    img: '/cycles/cycle-4.jpg',   // foto: diagrama UML en pizarrón, whiteboard
    color: '#5546AD',
    done: true,
  },
  {
    cycle: 'V',
    label: 'Arquitectura SW',
    year: '2024-1',
    courses: ['Ingeniería de Software', 'Arquitectura Empresarial', 'Gestión de Datos II'],
    icon: Database,
    img: '/cycles/cycle-5.jpg',   // foto: tu laptop con un esquema de base de datos abierto
    color: '#FC8F54',
    done: true,
  },
  {
    cycle: 'VI',
    label: 'Web & Redes',
    year: '2024-2',
    courses: ['Ingeniería Web Fullstack', 'Networking Avanzado', 'Gestión de TI'],
    icon: Network,
    img: '/cycles/cycle-6.jpg',   // foto: monitor con código React, terminal abierta
    color: '#FC8F54',
    done: true,
  },
  {
    cycle: 'VII',
    label: 'Cloud & Distribuidos',
    year: '2025-1',
    courses: ['Arquitectura Cloud (AWS)', 'Sistemas Distribuidos', 'Seguridad Informática'],
    icon: Globe,
    img: '/cycles/cycle-7.jpg',   // foto: tu setup actual, laptop, café, lo que sea real
    color: '#F5525B',
    done: false,
    current: true,
  },
]

// ── Datos de skills por categoría ───────────────────────────────────────────
const skillGroups = [
  {
    category: 'Frontend',
    icon: '💻',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7kVwY6E3UkmCgzAWgtGomGiRCMrGr8ZeYqsWeQUCCgEcPTwYvWzjBTEZljwOScmdW0PuSYcVD5CWmP8WEY5MS_0g9ISItFLhQNXgDMx9XSw&s=10',   // foto: browser abierto con tu portafolio o un proyecto
    items: [
      { name: 'React',       level: 75 },
      { name: 'Vue.js',      level: 55 },
      { name: 'Tailwind',    level: 80 },
      { name: 'JavaScript',  level: 78 },
    ],
    accent: '#6867D2',
  },
  {
    category: 'Backend',
    icon: '⚙️',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7kVwY6E3UkmCgzAWgtGomGiRCMrGr8ZeYqsWeQUCCgEcPTwYvWzjBTEZljwOScmdW0PuSYcVD5CWmP8WEY5MS_0g9ISItFLhQNXgDMx9XSw&s=10',    // foto: terminal con Node.js / FastAPI corriendo
    items: [
      { name: 'Node.js',    level: 75 },
      { name: 'PHP/Laravel',level: 82 },
      { name: 'FastAPI',    level: 68 },
      { name: 'Python',     level: 70 },
    ],
    accent: '#FC8F54',
  },
  {
    category: 'Datos & DB',
    icon: '🗄',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7kVwY6E3UkmCgzAWgtGomGiRCMrGr8ZeYqsWeQUCCgEcPTwYvWzjBTEZljwOScmdW0PuSYcVD5CWmP8WEY5MS_0g9ISItFLhQNXgDMx9XSw&s=10',   // foto: DBeaver o MySQL Workbench en pantalla
    items: [
      { name: 'MySQL',        level: 88 },
      { name: 'SQL Server',   level: 80 },
      { name: 'PostgreSQL',   level: 55 },
      { name: 'MongoDB',      level: 45 },
    ],
    accent: '#5546AD',
  },
  {
    category: 'DevOps & Cloud',
    icon: '☁️',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7kVwY6E3UkmCgzAWgtGomGiRCMrGr8ZeYqsWeQUCCgEcPTwYvWzjBTEZljwOScmdW0PuSYcVD5CWmP8WEY5MS_0g9ISItFLhQNXgDMx9XSw&s=10',     // foto: dashboard de Vercel/Render/AWS en pantalla
    items: [
      { name: 'Git / GitHub', level: 85 },
      { name: 'Docker',       level: 50 },
      { name: 'Vercel/Render',level: 70 },
      { name: 'AWS (EC2/S3)', level: 38 },
    ],
    accent: '#F5525B',
  },
]

// ── Componente principal ────────────────────────────────────────────────────
const Experience = () => {
  const [openCycle, setOpenCycle] = useState(null)
  const completedCount = cycles.filter((c) => c.done).length

  return (
    <>
      <SEO
        title="Experiencia y Formación | Luis Crisanto"
        description="Trayectoria académica en Ingeniería de Sistemas: 7 ciclos, 116+ créditos, 8+ proyectos deployados."
        canonical="https://luis-crisanto.vercel.app/experience"
        keywords="Experiencia, Formación, Ingeniería de Sistemas, UCV, Trayectoria académica"
      />

      <div
        className="min-h-screen relative overflow-hidden pt-28 pb-24"
        style={{ background: '#0d0b14' }}
      >

        {/* ── FONDO: patrón diagonal sutil en paleta índigo ─────────────── */}
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
        {/* Bloom naranja arriba-derecha */}
        <div
          className="absolute top-[-5%] right-[-5%] w-[550px] h-[550px] rounded-full pointer-events-none blur-[150px]"
          style={{ background: 'rgba(252,143,84,0.07)' }}
        />
        {/* Bloom índigo abajo-izquierda */}
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none blur-[140px]"
          style={{ background: 'rgba(85,70,173,0.07)' }}
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto px-6"
        >

          {/* ══════════════════════════════════════════════════════════════
              ENCABEZADO
          ══════════════════════════════════════════════════════════════ */}
          <motion.div variants={up} className="mb-20">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: '#FC8F54' }} />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.35em]"
                style={{ color: 'rgba(252,143,84,0.7)' }}
              >
                Roadmap Académico
              </span>
            </div>
            <h1
              className="font-black tracking-tighter leading-[0.88] mb-4"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(3rem, 9vw, 7rem)',
              }}
            >
              <span className="block text-white">FORMACIÓN</span>
              <span
                className="block text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #FC8F54 0%, #F5525B 45%, #6867D2 100%)',
                }}
              >
                & SKILLS
              </span>
            </h1>
            <p className="text-lg max-w-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Mi evolución técnica ciclo a ciclo — desde lógica de programación hasta
              sistemas distribuidos en la nube.
            </p>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════
              KPI ROW
          ══════════════════════════════════════════════════════════════ */}
          <motion.div variants={up} className="flex flex-wrap gap-6 mb-16">
            {[
              { v: '8+',  l: 'Proyectos',          icon: <Briefcase size={15} /> },
              { v: '116+',l: 'Créditos aprobados', icon: <BookOpen  size={15} /> },
              { v: 'Top 10%', l: 'Promedio',        icon: <Award    size={15} /> },
            ].map((k) => (
              <div
                key={k.l}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-sm"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border:     '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div style={{ color: '#FC8F54' }}>{k.icon}</div>
                <div>
                  <p className="text-2xl font-black text-white font-mono leading-none">{k.v}</p>
                  <p
                    className="text-[9px] uppercase tracking-widest mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    {k.l}
                  </p>
                </div>
              </div>
            ))}

            {/* Barra de progreso académico global */}
            <div
              className="flex-1 min-w-[220px] px-6 py-4 rounded-2xl backdrop-blur-sm flex flex-col justify-center gap-2"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border:     '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex justify-between items-center">
                <span
                  className="text-[9px] uppercase tracking-widest font-mono"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  Progreso académico
                </span>
                <span className="text-sm font-black text-white font-mono">
                  {completedCount}/{cycles.length}
                </span>
              </div>
              <div
                className="h-1.5 w-full rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #FC8F54, #F5525B, #6867D2)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / cycles.length) * 100}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
                />
              </div>
              <div className="flex gap-1 mt-1">
                {cycles.map((c) => (
                  <div
                    key={c.cycle}
                    className="flex-1 h-1 rounded-sm"
                    style={{
                      background: c.current
                        ? '#F5525B'
                        : c.done
                        ? 'rgba(104,103,210,0.6)'
                        : 'rgba(255,255,255,0.06)',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════
              GRID DE CICLOS  — tarjetas con imagen de fondo
          ══════════════════════════════════════════════════════════════ */}
          <motion.div variants={up} className="mb-24">
            <h2
              className="text-xs font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-3"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              <span className="h-px w-8" style={{ background: '#6867D2' }} />
              Ciclos académicos · UCV Ingeniería de Sistemas
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {cycles.map((item, i) => {
                const Icon = item.icon
                const isOpen = openCycle === i
                return (
                  <motion.div
                    key={i}
                    variants={up}
                    className="relative overflow-hidden rounded-2xl cursor-pointer group"
                    style={{
                      border: item.current
                        ? '1px solid rgba(245,82,91,0.5)'
                        : '1px solid rgba(255,255,255,0.07)',
                      minHeight: '160px',
                    }}
                    onClick={() => setOpenCycle(isOpen ? null : i)}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Imagen de fondo del ciclo */}
                    {item.img && (
                      <img
                        src={item.img}
                        alt={`Ciclo ${item.cycle}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        style={{ opacity: 0.18 }}
                      />
                    )}

                    {/* Overlay degradado */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: item.current
                          ? `linear-gradient(135deg, rgba(245,82,91,0.15), rgba(13,11,20,0.85))`
                          : `linear-gradient(135deg, rgba(${item.done ? '104,103,210' : '13,11,20'},0.1), rgba(13,11,20,0.88))`,
                      }}
                    />

                    {/* Glow del ciclo actual */}
                    {item.current && (
                      <div
                        className="absolute -inset-1 rounded-2xl blur-xl pointer-events-none"
                        style={{ background: 'rgba(245,82,91,0.12)' }}
                      />
                    )}

                    {/* Contenido */}
                    <div className="relative p-5 flex flex-col h-full min-h-[160px]">
                      {/* Número de ciclo grande como watermark */}
                      <span
                        className="absolute top-3 right-4 font-black font-mono leading-none select-none pointer-events-none"
                        style={{
                          fontSize: '3.5rem',
                          color: item.current ? 'rgba(245,82,91,0.12)' : 'rgba(104,103,210,0.1)',
                        }}
                      >
                        {item.cycle}
                      </span>

                      {/* Badge "En curso" */}
                      {item.current && (
                        <span
                          className="self-start text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3"
                          style={{
                            background: 'rgba(245,82,91,0.2)',
                            border:     '1px solid rgba(245,82,91,0.4)',
                            color:      '#F5525B',
                          }}
                        >
                          En progreso
                        </span>
                      )}

                      {/* Ícono + ciclo */}
                      <div className="flex items-center gap-2 mb-2 mt-auto">
                        <div
                          className="p-1.5 rounded-lg"
                          style={{
                            background: `${item.color}18`,
                            border:     `1px solid ${item.color}30`,
                          }}
                        >
                          <Icon size={14} style={{ color: item.color }} />
                        </div>
                        <span
                          className="font-mono text-[10px] uppercase tracking-widest"
                          style={{ color: `${item.color}90` }}
                        >
                          {item.year}
                        </span>
                      </div>

                      <p
                        className="font-bold text-sm leading-tight mb-0.5"
                        style={{ color: item.current ? '#fff' : 'rgba(255,255,255,0.8)' }}
                      >
                        Ciclo {item.cycle}
                      </p>
                      <p
                        className="text-[10px] uppercase tracking-wider"
                        style={{ color: 'rgba(255,255,255,0.3)' }}
                      >
                        {item.label}
                      </p>

                      {/* Chevron toggle */}
                      <ChevronDown
                        size={14}
                        className="mt-2 transition-transform duration-300"
                        style={{
                          color: 'rgba(255,255,255,0.25)',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </div>

                    {/* Panel expandible con cursos */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                          style={{
                            borderTop: `1px solid ${item.color}25`,
                            background: 'rgba(13,11,20,0.92)',
                          }}
                        >
                          <div className="p-4 space-y-2">
                            {item.courses.map((course, ci) => (
                              <div key={ci} className="flex items-start gap-2">
                                <Zap
                                  size={11}
                                  className="mt-0.5 shrink-0"
                                  style={{ color: item.color }}
                                />
                                <span
                                  className="text-xs leading-snug"
                                  style={{ color: 'rgba(255,255,255,0.6)' }}
                                >
                                  {course}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
            <p
              className="text-[10px] font-mono mt-4"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              * Haz clic en cada ciclo para ver los cursos
            </p>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════
              SKILLS POR CATEGORÍA — cards con imagen de fondo
          ══════════════════════════════════════════════════════════════ */}
          <motion.div variants={up} className="mb-24">
            <h2
              className="text-xs font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-3"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              <span className="h-px w-8" style={{ background: '#FC8F54' }} />
              Nivel técnico actual
            </h2>

            <div className="grid sm:grid-cols-2 gap-5">
              {skillGroups.map((group) => (
                <motion.div
                  key={group.category}
                  variants={up}
                  className="relative overflow-hidden rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border:     `1px solid ${group.accent}20`,
                  }}
                >
                  {/* Imagen de fondo de la categoría */}
                  {group.img && (
                    <img
                      src={group.img}
                      alt={group.category}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ opacity: 0.07, filter: 'saturate(0.5)' }}
                    />
                  )}

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${group.accent}08 0%, transparent 60%)`,
                    }}
                  />

                  <div className="relative p-6">
                    {/* Header de categoría */}
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                        style={{
                          background: `${group.accent}15`,
                          border:     `1px solid ${group.accent}30`,
                        }}
                      >
                        {group.icon}
                      </div>
                      <div>
                        <p
                          className="font-bold text-sm text-white"
                        >
                          {group.category}
                        </p>
                        <p
                          className="text-[9px] uppercase tracking-widest"
                          style={{ color: 'rgba(255,255,255,0.25)' }}
                        >
                          {group.items.length} tecnologías
                        </p>
                      </div>
                    </div>

                    {/* Items con barra */}
                    <div className="space-y-4">
                      {group.items.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between items-center mb-1.5">
                            <span
                              className="text-xs font-medium"
                              style={{ color: 'rgba(255,255,255,0.7)' }}
                            >
                              {skill.name}
                            </span>
                            <span
                              className="font-mono text-[10px]"
                              style={{ color: `${group.accent}90` }}
                            >
                              {skill.level}%
                            </span>
                          </div>
                          {/* Track */}
                          <div
                            className="h-1 w-full rounded-full overflow-hidden"
                            style={{ background: 'rgba(255,255,255,0.06)' }}
                          >
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${group.accent}, ${group.accent}60)`,
                              }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════
              CTA FINAL
          ══════════════════════════════════════════════════════════════ */}
          <motion.div
            variants={up}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl"
            style={{
              background: 'rgba(252,143,84,0.04)',
              border:     '1px solid rgba(252,143,84,0.15)',
            }}
          >
            <div>
              <p
                className="font-mono text-[10px] uppercase tracking-widest mb-1"
                style={{ color: 'rgba(252,143,84,0.6)' }}
              >
                ¿Quieres ver el resultado?
              </p>
              <p className="text-xl font-bold text-white">
                Revisa mis proyectos deployados
              </p>
            </div>
            <Link to="/projects">
              <button
                className="group flex items-center gap-2 px-7 py-3.5 font-bold rounded-xl
                           transition-all duration-300 hover:scale-[1.04] active:scale-95 whitespace-nowrap"
                style={{
                  background: 'linear-gradient(90deg, #FC8F54, #F5525B)',
                  color:      '#fff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(252,143,84,0.35)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Ver Proyectos
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </>
  )
}

export default Experience