import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Server, Code2, Database, Cloud, Terminal, X, ArrowUpRight } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { SKILLS, LEARNING_SKILLS, buildProjectCountMap } from '../data/techData'

const CATEGORIES = [
  { id: 'all',      name: 'Stack Completo', icon: Layers   },
  { id: 'backend',  name: 'Backend & API',  icon: Server   },
  { id: 'frontend', name: 'Frontend & UI',  icon: Code2    },
  { id: 'database', name: 'Data Store',     icon: Database },
  { id: 'cloud',    name: 'DevOps & Cloud', icon: Cloud    },
]

const levelLabel = (pct) => {
  if (pct >= 85) return { text: 'Expert',    color: '#FC8F54' }
  if (pct >= 70) return { text: 'Mastering', color: '#6867D2' }
  if (pct >= 50) return { text: 'Sólido',    color: '#a5a4e8' }
  return              { text: 'Learning',   color: 'rgba(255,255,255,0.35)' }
}

const DEVICON_MAP = {
  'Node.js':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Express':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'PHP':          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'Laravel':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
  'FastAPI':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  'Python':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'React':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Vue.js':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  'JavaScript':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'TypeScript':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Tailwind':     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'MySQL':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'SQL Server':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg',
  'PostgreSQL':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'MongoDB':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'Git':          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'Docker':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'AWS':          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'Linux':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  'Vercel':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
  'GitHub':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  'Postman':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
  'VS Code':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  'Java':         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'Spring Boot':  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  'Redis':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  'GraphQL':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  'Kubernetes':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg',
  'Terraform':    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
}

