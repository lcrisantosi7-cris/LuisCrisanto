import React, { Suspense, lazy, useEffect, useRef } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import CameraCursor from './components/CameraCursor'
import PageTransition from './components/PageTransition'
import { channelFor } from './lib/channels'
import { IS_LITE } from './lib/lite'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Experience = lazy(() => import('./pages/Experience'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Projects = lazy(() => import('./pages/Projects'))
const Services = lazy(() => import('./pages/Services'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-ink-950" role="status" aria-label="Cargando">
    <div className="w-10 h-10 rounded-full animate-spin border-[3px] border-channel/15 border-t-channel" />
  </div>
)

function ScrollToTop() {
  const { pathname } = useLocation()
  const prev = useRef(pathname)
  useEffect(() => {
    if (prev.current === pathname) return
    prev.current = pathname
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.getElementById('contenido')?.focus({ preventScroll: true })
  }, [pathname])
  return null
}

function ChannelColor() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.documentElement.style.setProperty('--ch', channelFor(pathname).rgb)
  }, [pathname])
  return null
}

function SmoothScroll() {
  useEffect(() => {
    if (IS_LITE) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])
  return null
}

function App() {
  return (
    <div className="min-h-screen bg-ink-950 text-white">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold bg-channel text-ink-950"
      >
        Saltar al contenido
      </a>
      <ScrollToTop />
      <ChannelColor />
      <SmoothScroll />
      <CameraCursor />
      <Header />
      <main id="contenido" tabIndex={-1} className="pt-20 outline-none">
        <PageTransition>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre-mi" element={<About />} />
              <Route path="/experiencia" element={<Experience />} />
              <Route path="/proyectos" element={<Projects />} />
              <Route path="/proyectos" element={<Projects />} />
              <Route path="/proyectos/:slug" element={<ProjectDetail />} />
              <Route path="/habilidades" element={<Navigate to="/experiencia" replace />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/about" element={<Navigate to="/sobre-mi" replace />} />
              <Route path="/experience" element={<Navigate to="/experiencia" replace />} />
              <Route path="/projects" element={<Navigate to="/proyectos" replace />} />
              <Route path="/skills" element={<Navigate to="/habilidades" replace />} />
              <Route path="/services" element={<Navigate to="/servicios" replace />} />
              <Route path="/contact" element={<Navigate to="/contacto" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}

export default App