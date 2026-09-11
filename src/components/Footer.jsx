import React from 'react'
import { ExternalLink, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SocialFooter } from './SocialLinks'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { label: 'Sobre Mí', path: '/about' },
    { label: 'Experiencia', path: '/experience' },
    { label: 'Proyectos', path: '/projects' },
    { label: 'Habilidades', path: '/skills' },
    { label: 'Servicios', path: '/services' },
    { label: 'Contacto', path: '/contact' },
  ]

  return (
    <footer
      className="pt-16 pb-8"
      style={{
        background: 'linear-gradient(to bottom, #0d0b14, #080610)',
        borderTop: '1px solid rgba(104,103,210,0.12)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* ── COL 1: BRANDING ─────────────────────────────────────────── */}
          <div className="col-span-1 md:col-span-2 space-y-5">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div
                className="p-1.5 rounded-lg transition-all duration-300"
                style={{
                  background: 'rgba(252,143,84,0.08)',
                  border: '1px solid rgba(252,143,84,0.2)',
                }}
              >
                <Terminal size={17} style={{ color: '#FC8F54' }} />
              </div>
              <span className="text-lg font-bold font-mono tracking-tighter text-white">
                LC<span style={{ color: '#FC8F54' }}>.dev</span>
              </span>
            </Link>

            {/* Descripción */}
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Ingeniero de Sistemas enfocado en construir soluciones escalables y software de alto impacto.
              Transformando lógica compleja en experiencias digitales excepcionales.
            </p>

            {/* Badge disponibilidad */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(252,143,84,0.06)',
                border: '1px solid rgba(252,143,84,0.2)',
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
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: '#ffb388' }}
              >
                Disponible para nuevos proyectos
              </span>
            </div>
          </div>

          {/* ── COL 2: SITEMAP ──────────────────────────────────────────── */}
          <div>
            <h4
              className="font-semibold mb-6 flex items-center gap-2 text-sm"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              {/* Acento índigo en el dash */}
              <span className="h-px w-4" style={{ background: '#6867D2' }} />
              Sitemap
            </h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-1.5 group transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#FC8F54' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
                  >
                    <ExternalLink
                      size={11}
                      className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 3: SOCIAL ───────────────────────────────────────────── */}
          <div>
            <h4
              className="font-semibold mb-6 flex items-center gap-2 text-sm"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              <span className="h-px w-4" style={{ background: '#6867D2' }} />
              Conectar
            </h4>

            {/* Usa el componente centralizado */}
            <SocialFooter />

            <p className="text-xs mt-4 italic" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Lima, Perú 🇵🇪
            </p>
          </div>

        </div>

        {/* ── BARRA INFERIOR ────────────────────────────────────────────── */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            &lt;coded_by /&gt;{' '}
            <span style={{ color: 'rgba(252,143,84,0.7)' }}>Luis Crisanto</span>
          </p>
          {/* Línea decorativa central — solo desktop */}
          <div
            className="hidden md:block h-px flex-1 mx-8"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(104,103,210,0.2), rgba(252,143,84,0.2), transparent)',
            }}
          />
          <p
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ color: 'rgba(255,255,255,0.15)' }}
          >
            © {currentYear} LC.dev — Todos los derechos reservados
          </p>
        </div>

      </div>
    </footer>
  )
}