import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useReveal from '../../hooks/useReveal'

const PHOTOS = [
    '/assets/images/luis-cutout.webp',
    '/assets/images/luis-cutout.png',
    '/assets/images/luis-original.jpg',
]
const FACTS = ['studies', 'focus', 'learning', 'country']

export default function Intro() {
    const { t } = useTranslation()
    const root = useRef(null)
    const [index, setIndex] = useState(0)
    const src = PHOTOS[index]

    useReveal(root)

    return (
        <section
            ref={root}
            className="about-layout mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:gap-16 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)] lg:items-center"
        >
            <div className="about-copy space-y-6 text-xl leading-relaxed text-cream-100/85 md:text-2xl">
                <p data-reveal className="max-w-3xl font-display text-[clamp(1.55rem,3vw,2.55rem)] font-bold leading-[1.2] tracking-tight text-cream-100">{t('about.p1')}</p>
                <p data-reveal>{t('about.p2')}</p>
                <p data-reveal>{t('about.p3')}</p>

                <dl data-reveal className="grid gap-6 pt-6 sm:grid-cols-2">
                    {FACTS.map((key) => (
                        <div key={key} className="fact-card rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
                            <dt className="font-mono text-xs uppercase tracking-[0.2em] text-flame-400">
                                {t(`about.facts.${key}Label`)}
                            </dt>
                            <dd className="mt-2 text-base text-cream-100">{t(`about.facts.${key}`)}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div data-reveal className="about-photo-frame relative mx-auto w-full max-w-sm">
                <div
                    aria-hidden="true"
                    className="absolute -inset-5 rounded-t-[999px] border border-dashed border-flame-400/30"
                />
                <div
                    className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-2xl ring-1 ring-white/15 shadow-[0_28px_80px_-35px_rgba(0,0,0,.75)]"
                    style={{ background: 'linear-gradient(180deg, #1d4f94 0%, #071a33 55%, #b53209 135%)' }}
                >
                    <div className="grain" />
                    <span className="absolute bottom-4 left-4 z-10 rounded-full border border-white/20 bg-navy-950/65 px-4 py-2 font-mono text-[10px] uppercase tracking-[.2em] text-cream-100/80 backdrop-blur-md">Luis Crisanto · LC.dev</span>
                    {src && (
                        <img
                            src={src}
                            alt={t('about.photoAlt')}
                            loading="lazy"
                            decoding="async"
                            onError={() => setIndex((i) => i + 1)}
                            className="absolute inset-x-0 bottom-0 h-[94%] w-full object-contain object-bottom"
                        />
                    )}
                </div>
            </div>
        </section>
    )
}