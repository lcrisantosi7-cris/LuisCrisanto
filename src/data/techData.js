/**
 * techData.js
 * Fuente única de verdad para proyectos y skills.
 * Ambas páginas importan desde aquí para que los filtros cruzados funcionen.
 */

import {
    Server, Terminal, Braces, Globe, Code2, LayoutTemplate,
    Database, ShieldCheck, Cloud, Container, GitBranch,
    School, BarChart3, PawPrint, Leaf, Cpu, Zap, Share2, Layers,
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

}

// Normaliza un tag de proyecto al nombre canónico de skill
export const normalizeTag = (tag) => TAG_ALIAS[tag] ?? tag

// ─── PROYECTOS ────────────────────────────────────────────────────────────────
/**
 * Campos obligatorios: title, description, icon, tags, category, type, status
 *   category: 'backend' | 'fullstack'
 *   type:     'personal' | 'academic'
 *   status:   'production' | 'dev'
 *
 * Campos opcionales (los usa la página de Proyectos):
 *   slug, thumb   → screenshot en /public/projects/<slug>.webp
 *   featured      → true en UN solo proyecto (tarjeta grande arriba)
 *   longDescription, problem, solution → texto del modal (caso de estudio)
 *   architecture  → array de pasos, se muestra como flujo: ['A', 'B', 'C']
 *   github, demo  → '#' oculta el botón
 */
export const CHANNEL_LABEL = {
    vision: 'Cámaras + IA',
    ecommerce: 'Ecommerce',
    sistemas: 'Sistemas',
}

