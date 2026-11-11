import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const C = { orange: '#FF6A2D', violet: '#5A4FE8', cream: '#F1E6D0', ink: '#070b19' }

export function Rocket() {
    const still = useReducedMotion()

    if (still) return null

    return (
        <motion.g
            // Movimiento orbital suave y natural: entra desde abajo-izquierda, asciende haciendo una curva alrededor de la luna y sale
            animate={{
                x: [-350, -100, 150, 400, 650],
                y: [600, 300, 50, -80, -350],
                rotate: [35, 20, -5, -45, -75],
                scale: [0.85, 1, 1.05, 1, 0.9]
            }}
            transition={{
                duration: 18,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.25, 0.5, 0.75, 1]
            }}
        >
            {/* Posicionamiento base alineado para orbitar la luna naranja */}
            <g transform="translate(850, 400) scale(1.1)">
                {/* Estela de luz/humo del motor (mucho más corta, elegante y proporcionada) */}
                <polygon points="15,0 -160,-28 -160,28" fill="url(#smoke-trail)" />

                {/* Llamas de propulsión dinámicas y parpadeantes */}
                <motion.g
                    animate={{
                        scaleX: [1, 1.3, 0.85, 1.25, 1],
                        opacity: [0.8, 1, 0.6, 1, 0.8]
                    }}
                    transition={{
                        duration: 0.2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    transform="translate(-20, 0)"
                >
                    <path d="M-20,-14 L-55,0 L-20,14 Z" fill="#FF6A2D" />
                    <path d="M-15,-8 L-35,0 L-15,8 Z" fill="#F1E6D0" />
                </motion.g>

                {/* Cuerpo principal del cohete */}
                <polygon points="22,-20 -25,-25 -25,25 22,20" fill={C.cream} />
                <polygon points="22,-20 -25,-25 -25,25 22,20" fill="url(#pp-sm)" opacity="0.4" />

                {/* Aletas laterales */}
                <path d="M-15,-22 L-40,-75 L5,-30 Z" fill={C.violet} />
                <path d="M-15,22 L-40,75 L5,30 Z" fill={C.violet} />

                {/* Punta cónica del cohete */}
                <path d="M18,-20 C80,-30 160,-15 220,0 C160,15 80,30 18,20 Z" fill={C.violet} />
                <path d="M18,-20 C80,-30 160,-15 220,0 C160,15 80,30 18,20 Z" fill="url(#pp-sm)" opacity="0.45" />
                <path d="M30,-12 C90,-20 170,-10 210,-2" stroke={C.cream} strokeWidth="4" fill="none" strokeLinecap="round" />

                {/* Ventanas / Ojos de buey */}
                <circle cx="120" cy="1" r="15" fill={C.orange} />
                <circle cx="120" cy="1" r="8" fill={C.ink} />
                <circle cx="170" cy="1" r="13" fill={C.orange} />
                <circle cx="170" cy="1" r="7" fill={C.ink} />
            </g>
        </motion.g>
    )
}