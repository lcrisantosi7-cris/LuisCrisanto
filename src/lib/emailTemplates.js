/**
 * emailTemplates.js
 * Diseño alineado a la paleta del portafolio (naranja / coral / índigo).
 * Soporte de modo claro/oscuro vía prefers-color-scheme.
 * Nota: el soporte real varía por cliente — Apple Mail, Outlook (nuevo) y
 * clientes de escritorio lo respetan; Gmail en su mayoría lo ignora.
 */

const URL = 'https://luis-crisanto.vercel.app'

const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char])

const safeMailto = (value) => encodeURIComponent(String(value ?? '')).replace(/%40/gi, '@')

// ─── Bloque de estilos: claro por defecto, oscuro si el cliente lo soporta ───
const STYLE_BLOCK = `
  <style>
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    body { margin:0; padding:0; }
    .bg      { background:#f3f1fa !important; }
    .card    { background:#ffffff !important; border-color:#e9e5f4 !important; }
    .divider { border-color:#e9e5f4 !important; }
    .text-1  { color:#171426 !important; }
    .text-2  { color:#4c4760 !important; }
    .text-3  { color:#8b86a0 !important; }
    .chip    { background:#f6f3ff !important; border-color:#e3ddf7 !important; }
    .msgbox  { background:#f9f7ff !important; border-color:#ece7fb !important; }
    .btn-alt { background:#f6f3ff !important; border-color:#e3ddf7 !important; color:#171426 !important; }
    .badge   { background:#fdeee3 !important; border-color:#fbd9bd !important; color:#c8622a !important; }

    @media (prefers-color-scheme: dark) {
      .bg      { background:#0d0b14 !important; }
      .card    { background:#13101f !important; border-color:rgba(255,255,255,0.08) !important; }
      .divider { border-color:rgba(255,255,255,0.08) !important; }
      .text-1  { color:#ffffff !important; }
      .text-2  { color:rgba(255,255,255,0.55) !important; }
      .text-3  { color:rgba(255,255,255,0.32) !important; }
      .chip    { background:rgba(252,143,84,0.08) !important; border-color:rgba(252,143,84,0.25) !important; }
      .msgbox  { background:#0d0b14 !important; border-color:rgba(255,255,255,0.08) !important; }
      .btn-alt { background:rgba(255,255,255,0.05) !important; border-color:rgba(255,255,255,0.1) !important; color:#ffffff !important; }
      .badge   { background:rgba(252,143,84,0.1) !important; border-color:rgba(252,143,84,0.3) !important; color:#ffb388 !important; }
    }
  </style>
`

const HEAD = (title) => `
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="color-scheme" content="light dark"/>
<meta name="supported-color-schemes" content="light dark"/>
<title>${title}</title>
${STYLE_BLOCK}
`

