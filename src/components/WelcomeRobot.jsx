import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { X, Sparkles, MessageCircle } from 'lucide-react'

// --- COMPONENTE SVG DEL ROBOT FELIZ ---
const HappyRobotSVG = () => (
  <svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
    {/* Cabeza flotando suavemente */}
    <motion.g
      animate={{ y: [-3, 3, -3] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      {/* Cabeza */}
      <rect x="60" y="40" width="80" height="70" rx="10" fill="#18181b" stroke="#8b5cf6" strokeWidth="2" />

      {/* Ojos (Parpadeo feliz) */}
      <motion.g
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ repeat: Infinity, duration: 3, repeatDelay: 3.5 }}
      >
        <circle cx="85" cy="70" r="8" fill="#8b5cf6" />
        <circle cx="115" cy="70" r="8" fill="#8b5cf6" />
        {/* Brillo en los ojos */}
        <circle cx="88" cy="67" r="2.5" fill="white" />
        <circle cx="118" cy="67" r="2.5" fill="white" />
      </motion.g>

      {/* Boca (Sonrisa) */}
      <path d="M85 95 Q100 105 115 95" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />

      {/* Antena */}
      <line x1="100" y1="40" x2="100" y2="20" stroke="#71717a" strokeWidth="2" />
      <motion.circle
        cx="100" cy="15" r="4" fill="#8b5cf6"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </motion.g>

    {/* Cuerpo */}
    <motion.path
      d="M70 120 L130 120 L125 170 H75 L70 120Z"
      fill="#18181b"
      stroke="#3f3f46"
      strokeWidth="2"
      animate={{ y: [-1, 1, -1] }}
      transition={{ repeat: Infinity, duration: 4, delay: 0.5, ease: "easeInOut" }}
    />

    {/* Brazo Izquierdo (Fijo) */}
    <path d="M70 130 L60 160" stroke="#71717a" strokeWidth="4" strokeLinecap="round" />

    {/* Brazo Derecho (Saludando) */}
    <motion.g
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, -20, 10, -20, 0] }}
      transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 1 }}
      style={{ originX: "130px", originY: "130px" }}
    >
      <path d="M130 130 L150 110" stroke="#71717a" strokeWidth="4" strokeLinecap="round" />
      {/* Mano */}
      <circle cx="152" cy="108" r="5" fill="#8b5cf6" />
    </motion.g>

    {/* Detalle del pecho (Logo LC) */}
    <rect x="90" y="135" width="20" height="15" rx="2" stroke="#3f3f46" strokeWidth="1" />
    <motion.rect
      x="92" y="137" width="16" height="11" rx="1" fill="#8b5cf6"
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ repeat: Infinity, duration: 3 }}
    />

    {/* Sombra */}
    <motion.ellipse
      cx="100"
      cy="185"
      rx="30"
      ry="4"
      fill="#8b5cf6"
      opacity="0.2"
      animate={{ opacity: [0.1, 0.3, 0.1], rx: [25, 35, 25] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    />
  </svg>
)

const WelcomeRobot = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const location = useLocation()

  // Solo mostrar en la página de inicio
  const isHome = location.pathname === '/'

  const messages = [
    "¡Hola! 👋",
    "Soy Luis Crisanto",
    "Full Stack Dev 🚀",
    "¡Bienvenido! ✨",
    "¿Vemos mis proyectos?"
  ]

  useEffect(() => {
    if (!isHome) {
      setIsVisible(false)
      return
    }

    // Comprobar si ya se cerró anteriormente en esta sesión
    const hasClosed = sessionStorage.getItem('welcomeRobotClosed')
    if (hasClosed) return

    // Mostrar después de 1 segundo
    const timer = setTimeout(() => setIsVisible(true), 1000)

    // Rotar mensajes
    const msgTimer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(msgTimer)
    }
  }, [isHome, messages.length])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('welcomeRobotClosed', 'true')
  }

  return (
    <AnimatePresence>
      {isVisible && isHome && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none sm:pointer-events-auto"
        >

          {/* --- BURBUJA DE MENSAJE --- */}
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              className="mr-8 mb-2 relative pointer-events-auto"
              initial={{ opacity: 0, x: 10, y: 5 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700 text-white px-4 py-2 rounded-2xl rounded-br-none shadow-xl flex items-center gap-2 min-w-[150px] max-w-[210px]">
                {messageIndex === 0
                  ? <Sparkles size={14} className="text-yellow-400 shrink-0" />
                  : <MessageCircle size={14} className="shrink-0" style={{ color: '#FC8F54' }} />
                }
                <span className="text-sm font-medium">{messages[messageIndex]}</span>
              </div>
              {/* Botón cerrar */}
              <button
                onClick={handleClose}
                className="absolute -top-2 -right-2 bg-zinc-800 border border-zinc-600 rounded-full p-1 hover:bg-red-500 hover:border-red-500 transition-colors"
                aria-label="Cerrar"
              >
                <X size={10} className="text-white" />
              </button>
            </motion.div>
          </AnimatePresence>

          {/* --- ROBOT ANIMADO --- */}
          <motion.div
            className="relative cursor-pointer pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMessageIndex(prev => (prev + 1) % messages.length)}
          >
            {/* Efecto Glow detrás del robot */}
            <div className="absolute inset-0 blur-3xl rounded-full -z-10"
              style={{ background: 'rgba(252,143,84,0.18)' }} />
            <HappyRobotSVG />
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeRobot
