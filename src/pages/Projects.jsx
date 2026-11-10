import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import SEO from '../components/SEO'
import Spotlight from '../components/Spotlight'
import Cover from '../components/Cover'
import { PROJECTS, CHANNEL_LABEL } from '../data/techData'
import { sfx } from '../lib/sound'

const FILTERS = [{ id: 'all', label: 'Todos' }, ...Object.entries(CHANNEL_LABEL).map(([id, label]) => ({ id, label }))]
const STATUS = { dev: 'En desarrollo', production: 'En producción' }
const ease = [0.22, 1, 0.36, 1]

function Card({ p, i }) {
  const wide = p.featured
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: i * 0.06, ease }}
      className={wide ? 'lg:col-span-2' : ''}
      style={{ '--ch': p.accent }}
    >
      <Link to={`/proyectos/${p.slug}`} data-cursor="ABRIR" onMouseEnter={sfx.tick} className="group block h-full">
        <Spotlight className="h-full transition-colors duration-300 group-hover:border-channel/50">
          <div className={`grid h-full ${wide ? 'lg:grid-cols-2' : ''}`}>
            <div className={`relative overflow-hidden bg-ink-800 ${wide ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[340px]' : 'aspect-[16/10]'}`}>
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                <Cover src={p.thumb} alt={p.title} pos={p.thumbPos} icon={p.icon} />
              </div>
              <span className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/10 bg-ink-950/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-200 backdrop-blur">
                <span className={`h-1.5 w-1.5 rounded-full ${p.status === 'dev' ? 'bg-channel' : 'bg-emerald-400'}`} />
                {STATUS[p.status]}
              </span>
              {wide && (
                <span className="absolute right-3 top-3 rounded-full bg-channel px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-950">
                  Estrella
                </span>
              )}
            </div>

            <div className="flex flex-col p-6 md:p-8">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-ink-400">
                <span className="text-channel">{CHANNEL_LABEL[p.channel]}</span>
                <span>{p.year}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">{p.title}</h3>
              <p className="mt-2 text-ink-200">{p.tagline}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.slice(0, 4).map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-ink-200">{t}</span>
                ))}
              </div>
              <span className="mt-auto flex items-center gap-2 pt-6 font-mono text-xs uppercase tracking-widest text-channel">
                Abrir expediente
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Spotlight>
      </Link>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const list = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.channel === filter)
  const count = (id) => (id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.channel === id).length)

  return (
    <>
      <SEO
        title="Proyectos | Luis Crisanto"
        description="Proyectos de Luis Crisanto: visión por computadora, ecommerce y sistemas de gestión."
        canonical="https://luis-crisanto.vercel.app/proyectos"
      />
      <section className="mx-auto max-w-7xl px-6 pb-28 pt-12">
        <p className="font-mono text-[11px] uppercase tracking-widest text-channel">CAM 04 · Expedientes</p>
        <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">
          Lo que he <span className="text-channel">construido.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-ink-200">
          Cada proyecto es un expediente: el problema, la solución y cómo funciona por dentro.
        </p>

        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar proyectos">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => { setFilter(f.id); sfx.click() }}
              onMouseEnter={sfx.tick}
              className="relative rounded-full px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors"
            >
              {filter === f.id && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-channel" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              )}
              <span className={`relative ${filter === f.id ? 'text-ink-950' : 'text-ink-200 hover:text-white'}`}>
                {f.label} <span className="opacity-60">{count(f.id)}</span>
              </span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => <Card key={p.slug} p={p} i={i} />)}
          </AnimatePresence>

          <motion.div layout>
            <Link
              to="/contacto"
              data-cursor="HABLEMOS"
              className="group flex h-full min-h-[240px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/15 p-8 text-center transition-colors hover:border-channel/60"
            >
              <Plus className="text-channel transition-transform duration-500 group-hover:rotate-90" size={32} />
              <span className="font-display text-2xl font-bold">¿Tu proyecto será el siguiente?</span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink-400">Abrir un expediente nuevo</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}