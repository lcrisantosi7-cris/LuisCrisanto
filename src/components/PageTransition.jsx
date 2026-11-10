import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { channelFor } from '../lib/channels'
import { IS_LITE } from '../lib/lite'
import { sfx } from '../lib/sound'

function Curtain({ name }) {
    useEffect(() => { sfx.channel() }, [])
    return (
        <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[60] flex items-end bg-ink-900 p-8 md:p-14"
            initial={{ y: '0%' }}
            animate={{ y: '-100%' }}
            transition={{ duration: IS_LITE ? 0.5 : 0.9, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
        >
            <span className="font-display text-5xl font-bold text-channel md:text-8xl">{name}</span>
        </motion.div>
    )
}

export default function PageTransition({ children }) {
    const { pathname } = useLocation()
    const ch = channelFor(pathname)
    return (
        <>
            <Curtain key={`c-${pathname}`} name={ch.name} />
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </>
    )
}