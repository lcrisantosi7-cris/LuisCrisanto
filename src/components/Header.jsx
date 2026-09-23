import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Terminal } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SocialRow } from './SocialLinks'

// Ocultar el header al bajar y mostrarlo al subir
const AUTO_HIDE = true

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Sobre Mí', path: '/about' },
  { name: 'Experiencia', path: '/experience' },
  { name: 'Proyectos', path: '/projects' },
  { name: 'Habilidades', path: '/skills' },
  { name: 'Servicios', path: '/services' },
]

const GRADIENT = 'linear-gradient(90deg, #FC8F54, #6867D2)'

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
}

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const reduce = useReducedMotion()
  const location = useLocation()

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
  const contactActive = location.pathname.startsWith('/contact')

  // Scroll: fondo del header + mostrar/ocultar según dirección
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setIsScrolled(y > 20)
        if (AUTO_HIDE && Math.abs(y - lastY) > 6) {
          setHidden(y > lastY && y > 240)
          lastY = y
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Al cambiar de ruta: cerrar menú y mostrar el header
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setHidden(false)
  }, [location.pathname])

  // Menú móvil abierto: bloquear scroll, Escape y cierre al pasar a desktop
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => { if (e.key === 'Escape') setIsMobileMenuOpen(false) }
    const onResize = () => { if (window.innerWidth >= 1024) setIsMobileMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [isMobileMenuOpen])

  const shouldHide = AUTO_HIDE && hidden && !isMobileMenuOpen && !reduce

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: shouldHide ? '-110%' : 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onFocusCapture={() => setHidden(false)}
        className="fixed top-0 w-full z-50 transition-[padding,background-color,border-color] duration-300"
        style={{
          borderBottom: isScrolled || isMobileMenuOpen ? '1px solid rgba(104,103,210,0.15)' : '1px solid transparent',
          background: isScrolled || isMobileMenuOpen ? 'rgba(13,11,20,0.85)' : 'transparent',
          backdropFilter: isScrolled || isMobileMenuOpen ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled || isMobileMenuOpen ? 'blur(16px)' : 'none',
          padding: isScrolled ? '12px 0' : '20px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          {/* ── LOGO ── */}
          <Link to="/" aria-label="LC.dev — Inicio" className="flex items-center gap-2.5 group">
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

          {/* ── NAV DESKTOP (desde lg) ── */}
          <nav aria-label="Principal" className="hidden lg:flex items-center gap-6 xl:gap-7">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={active ? 'page' : undefined}
                  className="relative group text-sm font-medium transition-colors duration-200"
                  style={{ color: active ? '#FC8F54' : 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.9)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = active ? '#FC8F54' : 'rgba(255,255,255,0.5)' }}
                >
                  {link.name}

                  {/* Subrayado activo: se desliza entre links */}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: GRADIENT }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}

                  {/* Subrayado hover */}
                  {!active && (
                    <span
                      className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                      style={{ background: GRADIENT }}
                    />
                  )}
                </Link>
              )
            })}

            {/* Redes: solo desde xl para que todo quepa */}
            <div className="hidden xl:flex items-center gap-6">
              <div className="w-px h-5 bg-white/10" />
              <SocialRow size={15} />
            </div>

            {/* CTA Contacto */}
            <Link
              to="/contact"
              aria-current={contactActive ? 'page' : undefined}
              className="ml-1 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.04] active:scale-95"
              style={{
                background: 'linear-gradient(90deg, #FC8F54, #F5525B)',
                color: '#fff',
                boxShadow: contactActive ? '0 0 22px rgba(252,143,84,0.35)' : 'none',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 22px rgba(252,143,84,0.45)' }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = contactActive ? '0 0 22px rgba(252,143,84,0.35)' : 'none'
              }}
            >
              Contacto
            </Link>
          </nav>

          {/* ── BOTÓN MÓVIL ── */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg transition-all duration-200"
            style={{
              color: 'rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMobileMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* ── MENÚ MÓVIL ── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden absolute top-full left-0 w-full"
              style={{
                background: 'rgba(13,11,20,0.97)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(104,103,210,0.15)',
              }}
            >
              <motion.nav
                aria-label="Menú móvil"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col p-6 gap-2 max-h-[calc(100vh-72px)] overflow-y-auto"
              >
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.path)
                  return (
                    <motion.div key={link.path} variants={itemVariants}>
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className="block text-base font-medium py-3 pl-4 rounded-lg transition-all duration-200"
                        style={{
                          borderLeft: active ? '2px solid #FC8F54' : '2px solid transparent',
                          color: active ? '#FC8F54' : 'rgba(255,255,255,0.55)',
                          background: active ? 'rgba(252,143,84,0.05)' : 'transparent',
                        }}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                })}

                <motion.div
                  variants={itemVariants}
                  className="pt-3 mt-2"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <SocialRow size={18} className="mb-4" />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center py-3 rounded-xl font-bold transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg, #FC8F54, #F5525B)', color: '#fff' }}
                  >
                    Contáctame
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Fondo oscurecido: fuera del header porque backdrop-filter rompe los elementos fixed hijos */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 z-40"
            style={{ background: 'rgba(7,5,16,0.6)' }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  )
}