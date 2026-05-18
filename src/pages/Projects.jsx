import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github, ExternalLink, Code2, Database, Layout,
  Terminal, Globe, Cpu, School, ShoppingCart,
  Box, CreditCard, BarChart3, Calendar, Map, MessageSquare
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const ServerIcon = ({ className, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
)

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'Todo el Sistema' },
    { id: 'backend', label: 'Backend API' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'academic', label: 'Investigación' }
  ]

  // Mapeo de datos con Iconos Lucide reales
  const projects = [
    {
      title: 'Sistema de Gestión Escolar',
      description: 'Plataforma MVC integral para administración académica. Manejo de concurrencia y roles.',
      icon: School,
      tags: ['PHP', 'MySQL', 'CSS', 'JavaScript', 'MVC'],
      category: 'fullstack',
      type: 'academic',
      github: 'https://github.com/lcrisantosi7-cris/Sistema-Gestion-Escolar',
      status: 'production' // Production = Completado
    },
    {
      title: 'API REST E-Commerce',
      description: 'Arquitectura RESTful escalable con autenticación JWT, pasarela de pagos y gestión de inventario.',
      icon: ShoppingCart,
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      category: 'backend',
      type: 'personal',
      github: '#',
      status: 'dev' // Dev = En desarrollo
    },
    {
      title: 'Control de Inventario',
      description: 'Sistema logístico con algoritmos de predicción de stock y generación de reportes PDF/Excel.',
      icon: Box,
      tags: ['PHP', 'MySQL', 'JS', 'Chart.js'],
      category: 'fullstack',
      type: 'academic',
      github: '#',
      demo: '#',
      status: 'production'
    },
    {
      title: 'Microservicios de Pagos',
      description: 'Arquitectura distribuida para orquestación de pagos usando RabbitMQ para mensajería asíncrona.',
      icon: CreditCard,
      tags: ['PHP', 'RabbitMQ', 'Docker'],
      category: 'backend',
      type: 'personal',
      github: '#',
      status: 'dev'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Panel de visualización de datos en tiempo real con agregación de métricas de múltiples fuentes.',
      icon: BarChart3,
      tags: ['React', 'Node.js', 'MongoDB'],
      category: 'fullstack',
      type: 'personal',
      github: '#',
      demo: '#',
      status: 'dev'
    },
    {
      title: 'Sistema de Reservas',
      description: 'Motor de reservas con validación de conflictos horarios y notificaciones transaccionales vía AWS SES.',
      icon: Calendar,
      tags: ['Node.js', 'Vue.js', 'AWS SES'],
      category: 'fullstack',
      type: 'academic',
      github: '#',
      demo: '#',
      status: 'dev'
    },
    {
      title: 'API de Geolocalización',
      description: 'Servicio backend para cálculos geoespaciales y optimización de rutas usando PostGIS.',
      icon: Map,
      tags: ['PHP', 'PostgreSQL', 'Redis'],
      category: 'backend',
      type: 'personal',
      github: '#',
      status: 'dev'
    },
    {
      title: 'Real-Time Chat Engine',
      description: 'Infraestructura de comunicación bidireccional escalable basada en eventos WebSockets.',
      icon: MessageSquare,
      tags: ['Node.js', 'Socket.io', 'React'],
      category: 'fullstack',
      type: 'personal',
      github: '#',
      demo: '#',
      status: 'dev'
    }
  ]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter || p.type === activeFilter)

  return (
    <>
      <SEO
        title="Proyectos | Luis Crisanto - Portfolio de Desarrollo"
        description="Explora mis proyectos de ingeniería de software: APIs REST, sistemas de gestión escolar, microservicios, dashboards y arquitecturas backend escalables."
        canonical="https://mi-portafolio-khaki-two.vercel.app/projects"
        keywords="Proyectos, Portfolio, APIs REST, Microservicios, Full Stack, Backend, Node.js, PHP, React, Sistemas de Gestión"
      />
      <div className="min-h-screen bg-zinc-950 py-28 px-6 relative overflow-hidden">
        {/* FONDO: grid grande con acento — diferente a otras páginas */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#3f3f46 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <div className="absolute top-[0%] right-[0%] w-[500px] h-[500px] bg-emerald-500/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[0%] left-[0%] w-[400px] h-[400px] bg-orange-600/4 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* HEADER */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full mb-6 shadow-xl"
            >
              <Terminal className="w-4 h-4 text-emerald-500" />
              <span className="text-zinc-300 font-mono text-xs uppercase tracking-widest">
                ~/projects/portfolio
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white mb-6"
            >
              Mis Proyectos: Ingeniería & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Desarrollo</span>
            </motion.h1>
            <motion.p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Una colección de soluciones técnicas, desde arquitecturas backend robustas hasta interfaces modernas.
            </motion.p>
          </div>

          {/* STATS BAR (GitHub Style) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {[
              { label: 'Total Repos', value: projects.length, icon: Database },
              { label: 'Producción', value: projects.filter(p => p.status === 'production').length, icon: Globe },
              { label: 'Backend', value: projects.filter(p => p.category === 'backend').length, icon: ServerIcon },
              { label: 'Full Stack', value: projects.filter(p => p.category === 'fullstack').length, icon: Layout }
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-center justify-between hover:border-emerald-500/30 transition-colors">
                <div>
                  <p className="text-2xl font-bold text-white font-mono">{stat.value}</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                </div>
                <stat.icon className="text-emerald-500/20" size={24} />
              </div>
            ))}
          </motion.div>

          {/* CUSTOM TABS */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-zinc-900/80 border border-zinc-800 rounded-2xl backdrop-blur-sm">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300 z-10 ${activeFilter === filter.id ? 'text-zinc-950' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  {activeFilter === filter.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-emerald-500 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* PROJECTS GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.3,
                    layout: { type: "spring", bounce: 0.2, duration: 0.6 }
                  }}
                  className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-colors duration-300 flex flex-col h-full"
                >
                  {/* Visual Header */}
                  <div className={`h-36 w-full relative overflow-hidden flex items-center justify-center ${project.category === 'backend'
                      ? 'bg-gradient-to-br from-zinc-800 via-zinc-900 to-blue-950/40'
                      : project.category === 'fullstack'
                        ? 'bg-gradient-to-br from-zinc-800 via-zinc-900 to-emerald-950/40'
                        : 'bg-gradient-to-br from-zinc-800 via-zinc-900 to-violet-950/30'
                    }`}>
                    <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
                    <div className={`absolute w-24 h-24 rounded-full blur-2xl opacity-25 ${project.category === 'backend' ? 'bg-blue-500' : 'bg-emerald-500'
                      }`} />

                    <div className="relative z-10 p-4 bg-zinc-950/70 rounded-2xl border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <project.icon size={32} className={project.category === 'backend' ? 'text-blue-400' : 'text-emerald-400'} />
                    </div>

                    <div className={`absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${project.status === 'production'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }`}>
                      {project.status === 'production' ? 'Completado' : 'En Desarrollo'}
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-zinc-400 font-mono hover:border-zinc-600 transition-colors cursor-default">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/50">
                      {project.github && project.github !== '#' && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-800 hover:text-white transition-colors group/btn">
                          <Github size={16} /> Code
                        </a>
                      )}
                      {project.demo && project.demo !== '#' && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600/10 border border-emerald-600/20 text-emerald-400 text-sm font-medium hover:bg-emerald-600/20 transition-colors">
                          <ExternalLink size={16} /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Call to Action Footer */}
          <div className="mt-24 text-center">
            <p className="text-zinc-500 mb-6">¿Interesado en la arquitectura de estos proyectos?</p>
            <Link to="/contact">
              <button className="px-8 py-3 rounded-xl bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                Contactar para Colaboración
              </button>
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default Projects
