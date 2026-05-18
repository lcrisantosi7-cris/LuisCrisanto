import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Terminal, AlertTriangle } from 'lucide-react'

// Componente del Robot SVG Animado
const BrokenRobot = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
    {/* Cabeza flotando */}
    <motion.g
      animate={{ y: [-5, 5, -5] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    >
      <rect x="60" y="40" width="80" height="70" rx="10" fill="#27272a" stroke="#10b981" strokeWidth="2" />
      {/* Ojos */}
      <circle cx="85" cy="75" r="8" fill="#ef4444" /> {/* Ojo rojo (error) */}
      <motion.g
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 3 }}
      >
        <circle cx="115" cy="75" r="8" fill="#10b981" /> {/* Ojo verde (funcionando mal) */}
      </motion.g>
      {/* Boca */}
      <rect x="85" y="95" width="30" height="4" rx="2" fill="#71717a" />
      
      {/* Antena */}
      <line x1="100" y1="40" x2="100" y2="20" stroke="#71717a" strokeWidth="2" />
      <circle cx="100" cy="15" r="4" fill="#10b981" />
      
      {/* Chispas (Sparks) */}
      <motion.path
        d="M110 30 L120 20 M115 35 L125 35"
        stroke="#eab308"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
      />
    </motion.g>

    {/* Cuerpo */}
    <motion.path
      d="M70 120 C70 120 130 120 130 120 L120 180 H80 L70 120Z"
      fill="#27272a"
      stroke="#52525b"
      strokeWidth="2"
      animate={{ y: [-2, 2, -2] }}
      transition={{ repeat: Infinity, duration: 3, delay: 0.5, ease: "easeInOut" }}
    />
    
    {/* Brazos sueltos */}
    <motion.path
      d="M70 130 L50 160"
      stroke="#71717a"
      strokeWidth="4"
      strokeLinecap="round"
      animate={{ rotate: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
    <motion.path
      d="M130 130 L150 160"
      stroke="#71717a"
      strokeWidth="4"
      strokeLinecap="round"
      animate={{ rotate: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
    />
    
    {/* Sombra */}
    <motion.ellipse
      cx="100"
      cy="190"
      rx="40"
      ry="5"
      fill="#10b981"
      animate={{ opacity: [0.1, 0.3, 0.1], rx: [35, 45, 35] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    />
  </svg>
)

const NotFound = () => {
  const navigate = useNavigate()
  const [logs, setLogs] = useState([])
  const [, setIsTerminalDone] = useState(false)

  useEffect(() => {
    // Limpiamos los logs al montar para evitar duplicados del Strict Mode
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLogs([])
    
    const sequence = [
      { text: '> connecting to server...', color: 'text-zinc-500' },
      { text: '> error: 404_not_found_exception', color: 'text-red-500' },
      { text: '> searching database...', color: 'text-zinc-500' },
      { text: '> location: /void/unknown_universe', color: 'text-yellow-500' },
      { text: '> initiating recovery protocol...', color: 'text-emerald-500' },
      { text: '> status: system_ready', color: 'text-emerald-400' },
    ]

    const timers = sequence.map((log, index) => {
      return setTimeout(() => {
        setLogs(prev => [...prev, log])
        if (index === sequence.length - 1) setIsTerminalDone(true)
      }, index * 600)
    })

    // Cleanup: borra los timers si el usuario sale de la página antes de que terminen
    return () => timers.forEach(timer => clearTimeout(timer))
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Fondo Matrix Sutil */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, #10b981 25%, #10b981 26%, transparent 27%, transparent 74%, #10b981 75%, #10b981 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #10b981 25%, #10b981 26%, transparent 27%, transparent 74%, #10b981 75%, #10b981 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        
        {/* ILUSTRACIÓN DEL ROBOT */}
        <div className="mb-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <BrokenRobot />
        </div>

        {/* Título y Mensaje */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tighter">
            4<span className="text-emerald-500">0</span>4
          </h1>
          <p className="text-2xl font-bold text-zinc-300 mb-6">
            Houston, tenemos un problema.
          </p>
          <p className="text-zinc-400 max-w-md mx-auto mb-8">
            La página que buscas se ha perdido en el ciberespacio o ha sido eliminada.
          </p>
        </motion.div>

        {/* TERMINAL LOGS (Característica de Backend) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 max-w-md mx-auto mb-8 text-left font-mono text-sm shadow-2xl overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-3 border-b border-zinc-800 pb-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            <span className="text-xs text-zinc-600 ml-auto">bash --sys-error</span>
          </div>
          <div className="space-y-1">
            {logs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={log.color}
              >
                {log.text}
              </motion.div>
            ))}
            <motion.div 
              animate={{ opacity: [0, 1] }}
              transition={{ repeat: Infinity, duration: 0.3, ease: "easeInOut" }}
              className="text-emerald-500"
            >
              _
            </motion.div>
          </div>
        </motion.div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-zinc-900 border border-zinc-700 text-white rounded-xl font-bold hover:bg-zinc-800 hover:border-zinc-600 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Regresar
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-emerald-500 text-zinc-950 rounded-xl font-bold hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Ir al Inicio
          </button>
        </div>

      </div>
    </div>
  )
}

export default NotFound