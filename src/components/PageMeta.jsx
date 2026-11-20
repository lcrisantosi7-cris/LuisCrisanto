import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'

const SITE = 'https://luis-crisanto.vercel.app'
const PERSON_ID = SITE + '/#person'

function upsertMeta(attribute, key, content) {
    let element = document.head.querySelector('meta[' + attribute + '="' + key + '"]')
    if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.appendChild(element)
    }
    element.setAttribute('content', content)
}

function upsertCanonical(href) {
    let element = document.head.querySelector('link[rel="canonical"]')
    if (!element) {
        element = document.createElement('link')
        element.rel = 'canonical'
        document.head.appendChild(element)
    }
    element.href = href
}

export default function PageMeta({ title, description, type = 'website' }) {
    const { t, i18n } = useTranslation()
    const { pathname } = useLocation()
    const language = i18n.resolvedLanguage === 'en' ? 'en' : 'es'
    const fullTitle = title ? title + ' | Luis Crisanto' : t('meta.title')
    const fullDescription = description || t('meta.description')
    const canonical = SITE + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''))

    useEffect(() => {
        document.documentElement.lang = language
        document.title = fullTitle
        upsertMeta('name', 'description', fullDescription)
        upsertMeta('name', 'author', 'Luis Ángel Crisanto Silupú')
        upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
        upsertMeta('property', 'og:type', type)
        upsertMeta('property', 'og:site_name', 'Luis Crisanto | Portafolio')
        upsertMeta('property', 'og:locale', language === 'en' ? 'en_US' : 'es_PE')
        upsertMeta('property', 'og:url', canonical)
        upsertMeta('property', 'og:title', fullTitle)
        upsertMeta('property', 'og:description', fullDescription)
        upsertMeta('property', 'og:image', SITE + '/assets/images/og-cover.jpg')
        upsertMeta('name', 'twitter:card', 'summary_large_image')
        upsertMeta('name', 'twitter:title', fullTitle)
        upsertMeta('name', 'twitter:description', fullDescription)
        upsertMeta('name', 'twitter:image', SITE + '/assets/images/og-cover.jpg')
        upsertCanonical(canonical)

        let schema = document.getElementById('page-structured-data')
        if (!schema) {
            schema = document.createElement('script')
            schema.id = 'page-structured-data'
            schema.type = 'application/ld+json'
            document.head.appendChild(schema)
        }
        schema.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: fullTitle,
            description: fullDescription,
            url: canonical,
            inLanguage: language,
            isPartOf: { '@type': 'WebSite', name: 'Luis Crisanto | Portafolio', url: SITE },
            about: { '@id': PERSON_ID },
        })
    }, [canonical, fullDescription, fullTitle, language, type])

    return null
}
