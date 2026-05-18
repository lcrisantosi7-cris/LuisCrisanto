import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2, Database, Cloud, Server, Layers, Zap, Settings,
  Terminal, Globe, Braces, Container, Cpu, GitBranch,
  LayoutTemplate, Share2, ShieldCheck, Box
} from 'lucide-react'
import SEO from '../components/SEO'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Stack Completo', icon: Layers },
    { id: 'backend', name: 'Backend & API', icon: Server },
    { id: 'frontend', name: 'Frontend & UI', icon: Code2 },
    { id: 'database', name: 'Data Store', icon: Database },
    { id: 'cloud', name: 'DevOps & Cloud', icon: Cloud }
  ]

  // Datos enriquecidos con iconos profesionales de Lucide y colores de marca
  const skills = [
    // Backend
    { name: 'Node.js', category: 'backend', level: 85, icon: Server, color: '#22c55e' }, // green-500
    { name: 'PHP', category: 'backend', level: 80, icon: Terminal, color: '#8b5cf6' }, // violet-500

    // Frontend
    { name: 'React', category: 'frontend', level: 80, icon: Braces, color: '#3b82f6' }, // blue-500
    { name: 'HTML5/CSS3', category: 'frontend', level: 95, icon: Globe, color: '#f97316' }, // orange-500
    { name: 'JavaScript', category: 'frontend', level: 90, icon: Code2, color: '#eab308' }, // yellow-500
    { name: 'Tailwind CSS', category: 'frontend', level: 85, icon: LayoutTemplate, color: '#06b6d4' }, // cyan-500

    // Database
    { name: 'MySQL / MariaDB', category: 'database', level: 85, icon: Database, color: '#0ea5e9' }, // sky-500
    { name: 'SQL Server', category: 'database', level: 70, icon: ShieldCheck, color: '#ef4444' }, // red-500

    // Cloud/Tools
    { name: 'AWS Services', category: 'cloud', level: 65, icon: Cloud, color: '#f59e0b' }, // amber-500
    { name: 'Docker', category: 'cloud', level: 60, icon: Container, color: '#3b82f6' }, // blue-500
    { name: 'Git & GitHub', category: 'tools', level: 85, icon: GitBranch, color: '#f43f5e' }, // rose-500
    { name: 'VS Code', category: 'tools', level: 95, icon: Settings, color: '#3b82f6' } // blue-500
  ]

  const learningSkills = [
    { name: 'Vue.js', icon: Share2, status: 'Explorando' },
    { name: 'Next.js', icon: Layers, status: 'Integrando' }
  ]

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory || (activeCategory === 'cloud' && skill.category === 'tools'))

  return (
    <>
      <SEO
        title="Habilidades Técnicas | Luis Crisanto - Stack Tecnológico"
        description="Mis habilidades: Node.js, PHP, React, MySQL, AWS, Docker, Git. Backend, Frontend, Bases de Datos y DevOps. Nivel de dominio por tecnología."
        canonical="https://mi-portafolio-khaki-two.vercel.app/skills"
        keywords="Habilidades, Skills, Node.js, PHP, React, MySQL, AWS, Docker, Frontend, Backend, DevOps, Programación"
      />
      <div className="min-h-screen bg-zinc-950 py-28 px-6 relative overflow-hidden">
        {/* FONDO: puntos grandes y dispersos — diferente a otras páginas */}
        <div
          className="absolute inset-0 z-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(#3f3f46 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
        />
        <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] bg-emerald-500/6 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* HEADER */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full mb-6"
            >
              <Cpu className="w-4 h-4 text-emerald-500" />
              <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                Stack Tecnológico
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white mb-6"
            >
              Arsenal <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Técnico</span>
            </motion.h1>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Conjunto de herramientas y lenguajes optimizados para construir soluciones escalables y robustas.
            </p>
          </div>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 border ${activeCategory === category.id
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>

          {/* SKILLS GRID */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  key={skill.name}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-6 rounded-2xl transition-all duration-300 group cursor-default"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = skill.color + '50'
                    e.currentTarget.style.boxShadow = `0 0 20px ${skill.color}15`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = ''
                    e.currentTarget.style.boxShadow = ''
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-zinc-950 border border-zinc-800 group-hover:scale-110 transition-transform duration-300"
                        style={{ color: skill.color }}
                      >
                        <skill.icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {skill.name}
                        </h3>
                        <span className="text-xs font-mono text-zinc-500 uppercase">Nivel: {skill.level}%</span>
                      </div>
                    </div>
                  </div>

                  {/* PROGRESS BAR ANIMADA */}
                  < div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden" >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}40` }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* SECTION: R&D (Learning) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative mt-24"
          >
            {/* Decorative Label */}
            <div className="absolute -top-3 left-6 px-3 py-1 bg-zinc-950 border border-emerald-500/30 text-emerald-500 text-xs font-bold uppercase rounded tracking-wider z-10">
              R&D Lab
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 border-dashed rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 relative z-10">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Terminal className="text-emerald-500" />
                    Próximos Objetivos
                  </h2>
                  <p className="text-zinc-400 text-sm mt-1">Tecnologías en fase de exploración y aprendizaje.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                {learningSkills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-zinc-950/50 border border-zinc-800 rounded-xl hover:border-emerald-500/30 transition-colors">
                    <skill.icon className="text-zinc-500" size={20} />
                    <div>
                      <h3 className="text-zinc-200 font-medium text-sm">{skill.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wide">{skill.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* FOOTER STATS */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 text-center border-t border-zinc-800 pt-12">
            <div className="group">
              <h3 className="text-5xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors">2+</h3>
              <p className="text-zinc-500 text-sm uppercase tracking-widest">Años Aprendiendo</p>
            </div>
            <div className="group">
              <h3 className="text-5xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors">15+</h3>
              <p className="text-zinc-500 text-sm uppercase tracking-widest">Tecnologías Usadas</p>
            </div>
            <div className="group">
              <h3 className="text-5xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors">100%</h3>
              <p className="text-zinc-500 text-sm uppercase tracking-widest">Compromiso</p>
            </div>
          </div>

        </div >
      </div >
    </>
  )
}

export default Skills