// ─── Notificación para ti ─────────────────────────────────────────────────────
export const buildNotificationHtml = (name, email, message) => {
  const ts = new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima',
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  const [projectLine, ...rest] = message.split('\n\n')
  const hasType = projectLine.startsWith('Tipo de mensaje:')
  const projectType = hasType ? projectLine.replace('Tipo de mensaje:', '').trim() : null
  const body = hasType ? rest.join('\n\n') : message
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const emailHref = safeMailto(email)
  const safeProjectType = escapeHtml(projectType)
  const safeBody = escapeHtml(body)

  return `<!DOCTYPE html>
<html lang="es">
<head>${HEAD('Nuevo mensaje — LC.dev')}</head>
<body class="bg" style="margin:0;padding:0;background:#f3f1fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table class="bg" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1fa;padding:48px 16px;">
<tr><td align="center">
<table width="100%" style="max-width:600px;" cellpadding="0" cellspacing="0">

  <!-- EYEBROW -->
  <tr><td style="padding-bottom:20px;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:8px;vertical-align:middle;">
        <div style="width:7px;height:7px;background:#FC8F54;border-radius:50%;"></div>
      </td>
      <td style="vertical-align:middle;">
        <span class="text-3" style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#8b86a0;">
          LC.dev &nbsp;·&nbsp; Nuevo mensaje
        </span>
      </td>
    </tr></table>
  </td></tr>

  <!-- CARD -->
  <tr><td class="card" style="background:#ffffff;border-radius:20px;border:1px solid #e9e5f4;overflow:hidden;">
  <table width="100%" cellpadding="0" cellspacing="0">

    <!-- Accent bar -->
    <tr><td style="height:4px;background:linear-gradient(90deg,#FC8F54,#F5525B,#6867D2);font-size:0;line-height:0;">&nbsp;</td></tr>

    <!-- SENDER -->
    <tr><td class="divider" style="padding:36px 40px 28px;border-bottom:1px solid #e9e5f4;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td width="60" style="vertical-align:top;padding-right:18px;">
          <div style="width:56px;height:56px;background:linear-gradient(135deg,#FC8F54,#F5525B);border-radius:16px;text-align:center;line-height:56px;font-size:24px;font-weight:800;color:#fff;">
            ${escapeHtml(name.charAt(0).toUpperCase())}
          </div>
        </td>
        <td style="vertical-align:top;">
          <p class="text-3" style="margin:0 0 3px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8b86a0;">De</p>
          <p class="text-1" style="margin:0 0 5px;font-size:20px;font-weight:700;color:#171426;letter-spacing:-0.3px;">${safeName}</p>
          <a href="mailto:${emailHref}" style="font-size:13px;color:#e8672f;text-decoration:none;font-family:monospace;">${safeEmail}</a>
          ${projectType ? `
          <div class="badge" style="display:inline-block;margin-top:10px;padding:4px 10px;background:#fdeee3;border:1px solid #fbd9bd;border-radius:20px;">
            <span style="font-size:11px;font-weight:700;color:#c8622a;">${safeProjectType}</span>
          </div>` : ''}
        </td>
        <td style="vertical-align:top;text-align:right;">
          <p class="text-3" style="margin:0;font-size:11px;color:#8b86a0;line-height:1.6;">${ts}</p>
        </td>
      </tr></table>
    </td></tr>

    <!-- MESSAGE -->
    <tr><td style="padding:32px 40px 40px;">
      <p class="text-3" style="margin:0 0 14px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8b86a0;">Mensaje</p>
      <div class="msgbox" style="background:#f9f7ff;border:1px solid #ece7fb;border-left:3px solid #FC8F54;border-radius:0 14px 14px 0;padding:22px 26px;margin-bottom:32px;">
        <p class="text-2" style="margin:0;font-size:15px;color:#4c4760;line-height:1.85;white-space:pre-wrap;">${safeBody}</p>
      </div>
      <a href="mailto:${emailHref}?subject=Re%3A%20Tu%20mensaje%20en%20mi%20portafolio"
         style="display:inline-block;padding:14px 28px;background:linear-gradient(90deg,#FC8F54,#F5525B);color:#fff;font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;letter-spacing:0.2px;">
        Responder ahora &rarr;
      </a>
    </td></tr>

  </table>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="padding:18px 4px 0;text-align:center;">
    <p class="text-3" style="margin:0;font-size:12px;color:#8b86a0;font-family:monospace;">
      <a href="${URL}" style="color:#8b86a0;text-decoration:none;">luis-crisanto.vercel.app</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

// ─── Confirmación para el visitante ───────────────────────────────────────────
export const buildConfirmationHtml = (name) => {
  const safeName = escapeHtml(name)
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="color-scheme" content="light dark"/>
<meta name="supported-color-schemes" content="light dark"/>
<title>Mensaje recibido · Luis Crisanto</title>
<style>
  :root { color-scheme:light dark; supported-color-schemes:light dark; }
  body { margin:0; padding:0; }
  .mail-bg { background:#f3f1fa !important; }
  .mail-card { background:#ffffff !important; border-color:#e9e5f4 !important; }
  .mail-text { color:#171426 !important; }
  .mail-muted { color:#625d73 !important; }
  .mail-soft { background:#f9f7ff !important; border-color:#ece7fb !important; }
  .mail-link { color:#171426 !important; border-color:#e3ddf7 !important; background:#f6f3ff !important; }
  @media (prefers-color-scheme:dark) {
    .mail-bg { background:#050b18 !important; }
    .mail-card { background:#09172b !important; border-color:#203754 !important; }
    .mail-text { color:#f1eadb !important; }
    .mail-muted { color:#c2ccdc !important; }
    .mail-soft { background:#0d203a !important; border-color:#294362 !important; }
    .mail-link { color:#f1eadb !important; border-color:#39516d !important; background:#10213a !important; }
  }
  @media screen and (max-width:600px) {
    .mail-wrap { padding:24px 12px !important; }
    .mail-pad { padding-left:22px !important; padding-right:22px !important; }
    .mail-title { font-size:28px !important; }
    .mail-links a { display:block !important; margin:0 0 10px !important; text-align:center !important; }
  }
</style>
</head>
<body class="mail-bg" style="margin:0;padding:0;background:#f3f1fa;font-family:Arial,Helvetica,sans-serif;color:#171426;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="mail-bg" style="background:#f3f1fa;">
<tr><td align="center" class="mail-wrap" style="padding:48px 18px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;">
<tr><td style="padding:0 0 18px 4px;"><span style="font-size:12px;font-weight:700;letter-spacing:3px;color:#b94d1c;">LC.DEV&nbsp; / &nbsp;MENSAJE RECIBIDO</span></td></tr>
<tr><td class="mail-card" style="background:#ffffff;border:1px solid #e9e5f4;border-radius:22px;overflow:hidden;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="height:5px;background:linear-gradient(90deg,#ffc27a,#ff6a13,#6d97e6);font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td class="mail-pad" style="padding:42px 40px 32px;">
<div style="width:54px;height:54px;line-height:54px;text-align:center;border-radius:16px;background:#ff6a13;color:#071a33;font-size:27px;font-weight:700;">&#10003;</div>
<p style="margin:26px 0 10px;color:#b94d1c;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Confirmación de recepción</p>
<h1 class="mail-title mail-text" style="margin:0;color:#171426;font-size:34px;line-height:1.12;letter-spacing:-1px;">¡Gracias por escribirme, <span style="color:#e8672f;">${safeName}</span>!</h1>
<p class="mail-muted" style="margin:20px 0 0;color:#625d73;font-size:15px;line-height:1.85;">Tu mensaje llegó correctamente a mi bandeja. Lo revisaré personalmente y me pondré en contacto contigo por este mismo correo.</p>
</td></tr>
<tr><td class="mail-pad" style="padding:0 40px 30px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="mail-soft" style="background:#f9f7ff;border:1px solid #ece7fb;border-radius:14px;">
<tr><td style="padding:18px 20px;"><p style="margin:0 0 6px;color:#b94d1c;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">¿Qué sigue?</p><p class="mail-muted" style="margin:0;color:#625d73;font-size:13px;line-height:1.75;">En cuanto revise tu consulta, te responderé. Si necesitas ampliar la información, puedes contestar directamente a este correo.</p></td></tr>
</table>
</td></tr>
<tr><td class="mail-pad mail-links" style="padding:0 40px 32px;">
<a href="${URL}/projects" class="mail-link" style="display:inline-block;margin:0 7px 8px 0;padding:12px 16px;border:1px solid #e3ddf7;border-radius:9px;background:#f6f3ff;color:#171426;text-decoration:none;font-size:13px;font-weight:700;">Ver proyectos &#8599;</a>
<a href="https://github.com/lcrisantosi7-cris/" class="mail-link" style="display:inline-block;margin:0 7px 8px 0;padding:12px 16px;border:1px solid #e3ddf7;border-radius:9px;background:#f6f3ff;color:#171426;text-decoration:none;font-size:13px;font-weight:700;">GitHub &#8599;</a>
<a href="https://www.linkedin.com/in/luis-crisanto-silup%C3%BA" class="mail-link" style="display:inline-block;margin:0 0 8px;padding:12px 16px;border:1px solid #e3ddf7;border-radius:9px;background:#f6f3ff;color:#171426;text-decoration:none;font-size:13px;font-weight:700;">LinkedIn &#8599;</a>
</td></tr>
<tr><td class="mail-pad" style="padding:22px 40px;border-top:1px solid #e9e5f4;">
<p class="mail-text" style="margin:0;color:#171426;font-size:15px;font-weight:700;">Luis Crisanto</p>
<p class="mail-muted" style="margin:5px 0 0;color:#625d73;font-size:12px;">Desarrollador Full Stack · Ingeniería de Sistemas</p>
<a href="${URL}" style="display:inline-block;margin-top:8px;color:#b94d1c;font-size:12px;text-decoration:none;">luis-crisanto.vercel.app</a>
</td></tr>
</table></td></tr>
<tr><td style="padding:18px 8px 0;text-align:center;color:#8b86a0;font-size:11px;line-height:1.7;">Este correo confirma únicamente la recepción de tu mensaje.<br/>Gracias por tomarte el tiempo de contactarme.</td></tr>
</table></td></tr></table>
</body></html>`
}
