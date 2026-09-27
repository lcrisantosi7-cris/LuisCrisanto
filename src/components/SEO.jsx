import React from 'react'
import { Helmet } from 'react-helmet-async'

// Versionado dinámico para invalidar la caché en todas las plataformas (Cache Busting)
const IMAGE_VERSION = 'v=2026.1'

export const SEO = ({
  title = 'Luis Crisanto | Software Engineer & Full Stack Developer',
  description = 'Ingeniero de Sistemas especializado en desarrollo Full Stack. Experto en Node.js, Spring Boot y soluciones Cloud (AWS). Creando software escalable y eficiente.',
  canonical = 'https://luis-crisanto.vercel.app/',
  // Cambiamos a og-banner.png y aplicamos IMAGE_VERSION para forzar una URL totalmente nueva
  ogImage = `https://luis-crisanto.vercel.app/og-banner.png?${IMAGE_VERSION}`,
  ogType = 'website',
  keywords = 'Luis Crisanto, Software Engineer, Full Stack Developer, Node.js, Spring Boot, React, AWS'
}) => {
  return (
    <Helmet>
      {/* 1. Meta tags fundamentales */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* 2. Open Graph / Facebook / LinkedIn / WhatsApp / Discord / Slack */}
      <meta property="og:site_name" content="Luis Crisanto Portfolio" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:url" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Luis Crisanto - Software Engineer & Full Stack Developer" />

      {/* 3. Twitter / X Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Luis Crisanto - Software Engineer & Full Stack Developer" />
    </Helmet>
  )
}

export default SEO