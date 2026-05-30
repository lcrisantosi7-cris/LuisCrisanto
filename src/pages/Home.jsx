import React from 'react'
import { ArrowRight, Terminal, Cpu, Database, Cloud, Github, Linkedin, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } }
  }

  const techStack = [
    'React', 'Node.js', 'PHP', 'MySQL', 'AWS', 'Docker', 'Git'
  ]

  return (
    <>
      <SEO
        title="Luis Crisanto | Ingeniero de Sistemas & Desarrollador Full Stack"
        description="Especialista en arquitectura backend, Node.js, Spring Boot y AWS. Diseño de sistemas escalables y soluciones tecnológicas de alto impacto."
        canonical="https://luis-crisanto.vercel.app/"
        keywords="Luis Crisanto, Ingeniero de Sistemas, Full Stack Developer, Node.js, Spring Boot, React, AWS, Backend, Arquitectura de Sistemas"
      />
      <div className="min-h-screen bg-zinc-950 relative overflow-hidden flex items-center justify-center px-6 pt-20">

        {/* FONDO: Grid sutil */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(63,63,70,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(63,63,70,0.4) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-emerald-700/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto w-full py-12"
        >
          {/* LAYOUT: dos columnas en desktop, apilado en móvil */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-12">

            {/* ── COLUMNA IZQUIERDA: Texto ── */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">

              {/* Badge de estado */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-900/60 border border-emerald-500/20 rounded-full mb-8 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.25em]">
                  Disponible para proyectos
                </span>
              </motion.div>

              {/* Subtítulo */}
              <motion.p variants={itemVariants} className="text-zinc-500 font-mono text-sm uppercase tracking-[0.3em] mb-4">
                Ingeniero de Sistemas · 7mo Ciclo · UCV
              </motion.p>

              {/* Hero Title */}
              <motion.h1
                variants={itemVariants}
                className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.88] tracking-tighter mb-6"
              >
                <span className="sr-only">Luis Crisanto - Ingeniero de Sistemas y Desarrollador Full Stack</span>
                <span aria-hidden>LUIS</span>
                <br />
                <span
                  aria-hidden
                  className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400"
                >
                  CRISANTO
                </span>
              </motion.h1>

              {/* Descripción */}
              <motion.p variants={itemVariants} className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-xl">
                Especializado en{' '}
                <span className="text-white font-medium">arquitecturas backend robustas</span> y soluciones
                escalables con <span className="text-emerald-400">Node.js, PHP y AWS</span>.
                Construyo sistemas que resuelven problemas reales.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link to="/contact" className="w-full sm:w-auto">
                  <button className="w-full group px-8 py-4 bg-emerald-500 text-zinc-950 font-bold rounded-xl transition-all hover:bg-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2">
                    Iniciar Proyecto
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/projects" className="w-full sm:w-auto">
                  <button className="w-full group px-8 py-4 bg-transparent border border-zinc-700 text-zinc-300 font-bold rounded-xl hover:border-zinc-500 hover:text-white transition-all flex items-center justify-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-500" />
                    Ver Proyectos
                  </button>
                </Link>
              </motion.div>

              {/* Social links */}
              <motion.div variants={itemVariants} className="flex gap-3 justify-center lg:justify-start">
                <a
                  href="https://github.com/lcrisantosi7-cris/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-all"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/luis-crisanto-silupú"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-all"
                >
                  <Linkedin size={18} />
                </a>
              </motion.div>
            </div>

            {/* ── COLUMNA DERECHA: Foto + Stats ── */}
            <motion.div
              variants={itemVariants}
              className="flex-shrink-0 flex flex-col items-center gap-6 order-1 lg:order-2"
            >
              {/* FOTO DE PERFIL */}
              <div className="relative group">
                {/* Anillo de glow animado */}
                <div className="absolute -inset-2 bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-transparent rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Marco decorativo */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/40 to-transparent rounded-3xl" />

                <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-3xl overflow-hidden border border-emerald-500/20 bg-zinc-900 shadow-2xl">
                  <img
                    src="/informalCV.webp"
                    alt="Luis Crisanto — Ingeniero de Sistemas"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextSibling.style.display = 'flex'
                    }}
                  />
                  {/* Fallback */}
                  <div
                    className="absolute inset-0 hidden flex-col items-center justify-center bg-zinc-900 gap-3"
                    aria-hidden="true"
                  >
                    <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center">
                      <User size={40} className="text-zinc-600" />
                    </div>
                    <span className="text-zinc-600 text-xs font-mono">Tu foto aquí</span>
                  </div>
                </div>

                {/* Badge flotante */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 bg-zinc-900 border border-emerald-500/30 rounded-full shadow-xl whitespace-nowrap">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider">Open to work</span>
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-3 w-full mt-4">
                {[
                  { label: 'Ciclo', value: '07', icon: <Cpu size={14} /> },
                  { label: 'Cursos', value: '37+', icon: <Database size={14} /> },
                  { label: 'Proyectos', value: '8+', icon: <Cloud size={14} /> }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="group p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl hover:border-emerald-500/30 hover:bg-zinc-900/80 transition-all backdrop-blur-sm text-center"
                  >
                    <div className="flex justify-center text-emerald-500/60 mb-1.5 group-hover:text-emerald-400 transition-colors">
                      {stat.icon}
                    </div>
                    <div className="text-xl font-black text-white font-mono">{stat.value}</div>
                    <div className="text-zinc-600 text-[9px] uppercase tracking-widest mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* TECH STACK PILLS — full width abajo */}
          <motion.div variants={itemVariants} className="border-t border-zinc-900 pt-10 mt-16 text-center">
            <p className="text-zinc-600 text-[11px] uppercase tracking-[0.35em] mb-5">Stack</p>
            <div className="flex flex-wrap justify-center gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-zinc-900/60 border border-zinc-800 rounded-full text-zinc-500 text-xs font-mono hover:text-zinc-200 hover:border-zinc-600 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </>
  )
}

export default Home
