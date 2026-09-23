import { useState, useEffect, useCallback } from 'react'
import {
  motion, AnimatePresence, animate, useMotionValue, useMotionTemplate,
  useSpring, useTransform, useScroll, useReducedMotion,
} from 'framer-motion'
import {
  Github, ExternalLink, Layout, Terminal, Globe, Hammer,
  X, ChevronRight, ArrowUpRight, ArrowRight,
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
  { id: 'all', label: 'Todos' },
  { id: 'backend', label: 'Backend' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'academic', label: 'Académico' },
  { id: 'wip', label: 'En desarrollo' },
]

// ── Colores de acento por categoría ────────────────────────────────────────
const categoryAccent = {
  backend: { color: '#6867D2', rgb: '104,103,210', glow: 'rgba(104,103,210,0.25)', bg: 'rgba(104,103,210,0.08)' },
  fullstack: { color: '#FC8F54', rgb: '252,143,84', glow: 'rgba(252,143,84,0.25)', bg: 'rgba(252,143,84,0.08)' },
  academic: { color: '#F5525B', rgb: '245,82,91', glow: 'rgba(245,82,91,0.25)', bg: 'rgba(245,82,91,0.08)' },
}
const getAccent = (p) => categoryAccent[p.category] ?? categoryAccent.fullstack

// Screenshot real en /public/projects/<slug>.jpg (si no existe, se muestra el fallback)
const getThumb = (project) =>
  project.thumb ?? `/projects/${project.slug ?? project.title.toLowerCase().replace(/\s+/g, '-')}.jpg`

const inView = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

// ── Contador animado ────────────────────────────────────────────────────────
function Counter({ to }) {
  const reduce = useReducedMotion()
  const mv = useMotionValue(reduce ? to : 0)
  const text = useTransform(mv, (v) => `${Math.round(v)}`)
  return (
    <motion.span
      viewport={{ once: true }}
      onViewportEnter={() => { if (!reduce) animate(mv, to, { duration: 1.2, ease: 'easeOut' }) }}
    >
      {text}
    </motion.span>
  )
}

// ── Hook: tilt 3D + spotlight ───────────────────────────────────────────────
function useTilt(rgb, max = 7) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const gx = useMotionValue(-300)
  const gy = useMotionValue(-300)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 150, damping: 18 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 150, damping: 18 })
  const glow = useMotionTemplate`radial-gradient(320px circle at ${gx}px ${gy}px, rgba(${rgb},0.14), transparent 70%)`

  const handlers = {
    onMouseMove: (e) => {
      const r = e.currentTarget.getBoundingClientRect()
      gx.set(e.clientX - r.left)
      gy.set(e.clientY - r.top)
      if (reduce) return
      mx.set((e.clientX - r.left) / r.width - 0.5)
      my.set((e.clientY - r.top) / r.height - 0.5)
    },
    onMouseLeave: () => {
      mx.set(0)
      my.set(0)
      gx.set(-300)
      gy.set(-300)
    },
  }
  return { rotateX, rotateY, glow, handlers }
}