export const PROJECTS = [
    {
        slug: 'retailvision',
        title: 'RetailVision Analytics',
        channel: 'vision',
        featured: true,
        status: 'production',
        videoPending: true,
        year: '2024',
        kind: 'Tesis',
        accent: '252 143 84',
        icon: BarChart3,
        thumb: '/projects/retailvision-analisis.webp',
        tagline: 'Cámaras que cuentan quién entra, adónde va y cuánto se queda.',
        description: 'Detección de personas en tiempo real con YOLOv8, mapas de calor y reportes por zona para decidir dónde poner lo importante.',
        tags: ['Python', 'YOLOv8', 'FastAPI', 'React', 'WebSocket', 'OpenCV'],
        problem: 'El negocio no sabe por dónde se mueve realmente su gente.',
        solution: 'Cámaras con detección de personas que muestran dónde se concentra la afluencia por zona, para ubicar productos y promociones donde más se mueve la gente.',
        metrics: [
            { v: '94.9%', l: 'Recall' },
            { v: '79.8%', l: 'Precisión' },
            { v: '86.7%', l: 'F1-score' },
            { v: '1,371', l: 'Frames evaluados' },
        ],
        highlights: [
            'Detección de personas por cámara con YOLOv8',
            'Mapas de calor y métricas de afluencia por zona',
            'Reportes listos para tomar decisiones comerciales',
            'Evaluación del modelo (precisión, recall, F1) en tiempo real',
        ],
        architecture: ['Cámaras', 'YOLOv8 + OpenCV', 'FastAPI', 'WebSocket', 'React + Recharts'],
        gallery: [
            { src: '/projects/retailvision-analisis.webp', caption: 'Métricas del modelo en tiempo real' },
            { src: '/projects/retailvision-reporte.webp', caption: 'Reporte para toma de decisiones' },
            // { src: '/projects/retailvision-monitor.webp', caption: 'Monitor en vivo' }, // activar con captura en vivo
        ],
        layers: {
            design: {
                src: '/projects/retailvision-analisis.webp',
                caption: 'Diseño · métricas del modelo en tiempo real: precisión, recall y F1.',
            },
            code: {
                file: 'main.py',
                note: 'extracto de capture_loop',
                caption: 'Código · un hilo de captura por cámara que nunca espera a YOLO y se reconecta solo.',
                src: `def capture_loop(cam_id: str):
    source = CAMERAS[cam_id]["source"]
    flags  = cv2.CAP_DSHOW if isinstance(source, int) else cv2.CAP_ANY

    while True:
        cap = cv2.VideoCapture(source, flags)
        cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)

        if not cap.isOpened():
            _estados[cam_id]["activa"] = False
            time.sleep(5)
            continue

        _estados[cam_id]["activa"] = True
        fail_count = 0
        while True:
            ret, frame = cap.read()
            if not ret:
                fail_count += 1
                if fail_count >= 10:
                    break
                time.sleep(0.1)
                continue
            fail_count = 0
            with _frame_locks[cam_id]:
                _frames_raw[cam_id] = frame

        cap.release()
        time.sleep(3)`,
            },
            arch: {
                caption: 'Arquitectura · captura e inferencia desacopladas, tres salidas hacia React.',
                cols: [
                    { title: 'Fuentes', items: ['Webcam local', 'RTSP / cámara IP', 'Archivo de video'] },
                    { title: 'FastAPI · 1 hilo por cámara', items: ['Captura (reconecta sola)', 'Inferencia YOLOv8', 'Estado en memoria'] },
                    { title: 'Salidas', items: ['WebSocket /ws/monitor', 'REST /api/*', 'MJPEG /video'] },
                    { title: 'React', items: ['Monitor', 'Análisis', 'Reportes'] },
                ],
            },
        },
        video: 'https://youtu.be/cygu65ytwTc?si=QZDDV75dxKx0iAmt', // referencial
        github: 'https://github.com/lcrisantosi7-cris/retailvision-analytics',
        demo: '#',
    },
    {
        slug: 'alfapet',
        title: 'AlfaPet',
        channel: 'sistemas',
        status: 'production', // confirma: ¿producción o desarrollo?
        video: 'https://youtu.be/Krr2u8BUtLw?si=nzwesXxsIRjFGa_i',
        year: '2026',
        kind: 'Personal', // confirma
        accent: '255 179 136',
        icon: PawPrint,
        thumb: '/projects/alfapet-login.webp',
        tagline: 'Todo lo de una clínica veterinaria en un solo panel.',
        description: 'Pacientes, citas, consultas, vacunas, cirugías, análisis, internamiento, inventario y caja, con arquitectura MVC y POO bajo ISO 25010.',
        tags: ['Supabase', 'MVC', 'POO', 'ISO 25010'],
        problem: 'Agenda, historiales, vacunas y stock suelen vivir en lugares distintos.',
        solution: 'Un solo panel donde el equipo de la clínica atiende pacientes, agenda citas, registra consultas y controla inventario y caja con datos reales.',
        metrics: [
            { v: '10', l: 'Módulos clínicos' },
            { v: 'MVC', l: 'Arquitectura · POO' },
            { v: 'ISO 25010', l: 'Calidad de software' },
        ],
        highlights: [
            'Agenda de citas, consultas e historial clínico',
            'Vacunas, cirugías, análisis e internamiento por habitación',
            'Productos, inventario, ventas y caja',
            'Panel con datos reales: ingresos, alertas y ocupación',
        ],
        architecture: ['Interfaz web', 'Controladores MVC', 'Modelos POO', 'Supabase'],
        gallery: [
            { src: '/projects/alfapet-login.webp', caption: 'Acceso para el equipo de la clínica' },
            { src: '/projects/alfapet-dashboard.webp', caption: 'Panel principal con datos reales' },
        ],
        github: 'https://github.com/lcrisantosi7-cris/AlfaPet',
        demo: 'https://alfapet.vercel.app/',
        demoNote: 'El panel es de acceso restringido. Mira el video o pídeme un usuario de prueba.',
    },
    {
        slug: 'plantmilk',
        title: 'PlantMilk',
        channel: 'ecommerce',
        status: 'dev', // confirma
        year: '2026',
        kind: 'Concepto de marca',

        accent: '143 142 232',
        icon: Leaf,
        thumb: '/projects/plantmilk-pack.webp',
        thumbPos: 'center',
        tagline: 'Una marca de leches vegetales que se siente premium y vende sola.',
        description: 'Sitio inmersivo con historia, proceso, comparador y tienda conectada a Shopify, con animaciones GSAP y partículas 3D.',
        tags: ['React', 'TanStack Start', 'Shopify', 'GSAP', 'Three.js', 'Tailwind'],
        problem: 'Una marca pequeña necesita verse premium y vender sin depender de una plantilla genérica.',
        solution: 'Un sitio que cuenta la marca con movimiento y conecta su catálogo y carrito con Shopify.',
        metrics: [
            { v: 'Shopify', l: 'Tienda conectada' },
            { v: '3D', l: 'Partículas con Three.js' },
            { v: 'Light / Dark', l: 'Tema claro y oscuro' },
        ],
        highlights: [
            'Landing narrativa por capítulos: origen, historia y proceso en cuatro pasos',
            'Comparador interactivo de leches con perfil sensorial',
            'Calculadora de impacto: agua, emisiones y tierra por año',
            'Catálogo y tienda conectados a Shopify, con carrito y favoritos',
        ],
        architecture: ['TanStack Start + React 19', 'GSAP · Lenis · Three.js', 'Zustand', 'Shopify Storefront API'],
        gallery: [
            { src: '/projects/plantmilk-pack.webp', caption: 'Línea de productos', pos: 'center' },
            { src: '/projects/plantmilk-cacao.webp', caption: 'Avena y cacao', pos: 'center' },
            { src: '/projects/plantmilk-pistacho.webp', caption: 'Pistacho', pos: 'center' },
        ],
        github: 'https://github.com/lcrisantosi7-cris/plantmilk',
        demo: 'https://plantmilk.lovable.app',
        demoNote: 'Emprendimiento.',

    },
    {
        slug: 'gestion-escolar',
        title: 'Sistema de Gestión Escolar',
        channel: 'sistemas',
        status: 'production',
        year: '2023',
        kind: 'Académico',
        accent: '104 103 210',
        icon: School,
        tagline: 'Administración académica con roles y concurrencia.',
        description: 'Plataforma MVC para administración académica. Manejo de concurrencia y roles.',
        tags: ['PHP', 'MySQL', 'JavaScript', 'MVC'],
        github: 'https://github.com/lcrisantosi7-cris/Sistema-Gestion-Escolar',
        demo: '#',
    },
]

