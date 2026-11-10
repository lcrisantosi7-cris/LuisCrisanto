import React from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

export default function Spotlight({ children, className = '' }) {
    const x = useMotionValue(-300)
    const y = useMotionValue(-300)
    const bg = useMotionTemplate`radial-gradient(340px circle at ${x}px ${y}px, rgb(var(--ch) / 0.14), transparent 70%)`
    return (
        <div
            onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                x.set(e.clientX - r.left)
                y.set(e.clientY - r.top)
            }}
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] ${className}`}
        >
            <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: bg }} />
            <div className="relative h-full">{children}</div>
        </div>
    )
}