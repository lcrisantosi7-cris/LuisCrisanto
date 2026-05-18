import React from 'react'
import {
  Calendar, GraduationCap, BookOpen, Award,
  Terminal, Cpu, Network, Database, Globe,
  Code2, Briefcase, Zap, Layers
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const Experience = () => {
  // Datos estructurados con iconos profesionales
  const cycles = [
    {
      cycle: 'Ciclo I',
      label: 'Fundamentos de Ingeniería',
      courses: ['Introducción a Sistemas', 'Lógica de Programación', 'Cáculo General'],
      icon: Terminal,
      year: '2022-1'
    },
    {
      cycle: 'Ciclo II',
      label: 'Algoritmia & Lógica',
      courses: ['Metodologías de Programación', 'Pensamiento Sistémico', 'Cálculo I'],
      icon: Code2,
      year: '2022-2'
    },
    {
      cycle: 'Ciclo III',
      label: 'Estructuras & Hardware',
      courses: ['Estructura de Datos', 'Circuitos Digitales', 'Cálculo II'],
      icon: Cpu,
      year: '2023-1'
    },
    {
      cycle: 'Ciclo IV',
      label: 'Análisis & Diseño',
      courses: ['POO Avanzado', 'Análisis de Sistemas', 'Modelado de Datos I'],
      icon: Layers,
      year: '2023-2'
    },
    {
      cycle: 'Ciclo V',
      label: 'Arquitectura de Software',
      courses: ['Ingeniería de Software', 'Arquitectura Empresarial', 'Gestión de Datos II'],
      icon: Database,
      year: '2024-1'
    },
    {
      cycle: 'Ciclo VI',
      label: 'Desarrollo Web & Redes',
      courses: ['Ingeniería Web Fullstack', 'Networking Avanzado', 'Gestión de TI'],
      icon: Network,
      year: '2024-2'
    },
    {
      cycle: 'Ciclo VII',
      label: 'Sistemas Distribuidos & Cloud',
      courses: ['Arquitectura Cloud (AWS)', 'Sistemas Distribuidos', 'Seguridad Informática'],
      icon: Globe,
      current: true,
      year: '2025-1'
    }
  ]

  const achievements = [
    { title: 'Proyectos', value: '8+', icon: Briefcase },
    { title: 'Créditos Aprobados', value: '116+', icon: BookOpen },
    { title: 'Promedio Ponderado', value: 'Top 10', icon: Award }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <>
      <SEO
        title="Experiencia y Formación | Luis Crisanto - Ingeniero de Sistemas"
        description="Mi trayectoria académica en Ingeniería de Sistemas: 6 ciclos completados, 116+ créditos, 8+ proyectos. Roadmap de formación profesional."
        canonical="https://mi-portafolio-khaki-two.vercel.app/experience"
        keywords="Experiencia, Formación, Ingeniería de Sistemas, Educación, Universidad César Vallejo, Trayectoria académica"
      />
      <div className="min-h-screen bg-zinc-950 py-28 px-6 relative overflow-hidden">
        {/* FONDO: líneas diagonales — diferente a otras páginas */}
        <div
          className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              #6ee7b7 0px,
              #6ee7b7 1px,
              transparent 1px,
              transparent 40px
            )`
          }}
        />
        <div className="absolute top-[10%] right-[5%] w-[450px] h-[450px] bg-emerald-500/6 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] bg-violet-600/5 rounded-full blur-[110px] pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto relative z-10"
        >
          {/* HEADER SECTION */}
          <div className="text-center mb-20">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest">
                Roadmap Académico
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Experiencia & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Formación</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-zinc-400 max-w-xl mx-auto text-lg">
              Mi evolución técnica a través de la Ingeniería de Sistemas, desde los fundamentos lógicos hasta arquitecturas complejas.
            </motion.p>
          </div>

          {/* KPI CARDS (Achievements) */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {achievements.map((item, idx) => (
              <div key={idx} className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-6 rounded-2xl flex items-center gap-5 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-all group">
                <div className="p-3 bg-zinc-800/80 rounded-xl group-hover:bg-emerald-500/10 transition-colors shrink-0">
                  <item.icon className="w-8 h-8 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div>
                  <p className="text-3xl font-black text-white mb-1 group-hover:text-emerald-400 transition-colors font-mono">{item.value}</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">{item.title}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* TIMELINE PRINCIPAL */}
          <div className="relative">
            {/* Línea Central Vertical */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-zinc-800/50">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-emerald-500 to-transparent opacity-50"></div>
            </div>

            <div className="space-y-16">
              {cycles.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? '' : 'md:flex-row-reverse'
                    }`}
                >
                  {/* 1. DATA LATERAL (Fecha/Label) */}
                  <div className={`w-full md:w-1/2 mb-6 md:mb-0 flex flex-col ${index % 2 === 0 ? 'md:pr-16 md:items-end md:text-right' : 'md:pl-16 md:items-start md:text-left'
                    }`}>
                    <div className="inline-block">
                      <span className="text-emerald-500 font-mono text-sm font-bold mb-1 block">{item.year}</span>
                      <h3 className={`text-2xl font-bold text-white ${item.current ? 'text-emerald-400' : ''}`}>
                        {item.cycle}
                      </h3>
                      <p className="text-zinc-500 text-sm uppercase tracking-wider font-medium mt-1">{item.label}</p>
                    </div>
                  </div>

                  {/* 2. ICONO CENTRAL (Connector) */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10 hidden md:flex">
                    <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center bg-zinc-950 transition-all duration-300 ${item.current
                      ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110'
                      : 'border-zinc-800 hover:border-zinc-600'
                      }`}>
                      <item.icon size={20} className={item.current ? 'text-emerald-400' : 'text-zinc-600'} />
                    </div>
                  </div>

                  {/* 3. CARD DE CONTENIDO */}
                  <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:pl-16 justify-start' : 'md:pr-16 justify-end'
                    }`}>
                    <div className={`relative w-full p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${item.current
                      ? 'bg-zinc-900/80 border-emerald-500/50 shadow-lg shadow-emerald-500/5'
                      : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'
                      }`}>

                      {/* Badge "En curso" */}
                      {item.current && (
                        <div className="absolute -top-3 -right-3 px-3 py-1 bg-emerald-500 text-zinc-950 text-[10px] font-bold uppercase rounded-full shadow-lg">
                          En Progreso
                        </div>
                      )}

                      <div className="space-y-3">
                        {item.courses.map((course, idx) => (
                          <div key={idx} className="flex items-center gap-3 group/item">
                            <Zap size={14} className={`mt-0.5 transition-colors ${item.current ? 'text-emerald-500' : 'text-zinc-700 group-hover/item:text-emerald-500'}`} />
                            <span className="text-zinc-300 text-sm font-medium group-hover/item:text-white transition-colors">
                              {course}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FINAL CTA */}
          <motion.div variants={itemVariants} className="text-center mt-24">
            <Link to="/projects">
              <button className="group relative px-8 py-4 bg-transparent border border-zinc-700 hover:border-emerald-500 text-zinc-300 hover:text-emerald-400 font-bold rounded-xl transition-all overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Ver Portafolio de Código <Globe size={18} />
                </span>
                <div className="absolute inset-0 bg-emerald-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </>
  )
}

export default Experience
