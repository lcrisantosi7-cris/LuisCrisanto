import React, { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Github, Play } from 'lucide-react'
import SEO from '../components/SEO'
import Spotlight from '../components/Spotlight'
import Cover from '../components/Cover'
import { PROJECTS, CHANNEL_LABEL } from '../data/techData'
import { sfx } from '../lib/sound'
import Layers from '../components/Layers'

const STATUS = { dev: 'En desarrollo', production: 'En producción' }
const ease = [0.22, 1, 0.36, 1]
const reveal = (d = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, delay: d, ease },
})
const isLink = (u) => u && u !== '#'

const Label = ({ children }) => (
    <p className="font-mono text-[11px] uppercase tracking-widest text-channel">{children}</p>
)

function Detail({ p, next, n }) {
    const [shot, setShot] = useState(0)
    const g = p.gallery?.[shot]

    return (
        <article style={{ '--ch': p.accent }} className="pb-28">
            <SEO
                title={`${p.title} | Luis Crisanto`}
                description={p.description}
                canonical={`https://luis-crisanto.vercel.app/proyectos/${p.slug}`}
            />

            {/* Cabecera */}
            <header className="mx-auto max-w-7xl px-6 pt-10">
                <Link to="/proyectos" data-cursor="VOLVER" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-400 transition hover:text-channel">
                    <ArrowLeft size={14} /> Expedientes
                </Link>

                <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-ink-400">
                    <span className="text-channel">EXP-{String(n).padStart(2, '0')}</span>
                    <span>·</span><span>{CHANNEL_LABEL[p.channel]}</span>
                    <span>·</span><span>{p.year}</span>
                    <span>·</span><span>{p.kind}</span>
                    <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                        <span className={`h-1.5 w-1.5 rounded-full ${p.status === 'dev' ? 'bg-channel' : 'bg-emerald-400'}`} />
                        {STATUS[p.status]}
                    </span>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }}
                    className="mt-5 font-display text-5xl font-bold leading-[1.02] md:text-7xl"
                >
                    {p.title}
                </motion.h1>
                <p className="mt-5 max-w-2xl text-xl text-ink-200">{p.tagline}</p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                    {isLink(p.demo) && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" data-cursor="DEMO" className="inline-flex items-center gap-2 rounded-full bg-channel px-6 py-3 font-semibold text-ink-950 transition hover:brightness-110">
                            Ver demo <ArrowUpRight size={16} />
                        </a>
                    )}
                    {p.video && (
                        <a href={p.video} target="_blank" rel="noopener noreferrer" data-cursor="VIDEO" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold transition hover:border-channel hover:text-channel">
                            <Play size={16} /> Ver en video
                        </a>
                    )}
                    {isLink(p.github) && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" data-cursor="CÓDIGO" className="inline-flex items-center gap-2 text-sm font-medium text-ink-200 transition hover:text-channel">
                            <Github size={16} /> Código
                        </a>
                    )}
                </div>
                {p.demoNote && <p className="mt-4 max-w-xl text-sm text-ink-400">{p.demoNote}</p>}
            </header>
            {p.layers && (
                <section className="mx-auto mt-12 max-w-7xl px-6">
                    <motion.div {...reveal()}>
                        <Layers layers={p.layers} title={`${p.title} · en tres capas`} />
                    </motion.div>
                </section>
            )}
            {/* Galería */}
            <section className="mx-auto mt-12 max-w-7xl px-6">
                <motion.div {...reveal()} className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                    <div className="relative aspect-[16/9] bg-ink-800">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={g?.src ?? 'empty'}
                                className="absolute inset-0"
                                initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}
                            >
                                <Cover src={g?.src} alt={g?.caption ?? p.title} pos={g?.pos} icon={p.icon} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {p.gallery?.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto border-t border-white/10 p-3">
                            {p.gallery.map((s, i) => (
                                <button
                                    key={s.src}
                                    onClick={() => { setShot(i); sfx.click() }}
                                    onMouseEnter={sfx.tick}
                                    aria-label={s.caption}
                                    aria-pressed={shot === i}
                                    className={`h-16 w-28 shrink-0 overflow-hidden rounded-md border transition ${shot === i ? 'border-channel' : 'border-white/10 opacity-60 hover:opacity-100'}`}
                                >
                                    <Cover src={s.src} pos={s.pos} />
                                </button>
                            ))}
                            <span className="ml-auto hidden pl-4 font-mono text-[11px] text-ink-400 sm:block">{g?.caption}</span>
                        </div>
                    )}
                </motion.div>
            </section>

            {/* Métricas */}
            {p.metrics && (
                <section className="mx-auto mt-16 max-w-7xl px-6">
                    <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                        {p.metrics.map((m, i) => (
                            <motion.div key={m.l} {...reveal(i * 0.08)} className="bg-ink-950 p-7">
                                <div className="font-display text-4xl font-bold text-channel md:text-5xl">{m.v}</div>
                                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-ink-400">{m.l}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Problema → Solución */}
            {p.problem && (
                <section className="mx-auto mt-20 grid max-w-7xl gap-6 px-6 md:grid-cols-2">
                    <motion.div {...reveal()}>
                        <Spotlight className="h-full p-8">
                            <Label>El problema</Label>
                            <p className="mt-4 font-display text-2xl font-bold leading-snug md:text-3xl">{p.problem}</p>
                        </Spotlight>
                    </motion.div>
                    <motion.div {...reveal(0.1)}>
                        <Spotlight className="h-full p-8">
                            <Label>La solución</Label>
                            <p className="mt-4 text-lg leading-relaxed text-ink-200">{p.solution}</p>
                        </Spotlight>
                    </motion.div>
                </section>
            )}

            {/* Qué hace */}
            {p.highlights && (
                <section className="mx-auto mt-20 max-w-7xl px-6">
                    <Label>Qué hace</Label>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {p.highlights.map((h, i) => (
                            <motion.div key={h} {...reveal(i * 0.07)}>
                                <Spotlight className="h-full p-6">
                                    <span className="font-mono text-xs text-channel">{String(i + 1).padStart(2, '0')}</span>
                                    <p className="mt-3 text-lg text-white">{h}</p>
                                </Spotlight>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Arquitectura */}
            {p.architecture && !p.layers && (
                <section className="mx-auto mt-20 max-w-7xl px-6">
                    <Label>Cómo funciona por dentro</Label>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        {p.architecture.map((node, i) => (
                            <React.Fragment key={node}>
                                <motion.span
                                    {...reveal(i * 0.12)}
                                    className="rounded-lg border border-channel/40 bg-channel/10 px-4 py-2.5 font-mono text-sm text-white"
                                >
                                    {node}
                                </motion.span>
                                {i < p.architecture.length - 1 && (
                                    <motion.span {...reveal(i * 0.12 + 0.06)} aria-hidden className="font-mono text-channel">→</motion.span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </section>
            )}

            {/* Stack */}
            <section className="mx-auto mt-20 max-w-7xl px-6">
                <Label>Stack</Label>
                <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                        <span key={t} className="rounded-full border border-white/10 px-4 py-1.5 font-mono text-xs text-ink-200">{t}</span>
                    ))}
                </div>
            </section>

            {/* Siguiente */}
            <section className="mx-auto mt-24 max-w-7xl px-6">
                <Link to={`/proyectos/${next.slug}`} data-cursor="SIGUIENTE" onMouseEnter={sfx.tick} className="group block" style={{ '--ch': next.accent }}>
                    <Spotlight className="p-8 transition-colors group-hover:border-channel/50 md:p-12">
                        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-400">Siguiente expediente</p>
                        <div className="mt-3 flex items-center justify-between gap-6">
                            <span className="font-display text-3xl font-bold md:text-5xl">{next.title}</span>
                            <ArrowUpRight className="shrink-0 text-channel transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={36} />
                        </div>
                    </Spotlight>
                </Link>
            </section>
        </article>
    )
}

export default function ProjectDetail() {
    const { slug } = useParams()
    const i = PROJECTS.findIndex((p) => p.slug === slug)
    if (i < 0) return <Navigate to="/proyectos" replace />
    return <Detail key={slug} p={PROJECTS[i]} next={PROJECTS[(i + 1) % PROJECTS.length]} n={i + 1} />
}