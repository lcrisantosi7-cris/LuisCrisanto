import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { CAN_CURSOR } from '../lib/lite'
import { sfx } from '../lib/sound'

export default function CameraCursor() {
    const x = useMotionValue(-100)
    const y = useMotionValue(-100)
    const rx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.5 })
    const ry = useSpring(y, { stiffness: 420, damping: 36, mass: 0.5 })
    const [st, setSt] = useState({ over: false, label: '', down: false })
    const last = useRef(null)

    useEffect(() => {
        if (!CAN_CURSOR) return
        document.documentElement.classList.add('has-lens')
        const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
        const over = (e) => {
            const el = e.target.closest?.('a, button, summary, [data-cursor]') ?? null
            if (el !== last.current) {
                last.current = el
                if (el) sfx.tick()
                setSt((s) => ({ ...s, over: !!el, label: el?.dataset?.cursor ?? '' }))
            }
        }
        const down = () => setSt((s) => ({ ...s, down: true }))
        const up = () => setSt((s) => ({ ...s, down: false }))
        window.addEventListener('pointermove', move, { passive: true })
        document.addEventListener('pointerover', over, { passive: true })
        window.addEventListener('pointerdown', down, { passive: true })
        window.addEventListener('pointerup', up, { passive: true })
        return () => {
            document.documentElement.classList.remove('has-lens')
            window.removeEventListener('pointermove', move)
            document.removeEventListener('pointerover', over)
            window.removeEventListener('pointerdown', down)
            window.removeEventListener('pointerup', up)
        }
    }, [x, y])

    if (!CAN_CURSOR) return null

    return (
        <>
            <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[9999]" style={{ x, y }}>
                <span className="block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-channel" />
            </motion.div>
            <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[9998]" style={{ x: rx, y: ry }}>
                <motion.div
                    className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-channel"
                    animate={{
                        width: st.over ? 76 : 32,
                        height: st.over ? 76 : 32,
                        scale: st.down ? 0.85 : 1,
                        backgroundColor: st.over ? 'rgb(var(--ch) / 0.14)' : 'rgb(var(--ch) / 0)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                >
                    {st.over && st.label && <span className="text-[10px] font-semibold tracking-wider text-white">{st.label}</span>}
                </motion.div>
            </motion.div>
        </>
    )
}