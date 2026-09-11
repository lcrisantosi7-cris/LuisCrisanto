import React from 'react'
import { ArrowUpRight, Terminal } from 'lucide-react'
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
      className="relative pt-20 pb-8 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0d0b14 0%, #090711 55%, #07050d 100%)',
        borderTop: '1px solid rgba(104,103,210,0.12)',
      }}
    >
      {/* Glow decorativo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[220px]
                   blur-3xl pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(ellipse, rgba(104,103,210,0.35) 0%, rgba(252,143,84,0.12) 45%, transparent 75%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ═══════════════════════════════════════════════════════════════
            MAIN FOOTER
        ═══════════════════════════════════════════════════════════════ */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">

          {/* ── BRAND ─────────────────────────────────────────────────── */}
          <div className="md:col-span-6">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group w-fit mb-6"
            >
              <div
                className="p-1.5 rounded-lg transition-all duration-300
                           group-hover:scale-105"
                style={{
                  background: 'rgba(252,143,84,0.08)',
                  border: '1px solid rgba(252,143,84,0.2)',
                }}
              >
                <Terminal
                  size={17}
                  style={{ color: '#FC8F54' }}
                />
              </div>

              <span className="text-lg font-bold font-mono tracking-tighter text-white">
                LC<span style={{ color: '#FC8F54' }}>.dev</span>
              </span>
            </Link>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white max-w-lg leading-tight mb-4">
              Construyo sistemas.
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #FC8F54 0%, #F5525B 50%, #6867D2 100%)',
                }}
              >
                Diseño lo que los hace escalar.
              </span>
            </h3>

            {/* Description */}
            <p
              className="text-sm leading-relaxed max-w-md mb-6"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Ingeniero de Sistemas enfocado en backend, arquitectura de
              software y cloud. Construyo sistemas robustos, escalables y
              preparados para crecer.
            </p>

            {/* Focus */}
            <div className="flex flex-wrap items-center gap-2">
              {['Backend', 'Architecture', 'Cloud'].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-full text-[10px] font-mono
                             uppercase tracking-wider"
                  style={{
                    color: 'rgba(255,255,255,0.45)',
                    background: 'rgba(255,255,255,0.035)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Availability */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mt-6"
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

          {/* ── NAVIGATION ─────────────────────────────────────────────── */}
          <div className="md:col-span-3">
            <h4
              className="font-semibold mb-6 flex items-center gap-2 text-sm"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              <span
                className="h-px w-4"
                style={{ background: '#6867D2' }}
              />
              Explorar
            </h4>

            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group flex items-center gap-2 text-sm transition-all duration-200 w-fit"
                    style={{
                      color: 'rgba(255,255,255,0.35)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#fff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        'rgba(255,255,255,0.35)'
                    }}
                  >
                    <span
                      className="w-0 overflow-hidden transition-all duration-200
                                 group-hover:w-3"
                      style={{ color: '#FC8F54' }}
                    >
                      →
                    </span>

                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── CONNECT ────────────────────────────────────────────────── */}
          <div className="md:col-span-3">
            <h4
              className="font-semibold mb-6 flex items-center gap-2 text-sm"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              <span
                className="h-px w-4"
                style={{ background: '#6867D2' }}
              />
              Conectar
            </h4>

            <SocialFooter />

            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 mt-6 text-sm
                         transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FC8F54'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  'rgba(255,255,255,0.4)'
              }}
            >
              Hablemos sobre un proyecto
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200
                           group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            BOTTOM BAR
        ═══════════════════════════════════════════════════════════════ */}

        <div
          className="pt-7 flex flex-col md:flex-row justify-between
                     items-center gap-4"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >

          {/* Code signature */}
          <p
            className="font-mono text-xs"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            &lt;coded_by /&gt;{' '}
            <span style={{ color: 'rgba(252,143,84,0.7)' }}>
              Luis Crisanto
            </span>
          </p>

          <div
            className="hidden md:block h-px flex-1 mx-8"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(104,103,210,0.2), rgba(252,143,84,0.2), transparent)',
            }}
          />


          {/* Center status */}
          <div className="hidden md:flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: '#FC8F54',
                boxShadow: '0 0 10px rgba(252,143,84,0.6)',
              }}
            />
            <span
              className="font-mono text-[9px] uppercase tracking-[0.25em]"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              Building the next system
            </span>
          </div>


          <div
            className="hidden md:block h-px flex-1 mx-8"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(104,103,210,0.2), rgba(252,143,84,0.2), transparent)',
            }}
          />

          
          {/* Copyright */}
          <p
            className="text-[10px] uppercase tracking-[0.2em] text-center"
            style={{ color: 'rgba(255,255,255,0.15)' }}
          >
            © {currentYear} LC.dev
          </p>
        </div>
      </div>
    </footer>
  )
}
