import { useTranslation } from 'react-i18next'
import LocalTime from './LocalTime'

export default function StatusPill({ className = '' }) {
    const { t } = useTranslation()

    return (
        <p
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-cream-100/70 ring-1 ring-white/10 ${className}`}
        >
            <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {t('nav.status')}
            <span aria-hidden="true" className="text-cream-100/30">·</span>
            <LocalTime /> {t('nav.statusPlace')}
        </p>
    )
}