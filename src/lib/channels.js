export const CHANNELS = [
    { cam: '01', name: 'Inicio', path: '/', rgb: '252 143 84' },
    { cam: '02', name: 'Sobre mí', path: '/sobre-mi', rgb: '104 103 210' },
    { cam: '03', name: 'Experiencia', path: '/experiencia', rgb: '245 82 91' },
    { cam: '04', name: 'Proyectos', path: '/proyectos', rgb: '255 179 136' },
    { cam: '05', name: 'Servicios', path: '/servicios', rgb: '143 142 232' },
]

export const CONTACT = { cam: '06', name: 'Contacto', path: '/contacto', rgb: '252 143 84' }

export const channelFor = (pathname) =>
    [...CHANNELS, CONTACT].find((c) => (c.path === '/' ? pathname === '/' : pathname.startsWith(c.path))) ??
    CHANNELS[0]