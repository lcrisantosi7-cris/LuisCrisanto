import { useState } from 'react'

const SOURCES = [
    '/assets/images/luis-cutout.webp',
    '/assets/images/luis-cutout.png',
    '/assets/images/luis-original.jpg',
]

export default function Portrait({ alt, className = '' }) {
    const [index, setIndex] = useState(0)
    const src = SOURCES[index]
    const isPhoto = index === SOURCES.length - 1

    return (
        <div
            className={`relative isolate aspect-square w-full overflow-hidden rounded-t-full ring-1 ring-white/15 ${className}`}
            style={{ background: 'linear-gradient(180deg, #1d4f94 0%, #071a33 60%, #b53209 140%)' }}
        >
            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-3/4"
                style={{ background: 'radial-gradient(60% 80% at 50% 100%, rgba(255,106,19,0.6), transparent 70%)' }}
            />
            <div className="grain" />
            {src && (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    onError={() => setIndex((i) => i + 1)}
                    className={`absolute inset-x-0 bottom-0 ${isPhoto ? 'h-full w-full object-cover object-top' : 'h-auto w-full object-contain object-bottom'
                        }`}
                />
            )}
        </div>
    )
}