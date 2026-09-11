/**
 * emailTemplates.js
 * Diseño premium dark — compatible Gmail / Outlook / Apple Mail.
 */

const E = '#8b5cf6'  // emerald-500
const ED = '#7c3aed'  // emerald-600
const BG = '#09090b'  // zinc-950
const C = '#111113'  // card bg
const URL = 'https://luis-crisanto.vercel.app'

// ─── Notificación para Luis ───────────────────────────────────────────────────
export const buildNotificationHtml = (name, email, message) => {
  const ts = new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima',
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Nuevo mensaje — LC.dev</title>
</head>
<body style="margin:0;padding:0;background:${BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:48px 16px;">
<tr><td align="center">
<table width="100%" style="max-width:600px;" cellpadding="0" cellspacing="0">

  <!-- EYEBROW -->
  <tr><td style="padding-bottom:20px;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:8px;vertical-align:middle;">
        <div style="width:7px;height:7px;background:${E};border-radius:50%;"></div>
      </td>
      <td style="vertical-align:middle;">
        <span style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${E};">
          LC.dev &nbsp;·&nbsp; Nuevo mensaje
        </span>
      </td>
    </tr></table>
  </td></tr>

  <!-- CARD -->
  <tr><td style="background:${C};border-radius:20px;border:1px solid #1e1e22;overflow:hidden;">
  <table width="100%" cellpadding="0" cellspacing="0">

    <!-- Accent bar -->
    <tr><td style="height:4px;background:linear-gradient(90deg,${E},${ED},transparent);font-size:0;line-height:0;">&nbsp;</td></tr>

    <!-- SENDER -->
    <tr><td style="padding:36px 40px 28px;border-bottom:1px solid #1e1e22;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td width="60" style="vertical-align:top;padding-right:18px;">
          <div style="width:56px;height:56px;background:linear-gradient(135deg,#1e1b4b,#312e81);border:1px solid #312e81;border-radius:16px;text-align:center;line-height:56px;font-size:24px;font-weight:800;color:${E};">
            ${name.charAt(0).toUpperCase()}
          </div>
        </td>
        <td style="vertical-align:top;">
          <p style="margin:0 0 3px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#52525b;">De</p>
          <p style="margin:0 0 5px;font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.3px;">${name}</p>
          <a href="mailto:${email}" style="font-size:13px;color:${E};text-decoration:none;font-family:monospace;">${email}</a>
        </td>
        <td style="vertical-align:top;text-align:right;">
          <p style="margin:0;font-size:11px;color:#3f3f46;line-height:1.6;">${ts}</p>
        </td>
      </tr></table>
    </td></tr>

    <!-- MESSAGE -->
    <tr><td style="padding:32px 40px 40px;">
      <p style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#52525b;">Mensaje</p>
      <div style="background:#0c0c0e;border:1px solid #1e1e22;border-left:3px solid ${E};border-radius:0 14px 14px 0;padding:22px 26px;margin-bottom:32px;">
        <p style="margin:0;font-size:15px;color:#d4d4d8;line-height:1.85;white-space:pre-wrap;">${message}</p>
      </div>
      <a href="mailto:${email}?subject=Re%3A%20Tu%20mensaje%20en%20mi%20portafolio"
         style="display:inline-block;padding:14px 28px;background:${E};color:#000;font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;letter-spacing:0.2px;">
        Responder ahora &rarr;
      </a>
    </td></tr>

  </table>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="padding:18px 4px 0;text-align:center;">
    <p style="margin:0;font-size:12px;color:#27272a;font-family:monospace;">
      <a href="${URL}" style="color:#3f3f46;text-decoration:none;">luis-crisanto.vercel.app</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

// ─── Confirmación para el usuario ─────────────────────────────────────────────
export const buildConfirmationHtml = (name) => `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Mensaje recibido — LC.dev</title>
</head>
<body style="margin:0;padding:0;background:${BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:48px 16px;">
<tr><td align="center">
<table width="100%" style="max-width:560px;" cellpadding="0" cellspacing="0">

  <!-- EYEBROW -->
  <tr><td style="padding-bottom:20px;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:8px;vertical-align:middle;">
        <div style="width:7px;height:7px;background:${E};border-radius:50%;"></div>
      </td>
      <td style="vertical-align:middle;">
        <span style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${E};">
          LC.dev &nbsp;·&nbsp; Confirmación
        </span>
      </td>
    </tr></table>
  </td></tr>

  <!-- CARD -->
  <tr><td style="background:${C};border-radius:20px;border:1px solid #1e1e22;overflow:hidden;">
  <table width="100%" cellpadding="0" cellspacing="0">

    <!-- Accent bar -->
    <tr><td style="height:4px;background:linear-gradient(90deg,${E},${ED},transparent);font-size:0;line-height:0;">&nbsp;</td></tr>

    <!-- HERO -->
    <tr><td style="padding:48px 40px 36px;border-bottom:1px solid #1e1e22;text-align:center;">
      <!-- Check icon -->
      <div style="width:68px;height:68px;background:linear-gradient(135deg,#1e1b4b,#312e81);border:1px solid #312e81;border-radius:50%;text-align:center;line-height:68px;font-size:30px;margin:0 auto 28px;color:${E};">&#10003;</div>
      <h1 style="margin:0 0 16px;font-size:30px;font-weight:800;color:#fff;letter-spacing:-0.5px;line-height:1.2;">
        ¡Gracias por escribirme,<br/>${name}!
      </h1>
      <p style="margin:0 auto;font-size:16px;color:#71717a;line-height:1.75;max-width:380px;">
        Recibí tu mensaje y lo revisaré pronto.<br/>
        Te responderé en <span style="color:#fff;font-weight:600;">menos de 24 horas</span> en días laborables.
      </p>
    </td></tr>

    <!-- DIVIDER INFO -->
    <tr><td style="padding:32px 40px;border-bottom:1px solid #1e1e22;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="vertical-align:middle;padding-right:16px;">
          <div style="width:40px;height:40px;background:#18181b;border:1px solid #27272a;border-radius:10px;text-align:center;line-height:40px;font-size:18px;">📬</div>
        </td>
        <td style="vertical-align:middle;">
          <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#e4e4e7;">Respuesta garantizada</p>
          <p style="margin:0;font-size:12px;color:#52525b;">Reviso mi bandeja todos los días. Si es urgente, escríbeme por LinkedIn.</p>
        </td>
      </tr></table>
    </td></tr>

    <!-- LINKS -->
    <tr><td style="padding:28px 40px;border-bottom:1px solid #1e1e22;">
      <p style="margin:0 0 18px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#52525b;">Mientras tanto, explora</p>
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="padding-right:10px;">
          <a href="${URL}/projects"
             style="display:inline-block;padding:11px 20px;background:#18181b;border:1px solid #27272a;color:#e4e4e7;font-size:13px;font-weight:600;text-decoration:none;border-radius:10px;">
            Proyectos &nearr;
          </a>
        </td>
        <td style="padding-right:10px;">
          <a href="https://github.com/lcrisantosi7-cris/"
             style="display:inline-block;padding:11px 20px;background:#18181b;border:1px solid #27272a;color:#e4e4e7;font-size:13px;font-weight:600;text-decoration:none;border-radius:10px;">
            GitHub &nearr;
          </a>
        </td>
        <td>
          <a href="https://www.linkedin.com/in/luis-crisanto-silup%C3%BA"
             style="display:inline-block;padding:11px 20px;background:#18181b;border:1px solid #27272a;color:#e4e4e7;font-size:13px;font-weight:600;text-decoration:none;border-radius:10px;">
            LinkedIn &nearr;
          </a>
        </td>
      </tr></table>
    </td></tr>

    <!-- SIGNATURE -->
    <tr><td style="padding:28px 40px;">
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="vertical-align:middle;padding-right:16px;">
          <div style="width:48px;height:48px;background:linear-gradient(135deg,#1e1b4b,#312e81);border:1px solid #312e81;border-radius:14px;text-align:center;line-height:48px;font-size:18px;font-weight:800;color:${E};">LC</div>
        </td>
        <td style="vertical-align:middle;">
          <p style="margin:0 0 3px;font-size:15px;font-weight:700;color:#fff;">Luis Crisanto</p>
          <p style="margin:0;font-size:12px;color:#52525b;font-family:monospace;">Ingeniero de Sistemas &middot; Full Stack Dev</p>
          <a href="${URL}" style="font-size:12px;color:${E};text-decoration:none;font-family:monospace;">luis-crisanto.vercel.app</a>
        </td>
      </tr></table>
    </td></tr>

  </table>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="padding:18px 4px 0;text-align:center;">
    <p style="margin:0;font-size:12px;color:#27272a;">
      Mensaje automático &mdash; no respondas directamente a este correo.
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