// ── Visual de fallback (sin screenshot) ─────────────────────────────────────
const FallbackVisual = ({ project, accent, large = false }) => {
  const reduce = useReducedMotion()
  const Icon = project.icon ?? Terminal
  const wip = project.status !== 'production'

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(135deg, #0d0b14 0%, rgba(${accent.rgb},0.14) 100%)` }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(${accent.rgb},0.22) 1px, transparent 1px)`,
          backgroundSize: '18px 18px',
        }}
      />
      {!reduce && (
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, rgba(${accent.rgb},0.7), transparent)` }}
          initial={{ top: '0%' }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
        />
      )}
      <div className="relative flex flex-col items-center gap-3">
        <div
          className="rounded-2xl flex items-center justify-center"
          style={{
            width: large ? 72 : 52,
            height: large ? 72 : 52,
            background: accent.bg,
            border: `1px solid rgba(${accent.rgb},0.35)`,
          }}
        >
          <Icon size={large ? 36 : 26} style={{ color: accent.color }} />
        </div>
        <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.28)' }}>
          {wip ? 'en desarrollo' : 'screenshot próximamente'}
        </p>
      </div>
    </div>
  )
}

// ── Imagen del proyecto con fallback (llena su contenedor relative) ─────────
const ProjectVisual = ({ project, accent, large = false, imgClass = '', imgStyle }) => {
  const [error, setError] = useState(false)
  if (error) return <FallbackVisual project={project} accent={accent} large={large} />
  return (
    <img
      src={getThumb(project)}
      alt={`Screenshot de ${project.title}`}
      className={`absolute inset-0 w-full h-full object-cover object-top ${imgClass}`}
      style={imgStyle}
      onError={() => setError(true)}
    />
  )
}

// ── Badge de status ─────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const isProduction = status === 'production'
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm"
      style={
        isProduction
          ? { background: 'rgba(252,143,84,0.15)', border: '1px solid rgba(252,143,84,0.35)', color: '#FC8F54' }
          : { background: 'rgba(104,103,210,0.15)', border: '1px solid rgba(104,103,210,0.35)', color: '#8f8eea' }
      }
    >
      {!isProduction && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#6867D2' }} />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#6867D2' }} />
        </span>
      )}
      {isProduction ? 'Completado' : 'En desarrollo'}
    </span>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// MODAL — caso de estudio
// Campos opcionales en cada proyecto: problem, solution, architecture (array)
// ══════════════════════════════════════════════════════════════════════════
const ProjectModal = ({ project, onClose }) => {
  const accent = getAccent(project)
  const arch = Array.isArray(project.architecture) ? project.architecture : null

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

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
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 8 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: '#13101f',
          border: `1px solid ${accent.color}30`,
          boxShadow: `0 0 60px ${accent.glow}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 z-10 p-2 rounded-xl transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
        >
          <X size={18} />
        </button>

        {/* Imagen */}
        <div className="relative w-full overflow-hidden rounded-t-3xl" style={{ height: '280px' }}>
          <ProjectVisual project={project} accent={accent} large imgStyle={{ filter: 'brightness(0.85)' }} />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 40%, #13101f 100%)' }}
          />
          <div className="absolute top-4 left-4">
            <StatusBadge status={project.status} />
          </div>
        </div>

        {/* Contenido */}
        <div className="px-7 pb-8 -mt-4 relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: `${accent.color}90` }}>
            {project.category}
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4">{project.title}</h2>

          <p className="text-base leading-relaxed mb-7" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {project.longDescription ?? project.description}
          </p>

          {/* Problema / Solución */}
          {(project.problem || project.solution) && (
            <div className="grid md:grid-cols-2 gap-4 mb-7">
              {project.problem && (
                <div className="p-4 rounded-2xl" style={{ background: 'rgba(104,103,210,0.06)', border: '1px solid rgba(104,103,210,0.2)' }}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] mb-2" style={{ color: 'rgba(104,103,210,0.9)' }}>Problema</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="p-4 rounded-2xl" style={{ background: 'rgba(252,143,84,0.06)', border: '1px solid rgba(252,143,84,0.2)' }}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] mb-2" style={{ color: 'rgba(252,143,84,0.9)' }}>Solución</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{project.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Arquitectura */}
          {arch && (
            <div className="mb-7">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Arquitectura
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {arch.map((step, i) => (
                  <span key={`${step}-${i}`} className="flex items-center gap-2">
                    <span
                      className="px-3 py-1.5 rounded-lg text-xs font-mono"
                      style={{ background: `${accent.color}10`, border: `1px solid ${accent.color}30`, color: accent.color }}
                    >
                      {step}
                    </span>
                    {i < arch.length - 1 && <ArrowRight size={12} style={{ color: 'rgba(255,255,255,0.25)' }} />}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => {
              const canonical = normalizeTag(tag)
              return (
                <Link
                  key={tag}
                  to={`/skills?tech=${encodeURIComponent(canonical)}`}
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
                  style={{ background: `${accent.color}0f`, border: `1px solid ${accent.color}28`, color: `${accent.color}cc` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${accent.color}20`
                    e.currentTarget.style.borderColor = `${accent.color}55`
                    e.currentTarget.style.color = accent.color
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${accent.color}0f`
                    e.currentTarget.style.borderColor = `${accent.color}28`
                    e.currentTarget.style.color = `${accent.color}cc`
                  }}
                >
                  {tag}
                </Link>
              )
            })}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-95"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)' }}
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
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-95"
                style={{ background: `linear-gradient(90deg, ${accent.color}, ${accent.color}bb)`, color: '#fff' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 20px ${accent.glow}` }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
              >
                <ArrowUpRight size={16} /> Ver demo
              </a>
            )}
          </div>
        </div>
      </motion.div >
    </motion.div >
  )
}

// ══════════════════════════════════════════════════════════════════════════
// TARJETA DESTACADA
// ══════════════════════════════════════════════════════════════════════════
const FeaturedCard = ({ project, onClick }) => {
  const accent = getAccent(project)
  const { rotateX, rotateY, glow, handlers } = useTilt(accent.rgb, 4)

  return (
    <motion.div {...inView} className="mb-8" style={{ perspective: '1400px' }}>
      <motion.div
        {...handlers}
        onClick={() => onClick(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(project) } }}
        whileHover={{ borderColor: `rgba(${accent.rgb},0.45)`, boxShadow: `0 20px 60px rgba(${accent.rgb},0.18)` }}
        className="group relative grid lg:grid-cols-5 rounded-3xl overflow-hidden cursor-pointer"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: '#13101f',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ background: glow }} />

        {/* Visual */}
        <div className="lg:col-span-3 relative min-h-[260px] lg:min-h-[380px] overflow-hidden">
          <ProjectVisual
            project={project}
            accent={accent}
            large
            imgClass="transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to right, transparent 55%, #13101f 100%)' }}
          />
        </div>

        {/* Contenido */}
        <div className="lg:col-span-2 relative z-20 p-7 sm:p-9 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: `rgba(${accent.rgb},0.8)` }}>
              Proyecto destacado
            </span>
            <StatusBadge status={project.status} />
          </div>
          <h2
            className="font-black tracking-tight text-white leading-tight mb-3"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
          >
            {project.title}
          </h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono"
                style={{ background: `${accent.color}0c`, border: `1px solid ${accent.color}25`, color: `${accent.color}b0` }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white">
              Ver caso de estudio
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" style={{ color: accent.color }} />
            </span>
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono transition-colors"
                style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accent.color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                <Github size={13} /> GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div >
  )
}

// ══════════════════════════════════════════════════════════════════════════
// CARD DE PROYECTO
// ══════════════════════════════════════════════════════════════════════════
const ProjectCard = ({ project, onClick }) => {
  const accent = getAccent(project)
  const { rotateX, rotateY, glow, handlers } = useTilt(accent.rgb, 7)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group h-full"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        {...handlers}
        onClick={() => onClick(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(project) } }}
        whileHover={{ borderColor: `rgba(${accent.rgb},0.4)`, boxShadow: `0 12px 40px rgba(${accent.rgb},0.2)` }}
        className="relative h-full flex flex-col rounded-2xl overflow-hidden cursor-pointer"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: '#13101f',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ background: glow }} />

        {/* Thumbnail */}
        <div className="relative overflow-hidden" style={{ height: '180px' }}>
          <ProjectVisual
            project={project}
            accent={accent}
            imgClass="transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(13,11,20,0.1) 0%, rgba(13,11,20,0.6) 100%)' }}
          />
          <div className="absolute top-3 left-3 z-20">
            <StatusBadge status={project.status} />
          </div>
          <div
            className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `${accent.color}12` }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm backdrop-blur-sm"
              style={{ background: 'rgba(13,11,20,0.75)', border: `1px solid ${accent.color}40`, color: accent.color }}
            >
              Ver detalles <ChevronRight size={15} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="relative z-20 p-5 flex flex-col flex-1">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] mb-2" style={{ color: `${accent.color}80` }}>
            {project.category}
          </p>
          <h3 className="font-bold text-base leading-tight mb-2 text-white">{project.title}</h3>
          <p className="text-sm leading-relaxed mb-5 flex-1 line-clamp-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono"
                style={{ background: `${accent.color}0c`, border: `1px solid ${accent.color}22`, color: `${accent.color}99` }}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span
                className="px-2 py-0.5 rounded-md text-[10px] font-mono"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}
              >
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200"
                style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
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
                style={{ color: `${accent.color}70`, background: `${accent.color}08`, border: `1px solid ${accent.color}20` }}
                onMouseEnter={(e) => { e.currentTarget.style.color = accent.color; e.currentTarget.style.borderColor = `${accent.color}50` }}
                onMouseLeave={(e) => { e.currentTarget.style.color = `${accent.color}70`; e.currentTarget.style.borderColor = `${accent.color}20` }}
                onClick={(e) => e.stopPropagation()}
                title="Ver demo en vivo"
              >
                <ExternalLink size={15} />
              </a>
            )}
            <div className="flex-1" />
            <span
              className="text-[10px] font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ color: accent.color }}
            >
              detalles <ArrowUpRight size={11} />
            </span>
          </div>
        </div>
      </motion.div >
    </motion.article >
  )
}

// ══════════════════════════════════════════════════════════════════════════
// PÁGINA PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const { scrollY } = useScroll()
  const bloomA = useTransform(scrollY, [0, 1000], [0, -120])
  const bloomB = useTransform(scrollY, [0, 1000], [0, 100])

  const techFilter = searchParams.get('tech') ?? ''
  const clearTech = () => setSearchParams({})

  const openModal = useCallback((project) => setSelectedProject(project), [])
  const closeModal = useCallback(() => setSelectedProject(null), [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [techFilter])

  const filtered = PROJECTS.filter((p) => {
    const categoryMatch =
      activeFilter === 'all' ||
      (activeFilter === 'wip'
        ? p.status !== 'production'
        : p.category === activeFilter || p.type === activeFilter)
    const techMatch =
      !techFilter || p.tags.some((tag) => normalizeTag(tag) === techFilter || tag === techFilter)
    return categoryMatch && techMatch
  })

  // Proyecto destacado: `featured: true` o, si no hay, RetailVision
  const featured =
    PROJECTS.find((p) => p.featured) ?? PROJECTS.find((p) => /retailvision/i.test(p.title))
  const showFeatured = Boolean(featured) && activeFilter === 'all' && !techFilter
  const gridProjects = showFeatured ? filtered.filter((p) => p !== featured) : filtered

  const stats = [
    { label: 'Total', value: PROJECTS.length, icon: <Terminal size={14} /> },
    { label: 'Completados', value: PROJECTS.filter((p) => p.status === 'production').length, icon: <Globe size={14} /> },
    { label: 'En desarrollo', value: PROJECTS.filter((p) => p.status !== 'production').length, icon: <Hammer size={14} /> },
    { label: 'Backend', value: PROJECTS.filter((p) => p.category === 'backend').length, icon: <ServerIcon size={14} style={{ display: 'inline' }} /> },
    { label: 'Full Stack', value: PROJECTS.filter((p) => p.category === 'fullstack').length, icon: <Layout size={14} /> },
  ]

  return (
    <>
      <SEO
        title="Proyectos | Luis Crisanto"
        description="Proyectos de backend, tiempo real y arquitectura cloud: APIs REST, visión por computador y sistemas full stack."
        canonical="https://luis-crisanto.vercel.app/projects"
        keywords="Proyectos, Portfolio, APIs REST, Full Stack, Backend, Cloud, Node.js, FastAPI, React"
      />

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
      </AnimatePresence>

      <div className="min-h-screen relative overflow-hidden pt-28 pb-24 px-6" style={{ background: '#0d0b14' }}>
        {/* Fondo */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(104,103,210,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          }}
        />
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none blur-[150px]"
          style={{ background: 'rgba(252,143,84,0.07)', y: bloomA }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none blur-[130px]"
          style={{ background: 'rgba(104,103,210,0.08)', y: bloomB }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* ── ENCABEZADO ── */}
          <header className="mb-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-5"
            >
              <motion.div
                className="h-px w-10 origin-left"
                style={{ background: '#FC8F54' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: 'rgba(252,143,84,0.7)' }}>
                ~/projects/portfolio
              </span>
            </motion.div>

            <h1
              className="font-black tracking-tighter leading-[0.88] mb-5"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(3rem, 9vw, 7rem)' }}
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block text-white"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  MIS
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
                  PROYECTOS
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg max-w-xl"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Sistemas reales: backend robusto, tiempo real y arquitectura pensada para crecer en la nube.
            </motion.p>
          </header>

          {/* ── STATS ── */}
          <motion.div {...inView} className="flex flex-wrap gap-3 mb-12">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 px-5 py-3 rounded-xl backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <span style={{ color: 'rgba(252,143,84,0.7)' }}>{s.icon}</span>
                <div>
                  <span className="text-xl font-black text-white font-mono">
                    <Counter to={s.value} />
                  </span>
                  <span className="text-[9px] uppercase tracking-widest ml-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── BANNER FILTRO TECH ── */}
          <AnimatePresence>
            {techFilter && (
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
                    Filtrando:{' '}
                    <span className="font-bold font-mono" style={{ color: '#FC8F54' }}>{techFilter}</span>
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

          {/* ── TABS ── */}
          <div className="flex justify-start mb-10">
            <div
              className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className="relative px-5 py-2 rounded-xl text-sm font-medium transition-colors duration-200 z-10"
                  style={{ color: activeFilter === filter.id ? '#0d0b14' : 'rgba(255,255,255,0.4)' }}
                >
                  {activeFilter === filter.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl -z-10"
                      style={{ background: 'linear-gradient(90deg, #FC8F54, #F5525B)' }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── DESTACADO ── */}
          {showFeatured && <FeaturedCard project={featured} onClick={openModal} />}

          {/* ── GRID ── */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {gridProjects.map((project) => (
                <ProjectCard key={project.title} project={project} onClick={openModal} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── ESTADO VACÍO ── */}
          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <p className="mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {techFilter ? (
                  <>
                    No hay proyectos con{' '}
                    <span className="font-mono" style={{ color: '#FC8F54' }}>{techFilter}</span>.
                  </>
                ) : (
                  'No hay proyectos en esta categoría todavía.'
                )}
              </p>
              <button
                onClick={() => { clearTech(); setActiveFilter('all') }}
                className="px-6 py-2 rounded-xl text-sm transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
              >
                Ver todos los proyectos
              </button>
            </motion.div>
          )}

          {/* ── CTA FINAL ── */}
          <motion.div {...inView} className="mt-24 text-center">
            <p className="mb-6 text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
              ¿Interesado en colaborar o ver el código?
            </p>
            <Link to="/contact">
              <button
                className="px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.04] active:scale-95"
                style={{ background: 'linear-gradient(90deg, #FC8F54, #F5525B)', color: '#fff' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 28px rgba(252,143,84,0.35)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
              >
                Iniciar conversación
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  )
}