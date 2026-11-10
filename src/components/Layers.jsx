import React, { useId, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sfx } from '../lib/sound'

const TABS = ['Diseño', 'Código', 'Arquitectura']

const TOKEN =
    /(#.*$)|(f?"[^"]*"|f?'[^']*')|(\b(?:def|class|while|for|if|not|in|continue|break|return|with|True|False|None|isinstance)\b)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*(?=\())/g
const CLS = [null, 'italic text-ink-400', 'text-[#FFB388]', 'text-vision-light', 'text-channel', 'font-medium text-white']

function Line({ text }) {
    const out = []
    let last = 0
    let m
    TOKEN.lastIndex = 0
    while ((m = TOKEN.exec(text))) {
        if (m.index > last) out.push(text.slice(last, m.index))
        const g = m.findIndex((x, i) => i > 0 && x !== undefined)
        out.push(<span key={m.index} className={CLS[g]}>{m[0]}</span>)
        last = m.index + m[0].length
    }
    out.push(text.slice(last))
    return <>{out}</>
}

function Design({ src, alt }) {
    return <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
}

function Code({ file, note, src }) {
    return (
        <div className="flex h-full flex-col bg-ink-950">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[11px] text-ink-400">
                <span>{file}</span>
                <span>{note}</span>
            </div>
            <pre className="min-h-0 flex-1 overflow-auto p-4 font-mono text-[12.5px] leading-6 text-ink-200">
                {src.split('\n').map((l, i) => (
                    <div key={i} className="flex">
                        <span className="w-8 shrink-0 select-none pr-3 text-right text-ink-600">{i + 1}</span>
                        <code className="whitespace-pre"><Line text={l} /></code>
                    </div>
                ))}
            </pre>
        </div>
    )
}

function Arch({ cols }) {
    return (
        <div className="flex h-full flex-col items-stretch justify-center gap-2 overflow-auto p-5 md:flex-row md:items-center">
            {cols.map((c, i) => (
                <React.Fragment key={c.title}>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.12, duration: 0.5 }}
                        className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                        <p className="font-display text-sm font-bold text-channel">{c.title}</p>
                        <ul className="mt-3 space-y-1.5 font-mono text-[11.5px] text-ink-200">
                            {c.items.map((it) => (
                                <li key={it} className="flex gap-2"><span className="text-ink-600">›</span>{it}</li>
                            ))}
                        </ul>
                    </motion.div>
                    {i < cols.length - 1 && (
                        <span aria-hidden className="animate-pulse text-center font-mono text-channel">
                            <span className="md:hidden">↓</span><span className="hidden md:inline">→</span>
                        </span>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default function Layers({ layers, title, tab, onTab }) {
    const id = useId()
    const [inner, setInner] = useState(0)
    const t = tab ?? inner
    const pick = (i) => { (onTab ?? setInner)(i); sfx.click() }
    const { design, code, arch } = layers
    const caption = [design.caption, code.caption, arch.caption][t]

    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <span className="truncate font-display text-sm font-bold">{title}</span>
                <div role="tablist" aria-label="Capas del proyecto" className="flex gap-1">
                    {TABS.map((n, i) => (
                        <button
                            key={n}
                            role="tab"
                            aria-selected={t === i}
                            onClick={() => pick(i)}
                            onMouseEnter={sfx.tick}
                            className="relative rounded-md px-3 py-1 text-xs font-medium transition-colors"
                        >
                            {t === i && <motion.span layoutId={`pill-${id}`} className="absolute inset-0 rounded-md bg-channel" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                            <span className={`relative ${t === i ? 'text-ink-950' : 'text-ink-400 hover:text-white'}`}>{n}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative h-[380px] sm:h-[420px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={t}
                        className="absolute inset-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        {t === 0 && <Design src={design.src} alt={design.caption} />}
                        {t === 1 && <Code file={code.file} note={code.note} src={code.src} />}
                        {t === 2 && <Arch cols={arch.cols} />}
                    </motion.div>
                </AnimatePresence>
            </div>

            <p className="border-t border-white/10 px-4 py-2.5 text-xs text-ink-400">{caption}</p>
        </div>
    )
}