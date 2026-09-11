import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Terminal } from 'lucide-react'
import { SocialRow } from './SocialLinks'   // ← import corregido

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre Mí', path: '/about' },
    { name: 'Experiencia', path: '/experience' },
    { name: 'Proyectos', path: '/projects' },
    { name: 'Habilidades', path: '/skills' },
    { name: 'Servicios', path: '/services' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        borderBottom: isScrolled ? '1px solid rgba(104,103,210,0.15)' : '1px solid transparent',
        background: isScrolled ? 'rgba(13,11,20,0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        padding: isScrolled ? '12px 0' : '20px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* ── LOGO ──────────────────────────────────────────────────── */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="p-2 rounded-lg transition-all duration-300"
            style={{ background: 'rgba(252,143,84,0.08)', border: '1px solid rgba(252,143,84,0.2)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(252,143,84,0.5)'
              e.currentTarget.style.background = 'rgba(252,143,84,0.14)'
              e.currentTarget.style.boxShadow = '0 0 14px rgba(252,143,84,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(252,143,84,0.2)'
              e.currentTarget.style.background = 'rgba(252,143,84,0.08)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <Terminal size={18} style={{ color: '#FC8F54' }} />
          </div>
          <span className="text-xl font-bold font-mono tracking-tighter text-white">
            LC<span style={{ color: '#FC8F54' }}>.dev</span>
          </span>
        </Link>

        {/* ── DESKTOP NAV ───────────────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative group text-sm font-medium transition-colors duration-200"
              style={{ color: isActive(link.path) ? '#FC8F54' : 'rgba(255,255,255,0.5)' }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isActive(link.path) ? '#FC8F54' : 'rgba(255,255,255,0.5)'
              }}
            >
              {link.name}
              {/* Línea activa */}
              <span
                className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                style={{
                  width: isActive(link.path) ? '100%' : '0%',
                  background: 'linear-gradient(90deg, #FC8F54, #6867D2)',
                }}
              />
              {/* Línea hover */}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{
                  background: 'linear-gradient(90deg, #FC8F54, #6867D2)',
                  opacity: isActive(link.path) ? 0 : 1,
                }}
              />
            </Link>
          ))}

          {/* Separador */}
          <div className="w-px h-5 bg-white/10" />

          {/* Social compactos — reutiliza SocialRow */}
          <SocialRow size={15} />

          {/* CTA Contacto */}
          <Link
            to="/contact"
            className="ml-1 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
                       hover:scale-[1.04] active:scale-95"
            style={{ background: 'linear-gradient(90deg, #FC8F54, #F5525B)', color: '#fff' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 22px rgba(252,143,84,0.45)' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
          >
            Contacto
          </Link>
        </nav>

        {/* ── MOBILE BUTTON ─────────────────────────────────────────── */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg transition-all duration-200"
          style={{
            color: 'rgba(255,255,255,0.5)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── MOBILE DROPDOWN ───────────────────────────────────────────── */}
      <div
        className="md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isMobileMenuOpen ? '600px' : '0px',
          opacity: isMobileMenuOpen ? 1 : 0,
          background: 'rgba(13,11,20,0.97)',
          backdropFilter: 'blur(16px)',
          borderBottom: isMobileMenuOpen ? '1px solid rgba(104,103,210,0.15)' : 'none',
        }}
      >
        <nav className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium py-3 pl-4 rounded-lg transition-all duration-200"
              style={{
                borderLeft: isActive(link.path) ? '2px solid #FC8F54' : '2px solid transparent',
                color: isActive(link.path) ? '#FC8F54' : 'rgba(255,255,255,0.5)',
                background: isActive(link.path) ? 'rgba(252,143,84,0.05)' : 'transparent',
              }}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-3 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <SocialRow size={18} className="mb-4" />
          </div>

          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-center py-3 rounded-xl font-bold transition-all duration-300"
            style={{ background: 'linear-gradient(90deg, #FC8F54, #F5525B)', color: '#fff' }}
          >
            Contáctame
          </Link>
        </nav>
      </div>
    </header>
  )
}