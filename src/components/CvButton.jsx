import { useTranslation } from 'react-i18next'

function DownloadIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
        </svg>
    )
}

// Abre /cv en una pestaña nueva: ahí se ve el CV del idioma actual y se puede descargar.
export default function CvButton({ className = '', short = false, onClick }) {
    const { t, i18n } = useTranslation()
    const lng = i18n.resolvedLanguage === 'en' ? 'en' : 'es'

    return (
        <a
            href={`/cv?lang=${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-cream-100 ring-1 ring-white/20 transition-[background-color,transform] duration-300 hover:-translate-y-px hover:bg-white/10 ${className}`}
        >
            <DownloadIcon />
            {short ? (
                <>
                    <span className="lg:hidden">CV</span>
                    <span className="hidden lg:inline">{t('nav.cv')}</span>
                </>
            ) : (
                t('nav.cv')
            )}
        </a>
    )
}