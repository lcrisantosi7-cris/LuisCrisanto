const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const { buildNotificationHtml, buildConfirmationHtml } = require('./emailTemplates');

// ─── Environment validation ───────────────────────────────────────────────────
const BREVO_USER = process.env.BREVO_USER;      // tu email de cuenta Brevo
const BREVO_SMTP_KEY = process.env.BREVO_SMTP_KEY;  // SMTP key de Brevo (no API key)
const NOTIFY_TO = process.env.NOTIFY_TO;       // email donde recibes los mensajes
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
const PORT = process.env.PORT || 3000;

if (!BREVO_USER || !BREVO_SMTP_KEY || !NOTIFY_TO || !ALLOWED_ORIGIN) {
  console.error(
    'Missing required env vars: BREVO_USER, BREVO_SMTP_KEY, NOTIFY_TO, ALLOWED_ORIGIN'
  );
  process.exit(1);
}

// ─── App setup ────────────────────────────────────────────────────────────────
const app = express();
app.set('trust proxy', 1);

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = ALLOWED_ORIGIN.split(',').map(s => s.trim()).filter(Boolean);
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:5173', 'http://127.0.0.1:5173');
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS origin denied'), false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.options(/.*/, cors());
app.use(express.json({ limit: '20kb' }));

// ─── Rate limiter ─────────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, _next, options) => {
    console.warn(`Rate limit reached from IP: ${req.ip}`);
    res.status(429).json(options.message);
  },
  message: { error: 'Demasiados mensajes enviados. Intenta de nuevo en 15 minutos.' },
});

// ─── Brevo SMTP transporter ───────────────────────────────────────────────────
// Brevo SMTP host: smtp-relay.brevo.com  port: 587  (STARTTLS)
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com', // cert válido (Brevo mantiene este dominio)
  port: 587,
  secure: false,          // STARTTLS
  auth: {
    user: BREVO_USER,     // login SMTP de Brevo: a95bda001@smtp-brevo.com
    pass: BREVO_SMTP_KEY, // SMTP key de Brevo
  },
  pool: true,
  maxConnections: 2,
  connectionTimeout: 20_000,
  greetingTimeout: 20_000,
});

transporter.verify((err) => {
  if (err) {
    console.error('Brevo SMTP connection error:', err.message);
    console.error('Verifica: BREVO_USER = email de tu cuenta Brevo, BREVO_SMTP_KEY = SMTP key (no API key)');
  } else {
    console.log(`Brevo SMTP ready — sending as ${BREVO_USER}`);
  }
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());

const sanitize = (str) =>
  String(str)
    .replace(/<[^>]*>/g, '')
    .replace(/[\r\n]{3,}/g, '\n\n')
    .trim()
    .slice(0, 2000);

/**
 * sendEmail — sends via Brevo SMTP.
 * @param {{ to: string, subject: string, html: string }} opts
 */
const sendEmail = ({ to, subject, html }) =>
  transporter.sendMail({
    from: `"LC.dev" <${BREVO_USER}>`,
    to,
    subject,
    html,
  });

// ─── Routes ───────────────────────────────────────────────────────────────────

// POST /api/contact
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'El correo electrónico no es válido.' });
  }

  const cleanName = sanitize(name);
  const cleanEmail = sanitize(email);
  const cleanMessage = sanitize(message);

  if (cleanName.length < 2) return res.status(400).json({ error: 'El nombre es demasiado corto.' });
  if (cleanMessage.length < 10) return res.status(400).json({ error: 'El mensaje es demasiado corto (mínimo 10 caracteres).' });

  console.log(`New contact from: ${cleanName} <${cleanEmail}>`);

  // 1. Notificación a ti — bloqueante
  try {
    await sendEmail({
      to: NOTIFY_TO,
      subject: `Nuevo mensaje de ${cleanName}`,
      html: buildNotificationHtml(cleanName, cleanEmail, cleanMessage),
    });
    console.log(`Notification sent to ${NOTIFY_TO}`);
  } catch (err) {
    console.error('Failed to send notification:', err.message);
    return res.status(500).json({ error: 'No se pudo enviar tu mensaje. Intenta de nuevo en unos minutos.' });
  }

  // 2. Confirmación al remitente — no bloqueante
  sendEmail({
    to: cleanEmail,
    subject: `¡Gracias por escribirme, ${cleanName}!`,
    html: buildConfirmationHtml(cleanName),
  }).catch((err) => {
    console.warn(`Could not send confirmation to ${cleanEmail}:`, err.message);
  });

  return res.status(200).json({ message: 'Mensaje enviado exitosamente.' });
});

// GET /health
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
  });
});

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS allowed for: ${allowedOrigins.join(', ')}`);
});
