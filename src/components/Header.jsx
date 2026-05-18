import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Terminal } from 'lucide-react'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Detectar scroll para cambiar el estilo del header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú móvil automáticamente cuando cambia la ruta
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre Mí', path: '/about' },
    { name: 'Experiencia', path: '/experience' },
    { name: 'Proyectos', path: '/projects' },
    { name: 'Habilidades', path: '/skills' },
    { name: 'Servicios', path: '/services' },
  ]

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-zinc-950/80 backdrop-blur-md border-zinc-800 py-3 shadow-lg' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO - Estilo "Code" */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
        >
          <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
            <Terminal size={20} className="text-emerald-400" />
          </div>
          <span className="text-xl font-bold font-mono tracking-tighter text-gray-100">
            LC<span className="text-emerald-400">.dev</span>
          </span>
        </Link>
        
        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-all relative group ${
                location.pathname === link.path 
                  ? 'text-emerald-400' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.name}
              {/* Línea animada debajo del link activo/hover */}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-400 transition-all duration-300 ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}

          {/* Botón CTA destacado para Contacto */}
          <Link 
            to="/contact"
            className="ml-4 px-5 py-2 rounded-full text-sm font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Contacto
          </Link>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE NAV DROPDOWN - Ahora sí es funcional */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-800 transition-all duration-300 ease-in-out overflow-hidden ${
        isMobileMenuOpen ? 'max-h-screen opacity-100 shadow-2xl' : 'max-h-0 opacity-0'
      }`}>
        <nav className="flex flex-col p-6 gap-4">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path}
              className={`text-lg font-medium py-2 border-l-2 pl-4 transition-all ${
                location.pathname === link.path 
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5' 
                  : 'border-transparent text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact"
            className="mt-4 text-center py-3 rounded-lg font-bold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-colors"
          >
            Contáctame
          </Link>
        </nav>
      </div>
    </header>
  )
}