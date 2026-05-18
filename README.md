# 🚀 Personal Portfolio - Full Stack Developer

¡Bienvenido a mi portafolio profesional! Este proyecto es una plataforma interactiva diseñada para mostrar mi trayectoria como desarrollador Full Stack y estudiante de Ingeniería de Sistemas. Enfocado en **arquitectura sólida**, **rendimiento** y **experiencia de usuario**.

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**

- **React.js** (Vite) - Interfaz reactiva y moderna.
- **Framer Motion** - Animaciones fluidas y micro-interacciones.
- **Tailwind CSS** - Estilizado utilitario con temática _dark mode_.
- **Lucide React** - Set de iconos vectoriales.

### **Backend**

- **Node.js & Express** - Servidor robusto y escalable.
- **Nodemailer / Resend API** - Gestión profesional de mensajería.
- **Express Rate Limit** - Seguridad contra ataques de fuerza bruta (DoS).
- **CORS & Dotenv** - Configuración de seguridad y variables de entorno.

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura desacoplada para mayor escalabilidad:

- **Frontend:** Desplegado en **Vercel** para carga ultrarrápida a través de su CDN.
- **Backend:** Alojado en **Render**, manejando la lógica de contacto y seguridad del servidor.
- **Seguridad:** Implementación de sanitización de entradas, límites de peticiones por IP y manejo de errores centralizado.

---

## 🚀 Instalación y Configuración

Si deseas ejecutar este proyecto localmente, sigue estos pasos:

### 1. Clonar el repositorio

```bash
git clone https://github.com/lcrisantosi7-cris/mi-portafolio.git
cd mi-portafolio
```

### 2. Instalar dependencias

```bash
npm install --no-audit --no-fund
```

### 3. Variables de entorno (desarrollo)

- Backend (crear `backend/.env`):

```env
ALLOWED_ORIGIN=http://localhost:5173
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password-o-app-password-de-gmail
PORT=3000
# Opcional: usar Resend para mejor entregabilidad
# RESEND_API_KEY=tu_resend_api_key
# RESEND_FROM=tu@dominio.com
# RESEND_TO=tu@dominio.com
```

- Frontend (crear `.env.local` o `.env` en la raíz del proyecto):

```env
VITE_BACKEND_URL=http://localhost:3000
```

### 4. Ejecutar backend

```bash
node backend/server.js
```

### 5. Ejecutar frontend

```bash
npm run dev
```

Esto permite desarrollar localmente con el frontend apuntando a `http://localhost:3000` y mantener la URL de producción configurada en Vite para despliegue.
