// amble's letters, one layout (the same as the app's, amble/src/lib/email/templates.ts):
// paper, the eye and the wordmark, a column of plain paragraphs, at most one
// dark button, a quiet footer. Tables and inline styles only, no web fonts and
// no image that carries meaning (the wordmark sits beside the eye), so Gmail,
// Outlook and iOS Mail show the same letter; Apple Mail and iOS also get a
// dark version. Every letter has a plain-text twin built from the same parts.

export interface LetterButton {
  label: string;
  href: string;
}

export interface Letter {
  lang: 'es' | 'en';
  // The grey line inboxes show after the subject.
  preheader: string;
  intro: string[];
  button?: LetterButton;
  fallback?: string;
  outro?: string[];
  signature?: string[];
  footer?: string;
}

// Served from the site's public folder.
const EYE = 'https://amble.fyi/email/eye.png';

const C = {
  paper: '#F4F1EA',
  paperLight: '#FAF8F3',
  ink: '#25251F',
  tertiary: '#6F6E65',
  moss: '#52634F',
  border: '#DCD8CE',
};

const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";

const ENTITIES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (c) => ENTITIES[c]);

function paragraph(text: string): string {
  return `<tr><td class="ink" style="padding:0 0 16px;font-family:${SANS};font-size:16px;line-height:1.6;color:${C.ink}">${escapeHtml(text)}</td></tr>`;
}

function button({ label, href }: LetterButton): string {
  const url = escapeHtml(href);
  return `<tr><td style="padding:8px 0 24px">
<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:48px;v-text-anchor:middle;width:240px" arcsize="21%" stroke="f" fillcolor="${C.ink}"><w:anchorlock/><center style="color:${C.paperLight};font-family:Arial,sans-serif;font-size:15px;font-weight:bold">${escapeHtml(label)}</center></v:roundrect><![endif]-->
<!--[if !mso]><!--><a class="button" href="${url}" style="display:inline-block;background:${C.ink};color:${C.paperLight};text-decoration:none;font-family:${SANS};font-size:15px;font-weight:600;line-height:20px;padding:14px 24px;border-radius:10px;mso-hide:all">${escapeHtml(label)}</a><!--<![endif]-->
</td></tr>`;
}

export function renderLetterHtml(letter: Letter): string {
  const rows = [
    ...letter.intro.map(paragraph),
    letter.button ? button(letter.button) : '',
    letter.button && letter.fallback
      ? `<tr><td class="muted" style="padding:0 0 24px;font-family:${SANS};font-size:13px;line-height:1.6;color:${C.tertiary}">${escapeHtml(letter.fallback)}<br><a class="link" href="${escapeHtml(letter.button.href)}" style="color:${C.moss};word-break:break-all">${escapeHtml(letter.button.href)}</a></td></tr>`
      : '',
    ...(letter.outro ?? []).map(paragraph),
    letter.signature?.length
      ? `<tr><td class="ink" style="padding:8px 0 0;font-family:${SANS};font-size:16px;line-height:1.6;color:${C.ink}">${letter.signature.map(escapeHtml).join('<br>')}</td></tr>`
      : '',
  ].join('\n');

  const footer = letter.footer
    ? `<tr><td class="rule" style="padding:32px 0 0;border-bottom:1px solid ${C.border};font-size:0;line-height:0">&nbsp;</td></tr>
<tr><td class="muted" style="padding:16px 0 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.tertiary}">${escapeHtml(letter.footer)}</td></tr>`
    : '';

  return `<!doctype html>
<html lang="${letter.lang}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title></title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
  body { margin:0; padding:0; -webkit-text-size-adjust:100%; }
  a { color:${C.moss}; }
  @media (max-width:480px) {
    .sheet { padding:28px 20px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .page, .sheet { background:#1E1E19 !important; }
    .ink, .wordmark { color:#ECE8DE !important; }
    .muted { color:#A9A79C !important; }
    .rule { border-color:#3A3A33 !important; }
    .button { background:#ECE8DE !important; color:#1E1E19 !important; }
    .link { color:#A9B8A3 !important; }
  }
</style>
</head>
<body class="page" style="margin:0;padding:0;background:${C.paper}">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${escapeHtml(letter.preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" class="page" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper}">
<tr><td align="center" style="padding:40px 12px">
<table role="presentation" class="sheet" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;background:${C.paper};padding:8px 8px">
<tr><td style="padding:0 0 32px">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="padding:0 10px 0 0;vertical-align:middle"><img src="${EYE}" width="32" height="32" alt="" style="display:block;border:0;border-radius:7px"></td>
    <td class="wordmark" style="vertical-align:middle;font-family:${SERIF};font-size:22px;line-height:32px;color:${C.ink}">amble</td>
  </tr></table>
</td></tr>
${rows}
${footer}
</table>
</td></tr>
</table>
</body>
</html>`;
}

export function renderLetterText(letter: Letter): string {
  return [
    ...letter.intro,
    ...(letter.button ? [`${letter.button.label}: ${letter.button.href}`] : []),
    ...(letter.outro ?? []),
    ...(letter.signature?.length ? [letter.signature.join('\n')] : []),
    ...(letter.footer ? ['—', letter.footer] : []),
  ].join('\n\n');
}
