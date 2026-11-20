import { useEffect, useSyncExternalStore } from 'react'
import { useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import PageMeta from '../components/PageMeta'
import LanguageToggle from '../components/LanguageToggle'

// Rutas verificadas contra los archivos existentes en public/cv.
const FILES = {
    es: { src: '/cv/cv-luis-crisanto.pdf', name: 'Luis-Crisanto-CV-ES.pdf' },
    en: { src: '/cv/cv-luis-crisanto-en.pdf', name: 'Luis-Crisanto-CV-EN.pdf' },
}

const DESKTOP = '(min-width: 1024px) and (pointer: fine)'
const subscribe = (cb) => {
    const mql = window.matchMedia(DESKTOP)
    mql.addEventListener('change', cb)
    return () => mql.removeEventListener('change', cb)
}
const useDesktop = () =>
    useSyncExternalStore(subscribe, () => window.matchMedia(DESKTOP).matches, () => false)

const btn =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[background-color,transform,box-shadow] duration-300'

export default function Cv() {
    const { t, i18n } = useTranslation()
    const [params] = useSearchParams()
    const desktop = useDesktop()

    const requested = params.get('lang')
    useEffect(() => {
        if (requested && FILES[requested] && requested !== i18n.resolvedLanguage) {
            i18n.changeLanguage(requested)
        }
    }, [requested, i18n])

    const lng = i18n.resolvedLanguage === 'en' ? 'en' : 'es'
    const file = FILES[lng]

    return (
        <section className="mx-auto flex min-h-svh max-w-6xl flex-col px-5 pb-16 pt-28 sm:px-6 md:pt-32">
            <PageMeta title={t('cv.title')} description={t('cv.description')} />

            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-glow-300">{t('cv.eyebrow')}</p>
                    <h1 className="mt-3 font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.02em] text-flame-gradient md:text-6xl">
                        {t('cv.title')}
                    </h1>
                    <p className="mt-4 max-w-xl text-cream-100/75">{t('cv.text')}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="md:hidden">
                        <LanguageToggle />
                    </div>
                    <a
                        href={file.src}
                        download={file.name}
                        className={`${btn} bg-flame-500 text-navy-950 hover:-translate-y-0.5 hover:bg-flame-400 hover:shadow-[0_12px_30px_-10px_rgba(255,106,19,0.8)]`}
                    >
                        {t('cv.download')}
                    </a>
                    <a
                        href={file.src}
                        className={`${btn} text-cream-100 ring-1 ring-white/25 hover:-translate-y-0.5 hover:bg-white/10`}
                    >
                        {t('cv.open')}
                    </a>
                </div>
            </div>

            <div className="mt-10 flex-1">
                {desktop ? (
                    <iframe
                        key={file.src}
                        src={`${file.src}#view=FitH`}
                        title={t('cv.frameTitle')}
                        className="h-[78svh] w-full rounded-2xl bg-white ring-1 ring-white/15"
                    />
                ) : (
                    <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-8 text-center">
                        <p className="text-lg text-cream-100/85">{t('cv.mobileHint')}</p>
                        <a
                            href={file.src}
                            className={`${btn} mt-6 bg-flame-500 text-navy-950 hover:bg-flame-400`}
                        >
                            {t('cv.open')}
                        </a>
                    </div>
                )}
            </div>
        </section>
    )
}