const FlipCard = ({ skill, projectCount, isHighlighted }) => {
  const [flipped, setFlipped] = useState(false)
  const label   = levelLabel(skill.level)
  const count   = projectCount.get(skill.name) ?? 0
  const logoUrl = DEVICON_MAP[skill.name]

  useEffect(() => {
    if (isHighlighted) setFlipped(true)
  }, [isHighlighted])

  const needsInvert = ['Express', 'GitHub', 'Vercel'].includes(skill.name)

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ perspective: '900px', height: '148px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => !isHighlighted && setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'absolute', inset: 0 }}
      >
        {/* FRENTE */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3 p-4"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: isHighlighted ? 'rgba(252,143,84,0.07)' : 'rgba(255,255,255,0.025)',
            border: isHighlighted ? '1px solid rgba(252,143,84,0.4)' : '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={skill.name}
              width={40}
              height={40}
              className="object-contain"
              style={{ filter: needsInvert ? 'invert(1) brightness(0.7)' : 'none' }}
              loading="lazy"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}30` }}
            >
              <skill.icon size={22} style={{ color: skill.color }} />
            </div>
          )}
          <span className="text-xs font-semibold text-center leading-tight" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {skill.name}
          </span>
        </div>

        {/* DORSO */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col justify-between p-4"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${skill.color}12, rgba(13,11,20,0.95))`,
            border: `1px solid ${skill.color}35`,
          }}
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold text-white leading-tight">{skill.name}</span>
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{ color: label.color, background: `${label.color}15`, border: `1px solid ${label.color}30` }}
            >
              {label.text}
            </span>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>nivel</span>
              <span className="font-mono text-sm font-black" style={{ color: label.color }}>{skill.level}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}70)`, boxShadow: `0 0 8px ${skill.color}50` }}
                initial={{ width: 0 }}
                animate={{ width: flipped ? `${skill.level}%` : 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
              />
            </div>
          </div>

          {count > 0 ? (
            <Link
              to={`/projects?tech=${encodeURIComponent(skill.name)}`}
              className="flex items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.25)' }}>proyectos</span>
              <span
                className="flex items-center gap-1 text-xs font-bold font-mono transition-colors duration-200"
                style={{ color: `${skill.color}90` }}
                onMouseEnter={(e) => { e.currentTarget.style.color = skill.color }}
                onMouseLeave={(e) => { e.currentTarget.style.color = `${skill.color}90` }}
              >
                {count} <ArrowUpRight size={11} />
              </span>
            </Link>
          ) : (
            <span className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.15)' }}>en aprendizaje</span>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchParams, setSearchParams]     = useSearchParams()
  const techParam = searchParams.get('tech') || ''
  const clearTech = () => setSearchParams({})
  const projectCount = useMemo(() => buildProjectCountMap(), [])

  useEffect(() => {
    if (!techParam) return
    const skill = SKILLS.find((s) => s.name === techParam)
    if (skill) {
      const cat = skill.category === 'tools' ? 'cloud' : skill.category
      setActiveCategory(cat)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [techParam]) // eslint-disable-line

  const filteredSkills = SKILLS.filter(
    (s) => activeCategory === 'all' || s.category === activeCategory || (activeCategory === 'cloud' && s.category === 'tools'),
  )

  return (
    <>
      <SEO
        title="Habilidades Técnicas | Luis Crisanto"
        description="Stack tecnológico: Node.js, PHP, React, MySQL, AWS, Docker. Nivel de dominio por tecnología."
        canonical="https://luis-crisanto.vercel.app/skills"
        keywords="Habilidades, Skills, Node.js, PHP, React, MySQL, AWS, Docker, Frontend, Backend, DevOps"
      />
      <div className="min-h-screen relative overflow-hidden pt-28 pb-24 px-6" style={{ background: '#0d0b14' }}>

        <div className="absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(rgba(104,103,210,0.18) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none blur-[140px]" style={{ background: 'rgba(104,103,210,0.07)' }} />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full pointer-events-none blur-[130px]" style={{ background: 'rgba(252,143,84,0.06)' }} />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ENCABEZADO */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: '#FC8F54' }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: 'rgba(252,143,84,0.7)' }}>Stack Tecnológico</span>
            </div>
            <h1 className="font-black tracking-tighter leading-[0.88] mb-5" style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(3rem, 9vw, 7rem)' }}>
              <span className="block text-white">ARSENAL</span>
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #FC8F54 0%, #F5525B 45%, #6867D2 100%)' }}>TÉCNICO</span>
            </h1>
            <p className="text-lg max-w-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Tecnologías que uso en producción — pasa el cursor sobre cada una para ver el nivel.
            </p>
          </motion.div>

          {/* BANNER TECH FILTER */}
          <AnimatePresence>
            {techParam && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between mb-10 px-5 py-3 rounded-2xl"
                style={{ background: 'rgba(252,143,84,0.06)', border: '1px solid rgba(252,143,84,0.25)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FC8F54' }} />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Mostrando: <span className="font-bold font-mono" style={{ color: '#FC8F54' }}>{techParam}</span>
                  </span>
                </div>
                <button onClick={clearTech} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                  style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
                >
                  <X size={12} /> Quitar
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TABS */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-250"
                  style={{
                    background:  active ? 'rgba(252,143,84,0.1)'           : 'rgba(255,255,255,0.03)',
                    border:      active ? '1px solid rgba(252,143,84,0.4)' : '1px solid rgba(255,255,255,0.07)',
                    color:       active ? '#FC8F54'                        : 'rgba(255,255,255,0.4)',
                    boxShadow:   active ? '0 0 16px rgba(252,143,84,0.12)' : 'none',
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
                >
                  <cat.icon size={15} />
                  {cat.name}
                </button>
              )
            })}
          </div>

          {/* ICON WALL */}
          <motion.div layout className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 mb-20">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div key={skill.name} layout initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.25 }}>
                  <FlipCard skill={skill} projectCount={projectCount} isHighlighted={techParam === skill.name} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* STATS DE NIVEL */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
              { value: SKILLS.filter((s) => levelLabel(s.level).text === 'Expert').length,    label: 'Expert',    color: '#FC8F54' },
              { value: SKILLS.filter((s) => levelLabel(s.level).text === 'Mastering').length, label: 'Mastering', color: '#6867D2' },
              { value: SKILLS.filter((s) => levelLabel(s.level).text === 'Sólido').length,    label: 'Sólido',    color: '#a5a4e8' },
              { value: SKILLS.filter((s) => levelLabel(s.level).text === 'Learning').length,  label: 'Learning',  color: 'rgba(255,255,255,0.35)' },
            ].map((s) => (
              <div key={s.label} className="text-center rounded-2xl py-6 px-4" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                <p className="text-4xl font-black font-mono mb-1" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[9px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* R&D LAB */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(104,103,210,0.25)' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none blur-[80px]" style={{ background: 'rgba(104,103,210,0.08)', transform: 'translate(30%, -30%)' }} />
            <div className="relative p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-bold uppercase tracking-wider"
                style={{ background: 'rgba(104,103,210,0.1)', border: '1px solid rgba(104,103,210,0.3)', color: '#6867D2' }}>
                <Terminal size={12} /> R&amp;D Lab
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Próximos Objetivos</h2>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Tecnologías en fase de exploración activa</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {LEARNING_SKILLS.map((skill, i) => {
                  const logoUrl = DEVICON_MAP[skill.name]
                  return (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(104,103,210,0.12)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(104,103,210,0.3)'; e.currentTarget.style.background = 'rgba(104,103,210,0.06)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(104,103,210,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                    >
                      {logoUrl ? (
                        <img src={logoUrl} alt={skill.name} width={24} height={24} className="object-contain shrink-0"
                          style={{ filter: skill.name === 'GitHub' ? 'invert(1) brightness(0.6)' : 'none', opacity: 0.7 }} loading="lazy" />
                      ) : (
                        <skill.icon size={20} style={{ color: 'rgba(104,103,210,0.6)', flexShrink: 0 }} />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: 'rgba(255,255,255,0.7)' }}>{skill.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#6867D2' }} />
                          <span className="text-[9px] uppercase tracking-wider font-bold" style={{ color: 'rgba(104,103,210,0.7)' }}>{skill.status}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* FOOTER STATS */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-12 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {[
              { value: '2+',                    label: 'Años aprendiendo' },
              { value: `${SKILLS.length}+`,     label: 'Tecnologías'     },
              { value: '100%',                  label: 'Compromiso'      },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-black font-mono mb-2"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', background: 'linear-gradient(90deg, #FC8F54, #6867D2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {s.value}
                </p>
                <p className="text-[9px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}