import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Server, Code2, Database, Cloud, X, ArrowUpRight } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { SKILLS, LEARNING_SKILLS, buildProjectCountMap } from '../data/techData'

const CATEGORIES = [
  { id: 'all', name: 'Todo', icon: Layers },
  { id: 'backend', name: 'Backend', icon: Server },
  { id: 'frontend', name: 'Frontend', icon: Code2 },
  { id: 'database', name: 'Bases de datos', icon: Database },
  { id: 'cloud', name: 'Cloud & herramientas', icon: Cloud },
]

// ≥80 Dominio · 60-79 Sólido · <60 Explorando (igual que en Experiencia)
const TIERS = {
  3: { text: 'Dominio', color: '#FC8F54', desc: 'Lo uso con soltura en proyectos' },
  2: { text: 'Sólido', color: '#6867D2', desc: 'Lo uso con confianza' },
  1: { text: 'Explorando', color: 'rgba(255,255,255,0.4)', desc: 'Lo estoy aprendiendo' },
}
const tierOf = (pct) => (pct >= 80 ? 3 : pct >= 60 ? 2 : 1)

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'
const DEVICON_MAP = {
  'Node.js': `${DEVICON}/nodejs/nodejs-original.svg`,
  'Express': `${DEVICON}/express/express-original.svg`,
  'PHP': `${DEVICON}/php/php-original.svg`,
  'Laravel': `${DEVICON}/laravel/laravel-original.svg`,
  'FastAPI': `${DEVICON}/fastapi/fastapi-original.svg`,
  'Python': `${DEVICON}/python/python-original.svg`,
  'React': `${DEVICON}/react/react-original.svg`,
  'Vue.js': `${DEVICON}/vuejs/vuejs-original.svg`,
  'Next.js': `${DEVICON}/nextjs/nextjs-original.svg`,
  'JavaScript': `${DEVICON}/javascript/javascript-original.svg`,
  'TypeScript': `${DEVICON}/typescript/typescript-original.svg`,
  'HTML5/CSS3': `${DEVICON}/html5/html5-original.svg`,
  'Tailwind': `${DEVICON}/tailwindcss/tailwindcss-original.svg`,
  'Tailwind CSS': `${DEVICON}/tailwindcss/tailwindcss-original.svg`,
  'MySQL': `${DEVICON}/mysql/mysql-original.svg`,
  'MySQL / MariaDB': `${DEVICON}/mysql/mysql-original.svg`,
  'SQL Server': `${DEVICON}/microsoftsqlserver/microsoftsqlserver-original.svg`,
  'PostgreSQL': `${DEVICON}/postgresql/postgresql-original.svg`,
  'MongoDB': `${DEVICON}/mongodb/mongodb-original.svg`,
  'Redis': `${DEVICON}/redis/redis-original.svg`,
  'Git': `${DEVICON}/git/git-original.svg`,
  'Git & GitHub': `${DEVICON}/git/git-original.svg`,
  'GitHub': `${DEVICON}/github/github-original.svg`,
  'Docker': `${DEVICON}/docker/docker-original.svg`,
  'AWS': `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  'AWS Services': `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  'Linux': `${DEVICON}/linux/linux-original.svg`,
  'Vercel': `${DEVICON}/vercel/vercel-original.svg`,
  'Postman': `${DEVICON}/postman/postman-original.svg`,
  'Java': `${DEVICON}/java/java-original.svg`,
  'Spring Boot': `${DEVICON}/spring/spring-original.svg`,
  'GraphQL': `${DEVICON}/graphql/graphql-plain.svg`,
  'Kubernetes': `${DEVICON}/kubernetes/kubernetes-original.svg`,
  'Terraform': `${DEVICON}/terraform/terraform-original.svg`,
}

// Logos oscuros que necesitan invertirse sobre fondo oscuro
const NEEDS_INVERT = ['Express', 'GitHub', 'Vercel', 'Next.js']

// ── Nivel en 3 segmentos ────────────────────────────────────────────────────
const TierBar = ({ tier, color }) => (
  <div className="flex gap-1">
    {[1, 2, 3].map((n) => (
      <motion.span
        key={n}
        className="h-1 flex-1 rounded-full origin-left"
        style={{ background: n <= tier ? color : 'rgba(255,255,255,0.08)' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: n * 0.1 }}
      />
    ))}
  </div>
)

