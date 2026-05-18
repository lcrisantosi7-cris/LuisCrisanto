/**
 * emailTemplates.js
 * Dark elegant — matches portfolio aesthetic (#111, emerald accents).
 */

const EMERALD = '#10b981';
const EMERALD_DIM = '#059669';

// ─── Notification (para ti) ───────────────────────────────────────────────────
const buildNotificationHtml = (name, email, message) => {
  const timestamp = new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima',
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 16px;background-color:#0a0a0a;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0">

        <!-- Top label -->
        <tr>
          <td style="padding-bottom:20px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:8px;vertical-align:middle;">
                  <div style="width:6px;height:6px;background:${EMERALD};border-radius:50%;"></div>
                </td>
                <td style="vertical-align:middle;">
                  <span style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${EMERALD};">
                    lc.dev · Nuevo mensaje
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:#111111;border-radius:16px;border:1px solid #1f1f1f;overflow:hidden;">

            <!-- Card top accent line -->
            <tr>
              <td style="height:3px;background:linear-gradient(90deg,${EMERALD},${EMERALD_DIM},transparent);font-size:0;line-height:0;">&nbsp;</td>
            </tr>

            <!-- Sender block -->
            <tr>
              <td style="padding:32px 36px 28px;border-bottom:1px solid #1f1f1f;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <!-- Avatar initial -->
                    <td width="48" style="vertical-align:top;padding-right:16px;">
                      <div style="width:48px;height:48px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;text-align:center;line-height:48px;font-size:18px;font-weight:800;color:${EMERALD};">
                        ${name.charAt(0).toUpperCase()}
                      </div>
                    </td>
                    <td style="vertical-align:top;">
                      <p style="margin:0 0 2px;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#555555;">Remitente</p>
                      <p style="margin:0 0 4px;font-size:17px;font-weight:700;color:#ffffff;">${name}</p>
                      <a href="mailto:${email}" style="font-size:13px;color:${EMERALD};text-decoration:none;">${email}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Message block -->
            <tr>
              <td style="padding:28px 36px 36px;">
                <p style="margin:0 0 14px;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#555555;">Mensaje</p>

                <!-- Message bubble -->
                <div style="background:#0f0f0f;border:1px solid #1f1f1f;border-left:3px solid ${EMERALD};border-radius:0 10px 10px 0;padding:20px 22px;margin-bottom:32px;">
                  <p style="margin:0;font-size:15px;color:#cccccc;line-height:1.75;white-space:pre-wrap;">${message}</p>
                </div>

                <!-- CTA button -->
                <a href="mailto:${email}?subject=Re: Tu mensaje en mi portafolio"
                   style="display:inline-block;padding:13px 26px;background:${EMERALD};color:#000000;
                          font-size:14px;font-weight:700;text-decoration:none;border-radius:8px;
                          letter-spacing:0.3px;">
                  Responder ahora →
                </a>
              </td>
            </tr>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 4px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="font-size:12px;color:#3a3a3a;">${timestamp}</span>
                </td>
                <td align="right">
                  <span style="font-size:12px;color:#3a3a3a;font-family:monospace;">lc.dev</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
};


// ─── Confirmation (para el cliente) ──────────────────────────────────────────
const buildConfirmationHtml = (name) => `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 16px;background-color:#0a0a0a;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0">

        <!-- Top label -->
        <tr>
          <td style="padding-bottom:20px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:8px;vertical-align:middle;">
                  <div style="width:6px;height:6px;background:${EMERALD};border-radius:50%;"></div>
                </td>
                <td style="vertical-align:middle;">
                  <span style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${EMERALD};">
                    lc.dev · Acuse de recibo
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:#111111;border-radius:16px;border:1px solid #1f1f1f;overflow:hidden;">

            <!-- Top accent line -->
            <tr>
              <td style="height:3px;background:linear-gradient(90deg,${EMERALD},${EMERALD_DIM},transparent);font-size:0;line-height:0;">&nbsp;</td>
            </tr>

            <!-- Hero section -->
            <tr>
              <td style="padding:40px 36px 32px;border-bottom:1px solid #1f1f1f;">
                <!-- Check icon -->
                <div style="width:52px;height:52px;background:#0d2a1e;border:1px solid #1a4a30;border-radius:14px;text-align:center;line-height:52px;font-size:24px;margin-bottom:20px;">
                  ✓
                </div>
                <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                  Mensaje recibido, ${name}.
                </h1>
                <p style="margin:0;font-size:15px;color:#888888;line-height:1.7;max-width:420px;">
                  Revisaré tu propuesta y te responderé en
                  <span style="color:#ffffff;font-weight:600;">menos de 24 horas</span>
                  en días laborables.
                </p>
              </td>
            </tr>

            <!-- Links section -->
            <tr>
              <td style="padding:28px 36px;border-bottom:1px solid #1f1f1f;">
                <p style="margin:0 0 16px;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#555555;">
                  Mientras tanto
                </p>
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right:12px;">
                      <a href="https://github.com/lcrisantosi7-cris/"
                         style="display:inline-block;padding:10px 20px;background:#1a1a1a;border:1px solid #2a2a2a;
                                color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;border-radius:8px;">
                        GitHub ↗
                      </a>
                    </td>
                    <td>
                      <a href="https://www.linkedin.com/in/luis-crisanto-silupú"
                         style="display:inline-block;padding:10px 20px;background:#1a1a1a;border:1px solid #2a2a2a;
                                color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;border-radius:8px;">
                        LinkedIn ↗
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Signature -->
            <tr>
              <td style="padding:24px 36px;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right:14px;vertical-align:middle;">
                      <div style="width:40px;height:40px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:10px;text-align:center;line-height:40px;font-size:15px;font-weight:800;color:${EMERALD};">
                        L
                      </div>
                    </td>
                    <td style="vertical-align:middle;">
                      <p style="margin:0;font-size:14px;font-weight:700;color:#ffffff;">Luis Crisanto</p>
                      <p style="margin:2px 0 0;font-size:12px;color:#555555;font-family:monospace;">Full Stack Developer · lc.dev</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 4px 0;text-align:center;">
            <p style="margin:0;font-size:12px;color:#333333;">
              Mensaje automático — no respondas directamente a este correo.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;

module.exports = { buildNotificationHtml, buildConfirmationHtml };