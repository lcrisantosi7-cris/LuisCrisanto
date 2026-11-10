import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-6">
      <SEO title="Página no encontrada | Luis Crisanto" description="Esta página no existe." />
      <p className="text-sm text-ink-400">Error 404</p>
      <h1 className="mt-3 font-display text-6xl font-extrabold leading-none md:text-9xl">
        Aquí no hay <em className="font-serif font-normal italic text-channel">nada.</em>
      </h1>
      <Link to="/" data-cursor="INICIO" className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-channel px-7 py-3.5 font-semibold text-ink-950 transition hover:brightness-110">
        Volver al inicio <ArrowUpRight size={18} />
      </Link>
    </section>
  )
}