// ── Tarjeta de skill ────────────────────────────────────────────────────────
const SkillCard = ({ skill, projectCount, highlighted }) => {
  const tier = tierOf(skill.level)
  const t = TIERS[tier]
  const count = projectCount.get(skill.name) ?? 0
  const logoUrl = DEVICON_MAP[skill.name]
  const invert = NEEDS_INVERT.includes(skill.name)

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="h-full rounded-2xl p-4 flex flex-col"
      style={{
        background: highlighted ? 'rgba(252,143,84,0.07)' : 'rgba(255,255,255,0.025)',
        border: highlighted ? '1px solid rgba(252,143,84,0.45)' : '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt=""
            width={36}
            height={36}
            className="object-contain shrink-0"
            style={{ filter: invert ? 'invert(1) brightness(0.7)' : 'none' }}
            loading="lazy"
          />
        ) : (
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}30` }}
          >
            <skill.icon size={20} style={{ color: skill.color }} />
          </div>
        )}
        <span className="text-sm font-semibold text-white leading-tight">{skill.name}</span>
      </div>

      <div className="mt-auto">
        <span className="block font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: t.color }}>
          {t.text}
        </span>
        <TierBar tier={tier} color={t.color} />

        <div className="mt-3 min-h-[16px]">
          {count > 0 ? (
            <Link
              to={`/projects?tech=${encodeURIComponent(skill.name)}`}
              className="inline-flex items-center gap-1 text-[11px] transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#FC8F54' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
            >
              {count} proyecto{count !== 1 ? 's' : ''} <ArrowUpRight size={11} />
            </Link>
          ) : (
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.15)' }}>—</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchParams, setSearchParams] = useSearchParams()
  const techParam = searchParams.get('tech') || ''
  const clearTech = () => setSearchParams({})
  const projectCount = useMemo(() => buildProjectCountMap(), [])

  useEffect(() => {
    if (!techParam) return
    const skill = SKILLS.find((s) => s.name === techParam)
    if (skill) {
      setActiveCategory(skill.category === 'tools' ? 'cloud' : skill.category)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [techParam])

  const filteredSkills = SKILLS.filter(
    (s) =>
      activeCategory === 'all' ||
      s.category === activeCategory ||
      (activeCategory === 'cloud' && s.category === 'tools'),
  )

  return (
    <>
      <SEO
        title="Habilidades Técnicas | Luis Crisanto"
        description="Stack tecnológico: Node.js, PHP, Python, FastAPI, React, MySQL, AWS y Docker. Nivel por tecnología y proyectos donde las uso."
        canonical="https://luis-crisanto.vercel.app/skills"
        keywords="Habilidades, Skills, Node.js, PHP, Python, FastAPI, React, MySQL, AWS, Docker, Backend, Frontend, Cloud"
      />

      <div className="min-h-screen relative overflow-hidden pt-28 pb-24 px-6" style={{ background: '#0d0b14' }}>
        {/* Fondo */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(104,103,210,0.18) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          }}
        />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none blur-[140px]" style={{ background: 'rgba(104,103,210,0.07)' }} />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full pointer-events-none blur-[130px]" style={{ background: 'rgba(252,143,84,0.06)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* ── ENCABEZADO ── */}
          <header className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                className="h-px w-10 origin-left"
                style={{ background: '#FC8F54' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: 'rgba(252,143,84,0.7)' }}>
                Stack
              </span>
            </div>

            <h1
              className="font-black tracking-tighter leading-[0.9] mb-5"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2.6rem, 8vw, 6.5rem)' }}
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block text-white"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  HABILIDADES
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
                  TÉCNICAS
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg max-w-lg"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Las tecnologías con las que trabajo y qué tan cómodo estoy con cada una.
            </motion.p>
          </header>

          {/* ── BANNER FILTRO ── */}
          <AnimatePresence>
            {techParam && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between mb-8 px-5 py-3 rounded-2xl"
                style={{ background: 'rgba(252,143,84,0.06)', border: '1px solid rgba(252,143,84,0.25)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#FC8F54' }} />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Mostrando: <span className="font-bold font-mono" style={{ color: '#FC8F54' }}>{techParam}</span>
                  </span>
                </div>
                <button
                  onClick={clearTech}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                  style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
                >
                  <X size={12} /> Quitar
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── TABS ── */}
          <div className="flex justify-start mb-6">
            <div
              className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 z-10"
                    style={{ color: active ? '#0d0b14' : 'rgba(255,255,255,0.4)' }}
                  >
                    {active && (
                      <motion.div
                        layoutId="skillTab"
                        className="absolute inset-0 rounded-xl -z-10"
                        style={{ background: 'linear-gradient(90deg, #FC8F54, #F5525B)' }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <cat.icon size={15} />
                    {cat.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── LEYENDA DE NIVELES ── */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 mb-10">
            {[3, 2, 1].map((n) => (
              <div key={n} className="flex items-center gap-3">
                <div className="flex gap-0.5 w-9">
                  {[1, 2, 3].map((s) => (
                    <span
                      key={s}
                      className="h-1 flex-1 rounded-full"
                      style={{ background: s <= n ? TIERS[n].color : 'rgba(255,255,255,0.08)' }}
                    />
                  ))}
                </div>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <span className="font-mono uppercase tracking-wider mr-1.5" style={{ color: TIERS[n].color }}>
                    {TIERS[n].text}
                  </span>
                  {TIERS[n].desc}
                </p>
              </div>
            ))}
          </div>

          {/* ── GRID DE SKILLS ── */}
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-24">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                >
                  <SkillCard skill={skill} projectCount={projectCount} highlighted={techParam === skill.name} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── APRENDIENDO AHORA ── */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(104,103,210,0.25)' }}
          >
            <h2 className="text-2xl font-bold text-white mb-1">Aprendiendo ahora</h2>
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Tecnologías que estoy explorando.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {LEARNING_SKILLS.map((skill) => {
                const logoUrl = DEVICON_MAP[skill.name]
                const invert = NEEDS_INVERT.includes(skill.name)
                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(104,103,210,0.12)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(104,103,210,0.3)'; e.currentTarget.style.background = 'rgba(104,103,210,0.06)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(104,103,210,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                  >
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt=""
                        width={24}
                        height={24}
                        className="object-contain shrink-0"
                        style={{ filter: invert ? 'invert(1) brightness(0.7)' : 'none', opacity: 0.8 }}
                        loading="lazy"
                      />
                    ) : (
                      <skill.icon size={20} style={{ color: 'rgba(104,103,210,0.7)', flexShrink: 0 }} />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: 'rgba(255,255,255,0.75)' }}>
                        {skill.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#6867D2' }} />
                        <span className="text-[9px] uppercase tracking-wider font-bold" style={{ color: 'rgba(104,103,210,0.8)' }}>
                          {skill.status}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.section>
        </div>
      </div>
    </>
  )
}