// ─── SKILLS ───────────────────────────────────────────────────────────────────
export const SKILLS = [
    { name: 'Node.js', category: 'backend', level: 85, icon: Server, color: '#22c55e' },
    { name: 'PHP', category: 'backend', level: 80, icon: Terminal, color: '#8b5cf6' },
    { name: 'Python', category: 'backend', level: 70, icon: Cpu, color: '#3776ab' },
    { name: 'FastAPI', category: 'backend', level: 68, icon: Zap, color: '#14b8a6' },
    { name: 'React', category: 'frontend', level: 80, icon: Braces, color: '#3b82f6' },
    { name: 'HTML5/CSS3', category: 'frontend', level: 95, icon: Globe, color: '#f97316' },
    { name: 'JavaScript', category: 'frontend', level: 90, icon: Code2, color: '#eab308' },
    { name: 'Tailwind CSS', category: 'frontend', level: 85, icon: LayoutTemplate, color: '#06b6d4' },
    { name: 'MySQL / MariaDB', category: 'database', level: 85, icon: Database, color: '#0ea5e9' },
    { name: 'SQL Server', category: 'database', level: 70, icon: ShieldCheck, color: '#ef4444' },
    { name: 'AWS Services', category: 'cloud', level: 65, icon: Cloud, color: '#f59e0b' },
    { name: 'Docker', category: 'cloud', level: 60, icon: Container, color: '#3b82f6' },
    { name: 'Git & GitHub', category: 'tools', level: 85, icon: GitBranch, color: '#f43f5e' },
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