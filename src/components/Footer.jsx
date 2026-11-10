import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { Logo } from './Header'
import { SocialFooter } from './SocialLinks'
import { CHANNELS, CONTACT } from '../lib/channels'
import { sfx } from '../lib/sound'

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="overflow-hidden border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 pt-20">
        <div
          aria-hidden
          className="select-none whitespace-nowrap text-center font-display text-[17vw] font-black leading-[0.85] text-transparent transition-all duration-700 [-webkit-text-stroke:1px_rgba(255,255,255,0.14)] hover:[-webkit-text-stroke-color:rgb(var(--ch))] lg:text-[13rem]"
        >
          CRISANTO
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" aria-label="Luis Crisanto — Inicio" data-cursor="INICIO" className="inline-flex items-center gap-3 text-white transition-colors hover:text-channel">
              <Logo className="h-6 w-auto" />
              <span className="font-mono text-xs uppercase tracking-[0.25em]">Luis Crisanto</span>
            </Link>
            <p className="mt-5 max-w-xs font-display text-2xl font-bold">Aprendo de todo. Construyo lo que importa.</p>
            <Link to="/contacto" data-cursor="HABLEMOS" className="mt-6 inline-flex items-center gap-2 rounded-full bg-channel px-6 py-3 font-semibold text-ink-950 transition hover:brightness-110">
              Hablemos <ArrowUpRight size={16} />
            </Link>
          </div>

          <nav aria-label="Pie de página" className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-400">Canales</p>
            <ul className="mt-4 space-y-2">
              {[...CHANNELS, CONTACT].map((c) => (
                <li key={c.path}>
                  <Link to={c.path} onMouseEnter={sfx.tick} className="group flex items-baseline gap-3 text-ink-200 transition hover:text-white">
                    <span className="font-mono text-[10px] tracking-widest text-ink-600 transition group-hover:text-channel">{c.cam}</span>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-400">Redes</p>
            <div className="mt-4"><SocialFooter /></div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between gap-4 border-t border-white/10 py-6 font-mono text-[11px] tracking-widest text-ink-400">
          <span>© {year} LUIS CRISANTO</span>
          <button
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); sfx.click() }}
            data-cursor="SUBIR"
            className="inline-flex items-center gap-2 transition hover:text-channel"
          >
            VOLVER ARRIBA <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}