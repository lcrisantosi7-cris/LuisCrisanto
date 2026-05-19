import React from 'react'
import { motion } from 'framer-motion'
import {
  Server, Code2, Database, Cloud, Layers, Zap,
  CheckCircle2, ArrowRight, MessageSquare, FileText,
  Terminal, Rocket, ShieldCheck, Clock, Users
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const Services = () => {
  const services = [
    {
      icon: Server,
      title: 'Arquitectura Backend',
      description: 'Desarrollo de núcleos lógicos robustos. Priorizo la seguridad, la escalabilidad y la limpieza del código.',
      features: [
        'APIs RESTful & GraphQL',
        'Microservicios con Spring Boot',
        'Autenticación OAuth2 / JWT',
        'Integración de Pasarelas de Pago'
      ],
      technologies: ['Node.js', 'Spring Boot', 'PHP', 'Swagger'],
      color: 'text-emerald-400'
    },
    {
      icon: Database,
      title: 'Ingeniería de Datos',
      description: 'Diseño de esquemas eficientes para asegurar la integridad y velocidad de acceso a la información.',
      features: [
        'Modelado Relacional (ERD)',
        'Optimización de Consultas SQL',
        'Procedimientos Almacenados',
        'Migración & Backups'
      ],
      technologies: ['MySQL', 'PostgreSQL', 'SQL Server', 'Redis'],
      color: 'text-blue-400'
    },
    {
      icon: Code2,
      title: 'Desarrollo Full Stack',
      description: 'Soluciones integrales de extremo a extremo. Interfaces reactivas conectadas a lógicas de negocio complejas.',
      features: [
        'SPA con React / Vue',
        'Dashboards Administrativos',
        'SSR con Next.js',
        'Integración en tiempo real'
      ],
      technologies: ['React', 'Tailwind', 'TypeScript', 'Axios'],
      color: 'text-purple-400'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Infraestructura como código. Despliegue sus aplicaciones con arquitecturas modernas y resilientes.',
      features: [
        'Contenedorización Docker',
        'CI/CD Pipelines',
        'Configuración de VPS/AWS',
        'Monitoreo de Logs'
      ],
      technologies: ['AWS', 'Docker', 'Nginx', 'GitHub Actions'],
      color: 'text-orange-400'
    },
    {
      icon: Layers,
      title: 'Consultoría de Software',
      description: 'Análisis técnico para proyectos existentes. Refactorización y modernización de sistemas legacy.',
      features: [
        'Auditoría de Código',
        'Patrones de Diseño',
        'Diagramas UML/C4',
        'Selección de Tech Stack'
      ],
      technologies: ['Clean Arch', 'SOLID', 'MVC', 'Scrum'],
      color: 'text-teal-400'
    },
    {
      icon: Zap,
      title: 'Optimización',
      description: 'Mejora del rendimiento y tiempos de respuesta para aplicaciones de alto tráfico.',
      features: [
        'Caching Strategies',
        'Refactorización de Algoritmos',
        'Load Balancing',
        'Database Indexing'
      ],
      technologies: ['Performance', 'Debugging', 'Profiling'],
      color: 'text-yellow-400'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'Reunión inicial para entender los requerimientos técnicos, alcance y objetivos del negocio.',
      icon: MessageSquare
    },
    {
      step: '02',
      title: 'Blueprint',
      description: 'Diseño de la arquitectura, selección del stack tecnológico y planificación de sprints.',
      icon: FileText
    },
    {
      step: '03',
      title: 'Development',
      description: 'Codificación iterativa con entregables constantes y revisión de código (Code Reviews).',
      icon: Terminal
    },
    {
      step: '04',
      title: 'Deployment',
      description: 'Pruebas finales, configuración del servidor de producción y despliegue en vivo.',
      icon: Rocket
    }
  ]

  const values = [
    { title: 'Clean Code', desc: 'Código mantenible y escalable.', icon: ShieldCheck },
    { title: 'Comunicación', desc: 'Reportes de avance semanales.', icon: Users },
    { title: 'Puntualidad', desc: 'Respeto estricto a los deadlines.', icon: Clock },
    { title: 'Soporte', desc: 'Garantía post-implementación.', icon: Zap }
  ]

  return (
    <>
      <SEO
        title="Servicios | Luis Crisanto - Soluciones de Software"
        description="Servicios de desarrollo: Arquitectura Backend, Ingeniería de Datos, Full Stack, Cloud & DevOps, Consultoría de Software y Optimización."
        canonical="https://luis-crisanto.vercel.app/services"
        keywords="Servicios, Desarrollo Backend, Full Stack, Cloud, DevOps, Consultoría, Arquitectura de Software, APIs REST"
      />
      <div className="min-h-screen bg-zinc-950 py-24 px-6 relative overflow-hidden">
        {/* FONDO: hexágonos sutiles via SVG inline — diferente a otras páginas */}
        <div
          className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-2l26-15V18L28 2 2 18v31l26 15z' fill='%236ee7b7'/%3E%3C/svg%3E")`,
            backgroundSize: '56px 100px'
          }}
        />
        <div className="absolute top-[5%] left-[5%] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* HEADER */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full mb-6"
            >
              <Zap className="w-4 h-4 text-emerald-500" />
              <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                Catálogo de Servicios
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white mb-6"
            >
              Mis Servicios: Soluciones de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Alto Nivel</span>
            </motion.h1>
            <motion.p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Transformo requerimientos complejos en software funcional, seguro y escalable.
            </motion.p>

          </div>

          {/* SERVICES GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
            {services.map((service, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-8 rounded-2xl hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${service.color}`}>
                    <service.icon size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 h-12 md:h-16">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-zinc-800/50 flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-zinc-950 text-zinc-500 text-[10px] font-mono uppercase tracking-wide rounded border border-zinc-800/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* PROCESS SECTION */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Flujo de Desarrollo</h2>
              <p className="text-zinc-400">Metodología estructurada para garantizar el éxito del proyecto</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-zinc-800 via-emerald-900/50 to-zinc-800 -z-10"></div>

              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-center hover:border-emerald-500/30 transition-colors"
                >
                  <div className="w-24 h-24 mx-auto bg-zinc-950 border-4 border-zinc-900 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-xl">
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-zinc-900 font-bold text-xs shadow-lg shadow-emerald-500/20">
                      {item.step}
                    </span>
                    <item.icon className="text-zinc-300 w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* VALUE PROPOSITION & CTA */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">

            {/* Values Grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {values.map((val, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg">
                    <val.icon className="text-emerald-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{val.title}</h4>
                    <p className="text-zinc-500 text-xs">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-8 md:p-12 text-white flex flex-col justify-center items-start shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <h2 className="text-3xl font-bold mb-4 relative z-10">¿Listo para empezar?</h2>
              <p className="text-emerald-100 mb-8 relative z-10">
                Convierte esa idea en un sistema robusto. Agenda una consulta técnica gratuita de 15 minutos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full relative z-10">
                <Link to="/contact" className="flex-1">
                  <button className="w-full px-6 py-3.5 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
                    Contactar
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default Services
