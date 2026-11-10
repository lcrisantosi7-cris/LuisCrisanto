import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Download } from 'lucide-react'
import SEO from '../components/SEO'
import Spotlight from '../components/Spotlight'

const INTRO_VIDEO = '' // cuando lo tengas: '/intro.mp4' (se ve en bucle, sin sonido)
const LEMA = 'Aprendo de todo. Construyo lo que importa.'

const ease = [0.22, 1, 0.36, 1]
const reveal = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay: d, ease },
})

const FACTS = [
  ['Sujeto', 'Luis Crisanto'],
  ['Rol', 'Full Stack · Cloud'],
  ['Enfoque', 'Visión por computadora'],
  ['Estado', 'Disponible'],
]

const TRAITS = [
  { n: '01', t: 'Disponible', d: 'Listo para sumarme a tu equipo o a tu proyecto, desde ya.' },
  { n: '02', t: 'Apasionado', d: 'Cada proyecto lo trabajo como si fuera el único.' },
  { n: '03', t: 'Aprende rápido', d: 'Entro a un tema nuevo y en poco tiempo ya estoy construyendo.' },
]

const LEARNING = ['AWS y servicios cloud', 'Arquitectura de software', 'Docker y contenedores', 'APIs escalables']


function Word({ children, range, progress }) {
  const o = useTransform(progress, range, [0.15, 1])
  return <motion.span style={{ opacity: o }} className="mr-[0.25em] inline-block">{children}</motion.span>
}

function ScrollWords({ text }) {
  const ref = useRef(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })
  const words = text.split(' ')
  return (
    <p ref={ref} aria-label={text} className="font-display text-4xl font-bold leading-tight md:text-7xl">
      {words.map((w, i) =>
        still ? (
          <span key={i} className="mr-[0.25em] inline-block">{w}</span>
        ) : (
          <Word key={i} range={[i / words.length, (i + 1) / words.length]} progress={scrollYProgress}>{w}</Word>
        ),
      )}
    </p>
  )
}

export default function About() {
  return (
    <>
      <SEO
        title="Sobre mí | Luis Crisanto"
        description="Luis Crisanto: desarrollador Full Stack disponible, apasionado y de aprendizaje rápido."
        canonical="https://luis-crisanto.vercel.app/sobre-mi"
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pt-12 lg:grid-cols-12">
        {/* Ficha */}
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <motion.div {...reveal()}>
            <Spotlight className="p-4">
              <div className="relative aspect-[447/413] overflow-hidden rounded-xl bg-ink-800">
                <img src="/me.webp" alt="Luis Crisanto" className="h-full w-full object-contain" />
              </div>
              <dl className="mt-4 divide-y divide-white/5 font-mono text-xs">
                {FACTS.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-2.5">
                    <dt className="uppercase tracking-widest text-ink-400">{k}</dt>
                    <dd className="flex items-center gap-2 text-white">
                      {k === 'Estado' && <span className="h-1.5 w-1.5 rounded-full bg-channel" />}
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Spotlight>
          </motion.div>
        </div>

        {/* Texto */}
        <div className="lg:col-span-7">
          <p className="font-mono text-[11px] uppercase tracking-widest text-channel">CAM 02 · Sobre mí</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] md:text-7xl">
            Entiendo cómo funciona. <span className="text-channel">Lo hago funcionar mejor.</span>
          </h1>

          <div className="mt-12 space-y-4">
            {TRAITS.map((t, i) => (
              <motion.div key={t.n} {...reveal(i * 0.08)}>
                <Spotlight className="p-6 md:p-8">
                  <div className="flex items-start gap-6">
                    <span className="font-mono text-sm text-channel">{t.n}</span>
                    <div>
                      <h2 className="font-display text-2xl font-bold md:text-3xl">{t.t}</h2>
                      <p className="mt-2 text-ink-200">{t.d}</p>
                    </div>
                  </div>
                </Spotlight>
              </motion.div>
            ))}
          </div>

          <motion.div {...reveal()} className="mt-12">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-400">Aprendiendo ahora</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {LEARNING.map((l) => (
                <li key={l} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-ink-200">{l}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...reveal()} className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/contacto" data-cursor="HABLEMOS" className="inline-flex items-center gap-2 rounded-full bg-channel px-7 py-3.5 font-semibold text-ink-950 transition hover:brightness-110">
              Hablemos <ArrowUpRight size={18} />
            </Link>
            <a
              href="/cv-luis-crisanto.pdf"
              download="CV_Luis_Crisanto.pdf"
              data-cursor="CV"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold transition hover:border-channel hover:text-channel"
            >
              <Download size={16} /> Descargar CV
            </a>
          </motion.div>
        </div>
      </section>

      {INTRO_VIDEO && (
        <section className="mx-auto mt-24 max-w-5xl px-6">
          <motion.div {...reveal()} className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
            <video src={INTRO_VIDEO} poster="/me.webp" autoPlay muted loop playsInline className="aspect-video w-full object-cover" />
          </motion.div>
        </section>
      )}

      <section className="mx-auto my-32 max-w-6xl px-6">
        <ScrollWords text={LEMA} />
      </section>
    </>
  )
}