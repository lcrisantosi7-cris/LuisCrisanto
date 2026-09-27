import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <WelcomeRobot />
      <main className="pt-20">
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