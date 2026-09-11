/**
 * techData.js
 * Fuente única de verdad para proyectos y skills.
 * Ambas páginas importan desde aquí para que los filtros cruzados funcionen.
 */

import {
    Server, Terminal, Braces, Globe, Code2, LayoutTemplate,
    Database, ShieldCheck, Cloud, Container, GitBranch, Settings,
    School, ShoppingCart, Box, CreditCard, BarChart3, Calendar,
    Map as MapIcon, MessageSquare, Share2, Layers,
} from 'lucide-react'

// ─── Mapa de aliases tag → skill.name ────────────────────────────────────────
// Permite que "JS", "MySQL", etc. en proyectos encuentren su skill equivalente.
export const TAG_ALIAS = {
    'JS': 'JavaScript',
    'CSS': 'HTML5/CSS3',
    'HTML': 'HTML5/CSS3',
    'MySQL': 'MySQL / MariaDB',
    'MariaDB': 'MySQL / MariaDB',
    'Node.js': 'Node.js',
    'PHP': 'PHP',
    'React': 'React',
    'Tailwind': 'Tailwind CSS',
    'Tailwind CSS': 'Tailwind CSS',
    'JavaScript': 'JavaScript',
    'AWS': 'AWS Services',
    'AWS SES': 'AWS Services',
    'Docker': 'Docker',
    'Git': 'Git & GitHub',
    'GitHub': 'Git & GitHub',
    'SQL Server': 'SQL Server',
    'PostgreSQL': 'MySQL / MariaDB', // agrúpala con databases si quieres
}

// Normaliza un tag de proyecto al nombre canónico de skill
export const normalizeTag = (tag) => TAG_ALIAS[tag] ?? tag

// ─── PROYECTOS ────────────────────────────────────────────────────────────────
export const PROJECTS = [
    {
        title: 'Sistema de Gestión Escolar',
        description: 'Plataforma MVC integral para administración académica. Manejo de concurrencia y roles.',
        icon: School,
        tags: ['PHP', 'MySQL', 'CSS', 'JavaScript', 'MVC'],
        category: 'fullstack',
        type: 'academic',
        github: 'https://github.com/lcrisantosi7-cris/Sistema-Gestion-Escolar',
        status: 'production',
    },
    {
        title: 'API REST E-Commerce',
        description: 'Arquitectura RESTful escalable con autenticación JWT, pasarela de pagos y gestión de inventario.',
        icon: ShoppingCart,
        tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
        category: 'backend',
        type: 'personal',
        github: '#',
        status: 'dev',
    },
    {
        title: 'Control de Inventario',
        description: 'Sistema logístico con algoritmos de predicción de stock y generación de reportes PDF/Excel.',
        icon: Box,
        tags: ['PHP', 'MySQL', 'JS', 'Chart.js'],
        category: 'fullstack',
        type: 'academic',
        github: '#',
        demo: '#',
        status: 'production',
    },
    {
        title: 'Microservicios de Pagos',
        description: 'Arquitectura distribuida para orquestación de pagos usando RabbitMQ para mensajería asíncrona.',
        icon: CreditCard,
        tags: ['PHP', 'RabbitMQ', 'Docker'],
        category: 'backend',
        type: 'personal',
        github: '#',
        status: 'dev',
    },
    {
        title: 'Analytics Dashboard',
        description: 'Panel de visualización de datos en tiempo real con agregación de métricas de múltiples fuentes.',
        icon: BarChart3,
        tags: ['React', 'Node.js', 'MongoDB'],
        category: 'fullstack',
        type: 'personal',
        github: '#',
        demo: '#',
        status: 'dev',
    },
    {
        title: 'Sistema de Reservas',
        description: 'Motor de reservas con validación de conflictos horarios y notificaciones transaccionales vía AWS SES.',
        icon: Calendar,
        tags: ['Node.js', 'Vue.js', 'AWS SES'],
        category: 'fullstack',
        type: 'academic',
        github: '#',
        demo: '#',
        status: 'dev',
    },
    {
        title: 'API de Geolocalización',
        description: 'Servicio backend para cálculos geoespaciales y optimización de rutas usando PostGIS.',
        icon: MapIcon,
        tags: ['PHP', 'PostgreSQL', 'Redis'],
        category: 'backend',
        type: 'personal',
        github: '#',
        status: 'dev',
    },
    {
        title: 'Real-Time Chat Engine',
        description: 'Infraestructura de comunicación bidireccional escalable basada en eventos WebSockets.',
        icon: MessageSquare,
        tags: ['Node.js', 'Socket.io', 'React'],
        category: 'fullstack',
        type: 'personal',
        github: '#',
        demo: '#',
        status: 'dev',
    },
    {
        title: 'RetailVision Analytics',
        slug: 'retailvision',
        thumb: '/projects/retailvision.webp',
        description: 'Plataforma de análisis de clientes en tiempo real con detección YOLOv8, mapas de calor, métricas de afluencia y reportes PDF para múltiples cámaras.',
        icon: BarChart3,
        tags: ['Python', 'FastAPI', 'YOLOv8', 'OpenCV', 'React', 'WebSocket', 'Recharts'],
        category: 'fullstack',
        type: 'personal',
        github: 'https://github.com/lcrisantosi7-cris/retailvision-analytics',
        demo: '#',
        status: 'production',
    },
]

// ─── SKILLS ───────────────────────────────────────────────────────────────────
export const SKILLS = [
    { name: 'Node.js', category: 'backend', level: 85, icon: Server, color: '#22c55e' },
    { name: 'PHP', category: 'backend', level: 80, icon: Terminal, color: '#8b5cf6' },
    { name: 'React', category: 'frontend', level: 80, icon: Braces, color: '#3b82f6' },
    { name: 'HTML5/CSS3', category: 'frontend', level: 95, icon: Globe, color: '#f97316' },
    { name: 'JavaScript', category: 'frontend', level: 90, icon: Code2, color: '#eab308' },
    { name: 'Tailwind CSS', category: 'frontend', level: 85, icon: LayoutTemplate, color: '#06b6d4' },
    { name: 'MySQL / MariaDB', category: 'database', level: 85, icon: Database, color: '#0ea5e9' },
    { name: 'SQL Server', category: 'database', level: 70, icon: ShieldCheck, color: '#ef4444' },
    { name: 'AWS Services', category: 'cloud', level: 65, icon: Cloud, color: '#f59e0b' },
    { name: 'Docker', category: 'cloud', level: 60, icon: Container, color: '#3b82f6' },
    { name: 'Git & GitHub', category: 'tools', level: 85, icon: GitBranch, color: '#f43f5e' },
    { name: 'VS Code', category: 'tools', level: 95, icon: Settings, color: '#3b82f6' },
]

export const LEARNING_SKILLS = [
    { name: 'Vue.js', icon: Share2, status: 'Explorando' },
    { name: 'Next.js', icon: Layers, status: 'Integrando' },
]

// ─── Contador: cuántos proyectos usan cada skill ──────────────────────────────
// Devuelve un Map<skillName, count>
export const buildProjectCountMap = () => {
    const map = new Map()
    for (const project of PROJECTS) {
        for (const tag of project.tags) {
            const canonical = normalizeTag(tag)
            map.set(canonical, (map.get(canonical) ?? 0) + 1)
        }
    }
    return map
}
