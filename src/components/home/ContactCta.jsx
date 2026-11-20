import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '../../lib/gsap'
import useReveal from '../../hooks/useReveal'
import LinkButton from '../ui/LinkButton'

export default function ContactCta() {
    const { t } = useTranslation()
    const root = useRef(null)

    useReveal(root)

    // El cohete despega desde abajo a la izquierda y luego flota
    useGSAP(
        () => {
            const mm = gsap.matchMedia(root.current)

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.from('[data-rocket]', {
                    x: -140,
                    y: 140,
                    opacity: 0,
                    rotate: -6,
                    duration: 1.4,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
                })
            })

            return () => mm.revert()
        },
        { scope: root },
    )

    return (
        <section
            ref={root}
            aria-labelledby="cta-title"
            className="relative overflow-hidden bg-void-950 px-6 py-32 text-center md:py-48"
            style={{ backgroundImage: 'radial-gradient(60% 55% at 50% 115%, rgba(255,106,19,0.22), transparent 70%)' }}
        >
            <div data-rocket aria-hidden="true" className="mx-auto mb-8 w-28 md:w-44">
                <img
                    src="/assets/images/rocket.webp"
                    alt=""
                    width="900"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    className="float-slow h-auto w-full"
                />
            </div>
            <p data-reveal className="font-mono text-xs uppercase tracking-[0.2em] text-glow-300">
                {t('cta.eyebrow')}
            </p>
            <h2
                id="cta-title"
                data-reveal="mask"
                className="mx-auto mt-6 font-display font-extrabold leading-[0.95] tracking-[-0.02em] text-cream-100 text-[length:clamp(3.25rem,11vw,9.5rem)]"
            >
                {t('cta.title')}
            </h2>
            <p data-reveal className="mx-auto mt-6 max-w-xl text-lg text-cream-100/70">
                {t('cta.text')}
            </p>
            <div data-reveal className="mt-10">
                <LinkButton to="/contact">{t('nav.contactCta')}</LinkButton>
            </div>
        </section>
    )
}