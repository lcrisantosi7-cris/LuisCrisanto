import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github, ExternalLink, Layout, Terminal,
  Globe, X, ChevronRight, ArrowUpRight,
} from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { PROJECTS, normalizeTag } from '../data/techData'

// ── Ícono de servidor inline ────────────────────────────────────────────────
const ServerIcon = ({ size = 24, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
)

// ── Filtros ─────────────────────────────────────────────────────────────────
const FILTERS = [
  { id: 'all',       label: 'Todos'       },
  { id: 'backend',   label: 'Backend'     },
  { id: 'fullstack', label: 'Full Stack'  },
  { id: 'academic',  label: 'Académico'   },
]

// ── Colores de acento por categoría ────────────────────────────────────────
const categoryAccent = {
  backend:   { color: '#6867D2', glow: 'rgba(104,103,210,0.25)', bg: 'rgba(104,103,210,0.08)' },
  fullstack: { color: '#FC8F54', glow: 'rgba(252,143,84,0.25)',  bg: 'rgba(252,143,84,0.08)'  },
  academic:  { color: '#F5525B', glow: 'rgba(245,82,91,0.25)',   bg: 'rgba(245,82,91,0.08)'   },
}

// ── Thumbnails: coloca el screenshot real en /projects/<slug>.jpg
//    Si no existe, el componente muestra el fallback de gradiente
const getThumb = (project) =>
  project.thumb ?? `/projects/${project.slug ?? project.title.toLowerCase().replace(/\s+/g, '-')}.jpg`

// ══════════════════════════════════════════════════════════════════════════
// MODAL LIGHTBOX
// ══════════════════════════════════════════════════════════════════════════
const ProjectModal = ({ project, onClose }) => {
  const accent = categoryAccent[project.category] ?? categoryAccent.fullstack

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(7,5,16,0.88)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 16 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{    scale: 0.95, opacity: 0, y: 8  }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: '#13101f',
          border:     `1px solid ${accent.color}30`,
          boxShadow:  `0 0 60px ${accent.glow}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Botón cerrar ── */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border:     '1px solid rgba(255,255,255,0.1)',
            color:      'rgba(255,255,255,0.5)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
        >
          <X size={18} />
        </button>

        {/* ── Imagen grande del proyecto ── */}
        <div className="relative w-full overflow-hidden rounded-t-3xl" style={{ height: '280px' }}>
          <ImageWithFallback
            src={getThumb(project)}
            alt={project.title}
            className="w-full h-full object-cover object-top"
            style={{ filter: 'brightness(0.85)' }}
            fallback={
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, #13101f 0%, ${accent.color}18 100%)`,
                }}
              >
                <FallbackVisual project={project} accent={accent} large />
              </div>
            }
          />
          {/* Overlay degradado de imagen a contenido */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 40%, #13101f 100%)',
            }}
          />
          {/* Badge de status sobre la imagen */}
          <div className="absolute top-4 left-4">
            <StatusBadge status={project.status} />
          </div>
        </div>

        {/* ── Contenido del modal ── */}
        <div className="px-7 pb-8 -mt-4 relative">

          {/* Categoría + título */}
          <p
            className="font-mono text-[10px] uppercase tracking-[0.3em] mb-2"
            style={{ color: `${accent.color}90` }}
          >
            {project.category}
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4">
            {project.title}
          </h2>

          {/* Descripción larga — usa project.longDescription si existe, si no la normal */}
          <p
            className="text-base leading-relaxed mb-7"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            {project.longDescription ?? project.description}
          </p>

          {/* Tags de tecnología */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => {
              const canonical = normalizeTag(tag)
              return (
                <Link
                  key={tag}
                  to={`/skills?tech=${encodeURIComponent(canonical)}`}
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
                  style={{
                    background:  `${accent.color}0f`,
                    border:      `1px solid ${accent.color}28`,
                    color:       `${accent.color}cc`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background  = `${accent.color}20`
                    e.currentTarget.style.borderColor = `${accent.color}55`
                    e.currentTarget.style.color       = accent.color
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background  = `${accent.color}0f`
                    e.currentTarget.style.borderColor = `${accent.color}28`
                    e.currentTarget.style.color       = `${accent.color}cc`
                  }}
                >
                  {tag}
                </Link>
              )
            })}
          </div>

          {/* Links GitHub / Demo */}
          <div className="flex flex-wrap gap-3">
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm
                           transition-all duration-250 hover:scale-[1.03] active:scale-95"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border:     '1px solid rgba(255,255,255,0.12)',
                  color:      'rgba(255,255,255,0.75)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
              >
                <Github size={16} /> Ver código
              </a>
            )}
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm
                           transition-all duration-250 hover:scale-[1.03] active:scale-95"
                style={{
                  background: `linear-gradient(90deg, ${accent.color}, ${accent.color}bb)`,
                  color:      '#fff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 20px ${accent.glow}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <ArrowUpRight size={16} /> Ver demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// COMPONENTE: Imagen con fallback
// ══════════════════════════════════════════════════════════════════════════
const ImageWithFallback = ({ src, alt, className, style, fallback }) => {
  const [error, setError] = useState(false)
  if (error) return fallback
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
    />
  )
}

// ══════════════════════════════════════════════════════════════════════════
// COMPONENTE: Visual de fallback cuando no hay screenshot
// ══════════════════════════════════════════════════════════════════════════
const FallbackVisual = ({ project, accent, large = false }) => {
  const Icon = project.icon ?? Terminal
  const size = large ? 48 : 32
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="rounded-2xl flex items-center justify-center"
        style={{
          width:      large ? 72 : 52,
          height:     large ? 72 : 52,
          background: accent.bg,
          border:     `1px solid ${accent.color}35`,
        }}
      >
        <Icon size={size} style={{ color: accent.color }} />
      </div>
      {large && (
        <p
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          screenshot próximamente
        </p>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// COMPONENTE: Badge de status
// ══════════════════════════════════════════════════════════════════════════
const StatusBadge = ({ status }) => {
  const isProduction = status === 'production'
  return (
    <span
      className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
      style={
        isProduction
          ? { background: 'rgba(252,143,84,0.15)', border: '1px solid rgba(252,143,84,0.35)', color: '#FC8F54' }
          : { background: 'rgba(104,103,210,0.15)', border: '1px solid rgba(104,103,210,0.35)', color: '#6867D2' }
      }
    >
      {isProduction ? 'Completado' : 'En desarrollo'}
    </span>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// CARD DE PROYECTO
// ══════════════════════════════════════════════════════════════════════════
const ProjectCard = ({ project, onClick }) => {
  const accent = categoryAccent[project.category] ?? categoryAccent.fullstack

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{    opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: '#13101f',
        border:     '1px solid rgba(255,255,255,0.07)',
      }}
      onClick={() => onClick(project)}
      whileHover={{ y: -4 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${accent.color}40`
        e.currentTarget.style.boxShadow   = `0 8px 32px ${accent.glow}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      {/* ── THUMBNAIL ── */}
      <div className="relative overflow-hidden" style={{ height: '180px' }}>
        <ImageWithFallback
          src={getThumb(project)}
          alt={`Screenshot de ${project.title}`}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          fallback={
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, #0d0b14 0%, ${accent.color}12 100%)`,
              }}
            >
              {/* Patrón de puntos sobre el fallback */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(${accent.color}18 1px, transparent 1px)`,
                  backgroundSize: '18px 18px',
                }}
              />
              <FallbackVisual project={project} accent={accent} />
            </div>
          }
        />

        {/* Overlay degradado sobre thumbnail */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(13,11,20,0.1) 0%, rgba(13,11,20,0.6) 100%)',
          }}
        />

        {/* Badge status */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={project.status} />
        </div>

        {/* "Ver más" hint al hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `${accent.color}12` }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm backdrop-blur-sm"
            style={{
              background: 'rgba(13,11,20,0.75)',
              border:     `1px solid ${accent.color}40`,
              color:      accent.color,
            }}
          >
            Ver detalles <ChevronRight size={15} />
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="p-5 flex flex-col flex-1">
        {/* Categoría label */}
        <p
          className="font-mono text-[9px] uppercase tracking-[0.3em] mb-2"
          style={{ color: `${accent.color}70` }}
        >
          {project.category}
        </p>

        {/* Título */}
        <h3
          className="font-bold text-base leading-tight mb-2 text-white transition-colors duration-200 group-hover:text-white"
          style={{}}
        >
          {project.title}
        </h3>

        {/* Descripción corta */}
        <p
          className="text-sm leading-relaxed mb-5 flex-1 line-clamp-3"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          {project.description}
        </p>

        {/* Tags de tecnología — primeros 4, resto con "+N" */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono"
              style={{
                background:  `${accent.color}0c`,
                border:      `1px solid ${accent.color}22`,
                color:       `${accent.color}99`,
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span
              className="px-2 py-0.5 rounded-md text-[10px] font-mono"
              style={{
                background:  'rgba(255,255,255,0.04)',
                border:      '1px solid rgba(255,255,255,0.08)',
                color:       'rgba(255,255,255,0.3)',
              }}
            >
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Footer: links rápidos */}
        <div
          className="flex items-center gap-2 pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-all duration-200"
              style={{
                color:      'rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.04)',
                border:     '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}
              onClick={(e) => e.stopPropagation()}
              title="Ver código en GitHub"
            >
              <Github size={15} />
            </a>
          )}
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-all duration-200"
              style={{
                color:      `${accent.color}70`,
                background: `${accent.color}08`,
                border:     `1px solid ${accent.color}20`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = accent.color; e.currentTarget.style.borderColor = `${accent.color}50` }}
              onMouseLeave={(e) => { e.currentTarget.style.color = `${accent.color}70`; e.currentTarget.style.borderColor = `${accent.color}20` }}
              onClick={(e) => e.stopPropagation()}
              title="Ver demo en vivo"
            >
              <ExternalLink size={15} />
            </a>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* "Ver más" text link */}
          <span
            className="text-[10px] font-mono flex items-center gap-1 transition-colors duration-200 opacity-0 group-hover:opacity-100"
            style={{ color: accent.color }}
          >
            detalles <ArrowUpRight size={11} />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// PÁGINA PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const techFilter = searchParams.get('tech') ?? ''
  const clearTech  = () => setSearchParams({})

  const openModal  = useCallback((project) => setSelectedProject(project), [])
  const closeModal = useCallback(() => setSelectedProject(null), [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [techFilter])

  const filtered = PROJECTS.filter((p) => {
    const categoryMatch =
      activeFilter === 'all' || p.category === activeFilter || p.type === activeFilter
    const techMatch =
      !techFilter ||
      p.tags.some((tag) => normalizeTag(tag) === techFilter || tag === techFilter)
    return categoryMatch && techMatch
  })

  return (
    <>
      <SEO
        title="Proyectos | Luis Crisanto"
        description="Portfolio de proyectos: APIs REST, sistemas de gestión, dashboards y arquitecturas backend escalables."
        canonical="https://luis-crisanto.vercel.app/projects"
        keywords="Proyectos, Portfolio, APIs REST, Full Stack, Backend, Node.js, PHP, React"
      />

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>

      <div
        className="min-h-screen relative overflow-hidden pt-28 pb-24 px-6"
        style={{ background: '#0d0b14' }}
      >

        {/* ── Fondo: patrón de puntos ── */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(104,103,210,0.2) 1px, transparent 1px)',
            backgroundSize:  '30px 30px',
          }}
        />
        {/* Blooms */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none blur-[150px]"
          style={{ background: 'rgba(252,143,84,0.06)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none blur-[130px]"
          style={{ background: 'rgba(104,103,210,0.07)' }} />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ── ENCABEZADO ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: '#FC8F54' }} />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.35em]"
                style={{ color: 'rgba(252,143,84,0.7)' }}
              >
                ~/projects/portfolio
              </span>
            </div>
            <h1
              className="font-black tracking-tighter leading-[0.88] mb-5"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize:   'clamp(3rem, 9vw, 7rem)',
              }}
            >
              <span className="block text-white">MIS</span>
              <span
                className="block text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #FC8F54 0%, #F5525B 45%, #6867D2 100%)',
                }}
              >
                PROYECTOS
              </span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Desde APIs robustas hasta interfaces modernas — sistemas reales, deployados y funcionales.
            </p>
          </motion.div>

          {/* ── STATS ROW ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {[
              { label: 'Total',       value: PROJECTS.length,                                      icon: <Terminal size={14} /> },
              { label: 'Producción',  value: PROJECTS.filter((p) => p.status === 'production').length, icon: <Globe size={14} /> },
              { label: 'Backend',     value: PROJECTS.filter((p) => p.category === 'backend').length,   icon: <ServerIcon size={14} style={{ display: 'inline' }} /> },
              { label: 'Full Stack',  value: PROJECTS.filter((p) => p.category === 'fullstack').length, icon: <Layout size={14} /> },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 px-5 py-3 rounded-xl backdrop-blur-sm"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border:     '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span style={{ color: 'rgba(252,143,84,0.7)' }}>{s.icon}</span>
                <div>
                  <span className="text-xl font-black text-white font-mono">{s.value}</span>
                  <span
                    className="text-[9px] uppercase tracking-widest ml-2"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── TECH FILTER BANNER ── */}
          <AnimatePresence>
            {techFilter && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between mb-8 px-5 py-3 rounded-2xl"
                style={{
                  background: 'rgba(252,143,84,0.06)',
                  border:     '1px solid rgba(252,143,84,0.25)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#FC8F54' }} />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Filtrando:{' '}
                    <span className="font-bold font-mono" style={{ color: '#FC8F54' }}>
                      {techFilter}
                    </span>
                    {' '}— {filtered.length} proyecto{filtered.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <button
                  onClick={clearTech}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
                  style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
                >
                  <X size={12} /> Quitar filtro
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── TABS DE FILTRO ── */}
          <div className="flex justify-start mb-10">
            <div
              className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border:     '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className="relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-250 z-10"
                  style={{
                    color:      activeFilter === filter.id ? '#0d0b14' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {activeFilter === filter.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl -z-10"
                      style={{
                        background: 'linear-gradient(90deg, #FC8F54, #F5525B)',
                      }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── GRID DE PROYECTOS ── */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  onClick={openModal}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── EMPTY STATE ── */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                No hay proyectos con{' '}
                <span className="font-mono" style={{ color: '#FC8F54' }}>{techFilter}</span>.
              </p>
              <button
                onClick={clearTech}
                className="px-6 py-2 rounded-xl text-sm transition-all duration-200"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  color:  'rgba(255,255,255,0.4)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
              >
                Ver todos los proyectos
              </button>
            </motion.div>
          )}

          {/* ── CTA FINAL ── */}
          <div className="mt-24 text-center">
            <p
              className="mb-6 text-sm"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              ¿Interesado en colaborar o ver el código?
            </p>
            <Link to="/contact">
              <button
                className="px-8 py-4 rounded-2xl font-bold transition-all duration-300
                           hover:scale-[1.04] active:scale-95"
                style={{
                  background: 'linear-gradient(90deg, #FC8F54, #F5525B)',
                  color:      '#fff',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 28px rgba(252,143,84,0.35)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
              >
                Iniciar conversación
              </button>
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}