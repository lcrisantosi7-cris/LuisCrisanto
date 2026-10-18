import React, { Suspense, lazy, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import WelcomeRobot from './components/WelcomeRobot'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Experience = lazy(() => import('./pages/Experience'))
const Skills = lazy(() => import('./pages/Skills'))
const Projects = lazy(() => import('./pages/Projects'))
const Services = lazy(() => import('./pages/Services'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Fallback mientras carga el chunk de cada página
const PageLoader = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: '#0d0b14' }}
    role="status"
    aria-label="Cargando"
  >
    <div
      className="w-10 h-10 rounded-full animate-spin"
      style={{
        border: '3px solid rgba(252,143,84,0.15)',
        borderTopColor: '#FC8F54',
      }}
    />
  </div>
)

// Al cambiar de ruta: sube al inicio y mueve el foco al contenido (no actúa en la carga inicial)
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

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
        style={{ background: '#FC8F54', color: '#0d0b14' }}
      >
        Saltar al contenido
      </a>
      <ScrollToTop />
      <Header />
      <WelcomeRobot />
      <main id="contenido" tabIndex={-1} className="pt-20 outline-none">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App