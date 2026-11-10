import React from 'react'

export default function Cover({ src, alt = '', pos = 'top', icon: Icon, className = '' }) {
    if (src) {
        return (
            <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} style={{ objectPosition: pos }} />
        )
    }
    return (
        <div className={`relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden bg-ink-800 ${className}`}>
            <div
                aria-hidden
                className="absolute inset-0"
                style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,.03) 0 12px, transparent 12px 24px)' }}
            />
            {Icon && <Icon size={36} className="relative text-channel/70" />}
            <span className="relative font-mono text-[10px] tracking-[0.3em] text-ink-400">IMAGEN PENDIENTE</span>
        </div>
    )
}