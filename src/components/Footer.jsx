import React from 'react'
import { Github, Linkedin, Mail, ExternalLink, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'

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
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* COLUMNA 1: BRANDING & STATUS */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20 group-hover:border-emerald-500/40 transition-colors">
                <Terminal size={18} className="text-emerald-400" />
              </div>
              <span className="text-xl font-bold font-mono tracking-tighter text-gray-100">
                LC<span className="text-emerald-400">.dev</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              Ingeniero de Sistemas enfocado en construir soluciones escalables y software de alto impacto.
              Transformando lógica compleja en experiencias digitales excepcionales.
            </p>
            {/* Badge de Disponibilidad */}
            <div className="flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Disponible para nuevos proyectos
              </span>
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN RÁPIDA */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="h-px w-4 bg-emerald-500" /> Sitemap
            </h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1 group"
                  >
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: SOCIAL & CONTACTO */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="h-px w-4 bg-emerald-500" /> Conectar
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <a
                  href="https://github.com/lcrisantosi7-cris/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/luis-crisanto-silupú"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:lcrisantosi7@gmail.com"
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
              <p className="text-xs text-zinc-500 italic">Perú</p>
            </div>
          </div>

        </div>

        {/* BARRA INFERIOR DE COPYRIGHT */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-xs font-mono">
            &lt;coded_by /&gt; <span className="text-zinc-300">Luis Crisanto</span>
          </p>
          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em]">
            © {currentYear} LC.dev — Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
