import React from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'

// ── Datos centralizados ────────────────────────────────────────────────────
// Edita tus links aquí y se propagan a los 3 componentes automáticamente
 const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/lcrisantosi7-cris/',
    icon: Github,
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/luis-crisanto-silupú',
    icon: Linkedin,
    external: true,
  },
  {
    id: 'mail',
    label: 'Email',
    href: 'mailto:lcrisantosi7@gmail.com',
    icon: Mail,
    external: false,
  },
]

// ── Helper: color de hover según red ──────────────────────────────────────
const hoverColor = (id) => ({
  color:       id === 'mail' ? '#FC8F54' : id === 'linkedin' ? '#6867D2' : 'rgba(255,255,255,0.9)',
  borderColor: id === 'mail' ? 'rgba(252,143,84,0.5)' : id === 'linkedin' ? 'rgba(104,103,210,0.5)' : 'rgba(255,255,255,0.25)',
  background:  id === 'mail' ? 'rgba(252,143,84,0.08)' : id === 'linkedin' ? 'rgba(104,103,210,0.08)' : 'rgba(255,255,255,0.06)',
})

const baseStyle = {
  background:   'rgba(255,255,255,0.04)',
  border:       '1px solid rgba(255,255,255,0.1)',
  color:        'rgba(255,255,255,0.35)',
}

const resetStyle = {
  background:   'rgba(255,255,255,0.04)',
  borderColor:  'rgba(255,255,255,0.1)',
  color:        'rgba(255,255,255,0.35)',
}

// ── Wrapper que decide <a> externo o interno ───────────────────────────────
const SocialAnchor = ({ href, external, label, className, style, onMouseEnter, onMouseLeave, children }) =>
  external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  ) : (
    <a
      href={href}
      aria-label={label}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  )

// ══════════════════════════════════════════════════════════════════════════
// 1. SIDEBAR — botones verticales flotantes · solo desktop
//    Uso: <SocialSidebar />  en Home.jsx
// ══════════════════════════════════════════════════════════════════════════
export const SocialSidebar = () => (
  <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4">
    <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/15" />

    {SOCIAL_LINKS.map(({ id, label, href, icon: Icon, external }) => (
      <SocialAnchor
        key={id}
        href={href}
        external={external}
        label={label}
        className="relative group p-2.5 rounded-xl backdrop-blur-sm transition-all duration-300 block"
        style={{ ...baseStyle }}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverColor(id))}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, resetStyle)}
      >
        <Icon size={16} />
        {/* Tooltip izquierda */}
        <span
          className="pointer-events-none absolute right-11 top-1/2 -translate-y-1/2
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     text-[10px] font-mono whitespace-nowrap px-2 py-1 rounded-md"
          style={{
            background: 'rgba(13,11,20,0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          {label}
        </span>
      </SocialAnchor>
    ))}

    <div className="w-px h-16 bg-gradient-to-t from-transparent to-white/15" />
  </div>
)

// ══════════════════════════════════════════════════════════════════════════
// 2. ROW — fila horizontal compacta
//    Uso: <SocialRow size={15} />  en Header.jsx
//         <SocialRow size={18} className="mb-4" />  en mobile nav
// ══════════════════════════════════════════════════════════════════════════
export const SocialRow = ({ size = 18, className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    {SOCIAL_LINKS.map(({ id, label, href, icon: Icon, external }) => (
      <SocialAnchor
        key={id}
        href={href}
        external={external}
        label={label}
        className="p-2 rounded-lg backdrop-blur-sm transition-all duration-250"
        style={{ ...baseStyle }}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverColor(id))}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, resetStyle)}
      >
        <Icon size={size} />
      </SocialAnchor>
    ))}
  </div>
)

// ══════════════════════════════════════════════════════════════════════════
// 3. FOOTER — íconos grandes para el pie de página
//    Uso: <SocialFooter />  en Footer.jsx
// ══════════════════════════════════════════════════════════════════════════
export const SocialFooter = () => (
  <div className="flex gap-3">
    {SOCIAL_LINKS.map(({ id, label, href, icon: Icon, external }) => (
      <SocialAnchor
        key={id}
        href={href}
        external={external}
        label={label}
        className="p-2.5 rounded-xl transition-all duration-300"
        style={{
          background:   'rgba(255,255,255,0.03)',
          border:       '1px solid rgba(255,255,255,0.07)',
          color:        'rgba(255,255,255,0.35)',
        }}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverColor(id))}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, {
          background:   'rgba(255,255,255,0.03)',
          borderColor:  'rgba(255,255,255,0.07)',
          color:        'rgba(255,255,255,0.35)',
        })}
      >
        <Icon size={20} />
      </SocialAnchor>
    ))}
  </div>
)