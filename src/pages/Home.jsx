import { ArrowRight, Terminal, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { SocialSidebar, SocialRow } from '../components/SocialLinks'

// ── Animaciones ──────────────────────────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const up = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

// ── Stack de tecnologías ─────────────────────────────────────────────────────
const STACK = ['Node.js', 'PHP', 'FastAPI', 'React', 'MySQL', 'Python', 'Docker', 'AWS']

// ── Proyecto estrella ────────────────────────────────────────────────────────
const STAR_PROJECT = {
  label: 'Proyecto destacado',
  title: 'RetailVision Analytics',
  description: 'Detección de personas en tiempo real con YOLOv8, mapas de calor y métricas de afluencia para múltiples cámaras.',
  tags: ['FastAPI', 'YOLOv8', 'React', 'WebSocket'],
  github: 'https://github.com/lcrisantosi7-cris/retailvision-analytics',
  demo: null,
}

// ════════════════════════════════════════════════════════════════════════════
export default function Home() {
  return (
    <>
      <SEO
        title="Luis Crisanto | Ingeniero de Sistemas & Desarrollador Full Stack"
        description="Especialista en arquitectura backend, Node.js, FastAPI y Python. Diseño de sistemas escalables y soluciones tecnológicas de alto impacto."
        canonical="https://luis-crisanto.vercel.app/"
        keywords="Luis Crisanto, Ingeniero de Sistemas, Full Stack Developer, Node.js, FastAPI, React, Python, Backend, Lima"
      />

      {/* ── Sidebar redes sociales — solo desktop ── */}
      <SocialSidebar />

      {/* ════════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden flex items-center">

        {/* FONDO: foto de portada */}
        <div
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/Porfolio.webp')" }}
        />

        {/* OVERLAY: gradiente que oscurece más hacia abajo para legibilidad */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(13,11,20,0.55) 0%, rgba(13,11,20,0.75) 50%, #0d0b14 100%)',
          }}
        />
        {/* Overlay lateral izquierda — refuerza la legibilidad del texto */}
        <div
          className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
          style={{
            background:
              'linear-gradient(to right, rgba(13,11,20,0.7) 0%, rgba(13,11,20,0.3) 55%, transparent 100%)',
          }}
        />

        {/* CONTENIDO */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-20 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-16
                     pt-28 pb-16 lg:pt-0 lg:pb-0 min-h-screen flex items-center"
        >
          {/*
            Layout:
            · Móvil  → columna única, foto pequeña arriba (centrada), texto abajo
            · Desktop → dos columnas: texto izquierda, foto derecha
          */}
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-16">

            {/* ── COLUMNA IZQUIERDA: Texto ─────────────────────────────── */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1 w-full">

              {/* Badge "Disponible" */}
              <motion.div variants={up} className="flex justify-center lg:justify-start mb-6">
                <div
                  className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full backdrop-blur-md"
                  style={{
                    background: 'rgba(252,143,84,0.1)',
                    border: '1px solid rgba(252,143,84,0.3)',
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: '#FC8F54' }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ backgroundColor: '#FC8F54' }}
                    />
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.25em]"
                    style={{ color: '#ffb388' }}
                  >
                    Disponible para proyectos
                  </span>
                </div>
              </motion.div>

              {/* Label mono */}
              <motion.p
                variants={up}
                className="font-mono text-xs uppercase tracking-[0.3em] mb-3"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                Ingeniero de Sistemas · 7mo Ciclo · UCV · Lima
              </motion.p>

              {/* Título principal */}
              <motion.h1
                variants={up}
                className="font-black leading-[0.88] tracking-tighter mb-5"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(3rem, 10vw, 6.5rem)',
                }}
              >
                <span className="sr-only">
                  Luis Crisanto — Ingeniero de Sistemas y Desarrollador Full Stack en Lima, Perú
                </span>
                <span className="block text-white" aria-hidden>LUIS</span>
                <span
                  aria-hidden
                  className="block text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, #FC8F54 0%, #F5525B 50%, #6867D2 100%)',
                  }}
                >
                  CRISANTO
                </span>
              </motion.h1>

              {/* Descripción — copy humano, directo */}
              <motion.p
                variants={up}
                className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                Construyo el backend que hace funcionar las cosas.{' '}
                <span className="text-white font-medium">APIs, sistemas y arquitecturas</span>{' '}
                que escalan — desde Lima para el mundo.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={up}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
              >
                <Link to="/contact" className="w-full sm:w-auto">
                  <button
                    className="w-full group px-7 py-3.5 font-bold rounded-xl transition-all duration-300
                               flex items-center justify-center gap-2 active:scale-95 text-white"
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
                    className="w-full group px-7 py-3.5 font-bold rounded-xl transition-all duration-300
                               flex items-center justify-center gap-2 active:scale-95 backdrop-blur-sm"
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

              {/* Redes sociales — solo móvil */}
              <motion.div variants={up} className="flex justify-center lg:hidden mb-6">
                <SocialRow size={18} />
              </motion.div>

              {/* ── PROYECTO ESTRELLA ── */}
              <motion.div variants={up}>
                <Link to="/projects" className="block group">
                  <div
                    className="rounded-2xl p-4 transition-all duration-300 text-left"
                    style={{
                      background: 'rgba(13,11,20,0.7)',
                      border: '1px solid rgba(252,143,84,0.18)',
                      backdropFilter: 'blur(12px)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(252,143,84,0.45)'
                      e.currentTarget.style.background = 'rgba(13,11,20,0.85)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(252,143,84,0.18)'
                      e.currentTarget.style.background = 'rgba(13,11,20,0.7)'
                    }}
                  >
                    {/* Header de la card */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-mono text-[9px] uppercase tracking-[0.3em]"
                        style={{ color: 'rgba(252,143,84,0.65)' }}
                      >
                        {STAR_PROJECT.label}
                      </span>
                      <ExternalLink
                        size={13}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: '#FC8F54' }}
                      />
                    </div>

                    {/* Título */}
                    <p
                      className="font-bold text-sm text-white mb-1 group-hover:text-white transition-colors"
                    >
                      {STAR_PROJECT.title}
                    </p>

                    {/* Descripción */}
                    <p
                      className="text-xs leading-relaxed mb-3"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      {STAR_PROJECT.description}
                    </p>

                    {/* Tags + link GitHub */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex flex-wrap gap-1.5">
                        {STAR_PROJECT.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono px-2 py-0.5 rounded"
                            style={{
                              background: 'rgba(252,143,84,0.08)',
                              border: '1px solid rgba(252,143,84,0.2)',
                              color: 'rgba(252,143,84,0.7)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {STAR_PROJECT.github && (
                        <a
                          href={STAR_PROJECT.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono transition-colors"
                          style={{ color: 'rgba(255,255,255,0.25)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = '#FC8F54' }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>

            </div>

            {/* ── COLUMNA DERECHA: Foto ──────────────────────────────── */}
            <motion.div
              variants={up}
              className="flex-shrink-0 flex flex-col items-center order-1 lg:order-2"
            >
              <div className="relative group">
                {/* Glow de fondo */}
                <div
                  className="absolute -inset-4 rounded-3xl blur-2xl opacity-40
                             group-hover:opacity-65 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse, rgba(252,143,84,0.5) 0%, rgba(245,82,91,0.2) 55%, transparent 75%)',
                  }}
                />
                {/* Anillo decorativo */}
                <div
                  className="absolute -inset-0.5 rounded-3xl pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(252,143,84,0.45), rgba(104,103,210,0.25), transparent)',
                  }}
                />

                {/* Foto — más pequeña en móvil */}
                <div
                  className="relative rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl
                             w-36 h-36 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-72 xl:h-72"
                  style={{ border: '1px solid rgba(252,143,84,0.15)' }}
                >
                  <img
                    src="/informalCV.webp"
                    alt="Luis Crisanto — Ingeniero de Sistemas, Lima"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Badge "Open to work" */}
                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2
                             px-3 py-1.5 rounded-full shadow-xl whitespace-nowrap backdrop-blur-md"
                  style={{
                    background: 'rgba(13,11,20,0.88)',
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
                    Open to work
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECCIÓN INFERIOR: Stack + números
          — queda justo debajo del hero, conectado visualmente
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative z-10 px-5 sm:px-8 lg:px-16 py-12 lg:py-16"
        style={{
          background: '#0d0b14',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

            {/* Stats */}
            <div className="flex items-center gap-8 sm:gap-12">
              {[
                { value: '8+', label: 'Proyectos' },
                { value: '37+', label: 'Cursos' },
                { value: '07', label: 'Ciclo académico' },
              ].map((s, i, arr) => (
                <div key={s.label} className="flex items-center gap-8 sm:gap-12">
                  <div>
                    <p
                      className="text-3xl font-black text-white font-mono leading-none mb-0.5"
                    >
                      {s.value}
                    </p>
                    <p
                      className="text-[10px] uppercase tracking-widest"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      {s.label}
                    </p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.08)' }} />
                  )}
                </div>
              ))}
            </div>

            {/* Stack pills */}
            <div className="flex-1">
              <p
                className="text-[9px] uppercase tracking-[0.4em] mb-3 font-mono"
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {STACK.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-[11px] font-mono cursor-default
                               transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.35)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'rgba(255,179,136,0.9)'
                      e.currentTarget.style.borderColor = 'rgba(252,143,84,0.3)'
                      e.currentTarget.style.background = 'rgba(252,143,84,0.06)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
