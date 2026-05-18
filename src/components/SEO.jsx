import React from 'react'
import { Helmet } from 'react-helmet-async'

export const SEO = ({ 
  title = 'Luis Crisanto | Software Engineer & Full Stack Developer',
  description = 'Ingeniero de Sistemas especializado en desarrollo Full Stack. Experto en Node.js, Spring Boot y soluciones Cloud (AWS). Creando software escalable y eficiente.',
  canonical = 'https://mi-portafolio-khaki-two.vercel.app/',
  ogImage = 'https://mi-portafolio-khaki-two.vercel.app/og-preview.png',
  ogType = 'website',
  keywords = 'Luis Crisanto, Software Engineer, Full Stack Developer, Node.js, Spring Boot, React, AWS'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter Card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Helmet>
  )
}

export default SEO
