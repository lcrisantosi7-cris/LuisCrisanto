import { useTranslation } from 'react-i18next'
import { useLocation, useSearchParams } from 'react-router'

const LANGS = ['es', 'en']

export default function LanguageToggle() {
    const { i18n, t } = useTranslation()
    const { pathname } = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const current = i18n.resolvedLanguage

    const handleLanguageChange = (lng) => {
        i18n.changeLanguage(lng)

        // The CV page derives its language from ?lang=. Keep the URL in sync
        // so Cv.jsx does not immediately restore the previous language.
        if (pathname === '/cv') {
            const nextParams = new URLSearchParams(searchParams)
            nextParams.set('lang', lng)
            setSearchParams(nextParams, { replace: true })
        }
    }

    return (
        <div role="group" aria-label={t('lang.label')} className="flex items-center rounded-full p-0.5 ring-1 ring-white/10">
            {LANGS.map((lng) => (
                <button
                    key={lng}
                    type="button"
                    lang={lng}
                    aria-pressed={current === lng}
                    onClick={() => handleLanguageChange(lng)}
                    className={`rounded-full px-2.5 py-1 font-mono text-xs transition-colors ${current === lng ? 'bg-white/15 text-cream-100' : 'text-cream-100/55 hover:text-cream-100'}`}
                >
                    {lng.toUpperCase()}
                </button>
            ))}
        </div>
    )
}