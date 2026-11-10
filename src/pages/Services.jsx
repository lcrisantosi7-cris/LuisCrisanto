import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Server, Cloud, Code2, Database, Camera, Layers, CheckCircle2, ArrowUpRight,
  MessageSquare, FileText, Terminal, Rocket,
} from 'lucide-react'
import SEO from '../components/SEO'
import Spotlight from '../components/Spotlight'

const ease = [0.22, 1, 0.36, 1]
const reveal = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay: d, ease },
})

const MAIN = [
  {
    icon: Server, label: 'Servicio principal', title: 'Backend & APIs', accent: '252 143 84',
    description: 'La lógica de negocio que sostiene tu producto: APIs claras, seguras y pensadas para crecer sin volverse un enredo.',
    features: ['APIs REST bien estructuradas', 'Autenticación con JWT y roles', 'Tiempo real con WebSockets', 'Integración con servicios externos'],
    tech: ['Node.js', 'PHP', 'FastAPI', 'MySQL'],
  },
  {
    icon: Cloud, label: 'Foco actual', title: 'Arquitectura en la nube', accent: '104 103 210',
    description: 'Sistemas diseñados para desplegarse y escalar en la nube, con contenedores y servicios administrados.',
    features: ['Despliegue en AWS', 'Contenedores con Docker', 'Correo y notificaciones con AWS SES', 'Arquitectura pensada para escalar'],
    tech: ['AWS', 'Docker', 'Vercel', 'Render'],
  },
]

const MORE = [
  { icon: Code2, title: 'Desarrollo Full Stack', accent: '252 143 84', description: 'Interfaces en React conectadas a tu backend: paneles administrativos, dashboards y aplicaciones web completas.', tech: ['React', 'Tailwind', 'WebSocket'] },
  { icon: Database, title: 'Datos', accent: '85 70 173', description: 'Modelado relacional, consultas optimizadas y reportes para que la información sea confiable.', tech: ['MySQL', 'SQL Server'] },
  { icon: Camera, title: 'Analítica y visión por computador', accent: '245 82 91', description: 'Detección de personas con cámaras y métricas de afluencia en tiempo real, como en RetailVision.', tech: ['Python', 'YOLOv8', 'OpenCV', 'FastAPI'] },
  { icon: Layers, title: 'Revisión y mejora de código', accent: '104 103 210', description: 'Auditoría, refactorización y ajustes de rendimiento sobre proyectos que ya existen.', tech: ['Refactorización', 'SQL', 'Git'] },
]

const PROCESS = [
  { step: '01', title: 'Entender', desc: 'Conversamos para aclarar qué necesitas, el alcance y los objetivos.', icon: MessageSquare },
  { step: '02', title: 'Diseñar', desc: 'Defino la arquitectura, el stack y el plan de entregas.', icon: FileText },
  { step: '03', title: 'Construir', desc: 'Desarrollo por etapas, con avances que puedes revisar.', icon: Terminal },
  { step: '04', title: 'Desplegar', desc: 'Pruebas finales, puesta en producción y ajustes iniciales.', icon: Rocket },
]

const Tech = ({ list }) => (
  <div className="mt-5 flex flex-wrap gap-2">
    {list.map((t) => (
      <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-ink-200">{t}</span>
    ))}
  </div>
)

export default function Services() {
  return (
    <>
      <SEO
        title="Servicios | Luis Crisanto"
        description="Backend y APIs, arquitectura en la nube, desarrollo full stack, datos y visión por computadora."
        canonical="https://luis-crisanto.vercel.app/servicios"
      />

      <section className="mx-auto max-w-7xl px-6 pt-12">
        <p className="font-mono text-[11px] uppercase tracking-widest text-channel">CAM 05 · Servicios</p>
        <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">
          Cómo puedo <span className="text-channel">ayudarte.</span>
        </h1>
      </section>

      <section className="mx-auto mt-14 grid max-w-7xl gap-6 px-6 lg:grid-cols-2">
        {MAIN.map((s, i) => (
          <motion.div key={s.title} {...reveal(i * 0.1)} style={{ '--ch': s.accent }}>
            <Spotlight className="h-full p-8 md:p-10">
              <div className="flex items-center justify-between">
                <s.icon size={28} className="text-channel" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-channel">{s.label}</span>
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold">{s.title}</h2>
              <p className="mt-3 text-ink-200">{s.description}</p>
              <ul className="mt-6 space-y-3">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-white">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-channel" /> {f}
                  </li>
                ))}
              </ul>
              <Tech list={s.tech} />
            </Spotlight>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto mt-6 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {MORE.map((s, i) => (
          <motion.div key={s.title} {...reveal(i * 0.07)} style={{ '--ch': s.accent }}>
            <Spotlight className="h-full p-6">
              <s.icon size={22} className="text-channel" />
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-200">{s.description}</p>
              <Tech list={s.tech} />
            </Spotlight>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-channel">Proceso</p>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Así trabajamos.</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {PROCESS.map((p, i) => (
            <motion.li key={p.step} {...reveal(i * 0.1)} className="relative border-t border-white/15 pt-6">
              <span className="absolute -top-px left-0 h-px w-12 bg-channel" />
              <span className="font-mono text-xs text-channel">{p.step}</span>
              <p.icon size={22} className="mt-4 text-ink-200" />
              <h3 className="mt-3 font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-200">{p.desc}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mb-28 mt-24 max-w-7xl px-6">
        <Link to="/contacto" data-cursor="HABLEMOS" className="group inline-flex items-center gap-3 font-display text-3xl font-bold transition-colors hover:text-channel md:text-5xl">
          ¿Empezamos? <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={40} />
        </Link>
      </section>
    </>
  )
}