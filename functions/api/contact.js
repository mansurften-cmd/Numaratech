/**
 * POST /api/contact — Cloudflare Pages Function backing the contact form.
 *
 * Deliberately minimal. It validates, rejects obvious bots, and hands the
 * message to an email provider. It stores nothing.
 *
 * Required environment variables (Cloudflare Pages → Settings → Environment
 * variables). Set these as *secrets*, not plain text:
 *
 *   RESEND_API_KEY   API key for https://resend.com
 *   CONTACT_TO       Mailbox that receives enquiries, e.g. hello@numaratech.com
 *   CONTACT_FROM     Verified sender, e.g. "NUMARATECH <site@numaratech.com>"
 *
 * With none of these set the endpoint returns 503 and the form tells the
 * visitor to email directly — which is honest, and better than silently
 * dropping enquiries.
 */

const LIMITS = {
  name: 120,
  email: 200,
  company: 160,
  interest: 80,
  message: 4000,
};

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

/** Trims, coerces to string, and caps length. */
const clean = (value, max) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

/**
 * Loose email check. Deliberately not a full RFC implementation — the only
 * thing we need to know is whether a reply has somewhere to go.
 */
const looksLikeEmail = (value) =>
  /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(value);

/**
 * Single entry point for every method, so there is no ambiguity about which
 * handler Pages picks. Anything other than POST gets a clear 405 rather than
 * falling through to the static asset handler.
 */
export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return json(405, { message: 'Use POST.' });
  }
  return handleContact(context);
}

async function handleContact({ request, env }) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return json(400, { message: 'Expected a JSON body.' });
  }

  if (payload === null || typeof payload !== 'object') {
    return json(400, { message: 'Expected a JSON object.' });
  }

  // Honeypot. A real visitor never sees this field, so anything in it is a bot.
  // Answer 200 so the sender learns nothing from the response.
  if (clean(payload.website, 200) !== '') {
    return json(200, { message: 'Thank you — your enquiry is with us.' });
  }

  const name = clean(payload.name, LIMITS.name);
  const email = clean(payload.email, LIMITS.email);
  const company = clean(payload.company, LIMITS.company);
  const interest = clean(payload.interest, LIMITS.interest);
  const message = clean(payload.message, LIMITS.message);

  const errors = [];
  if (name.length < 2) errors.push('a name');
  if (!looksLikeEmail(email)) errors.push('a valid email address');
  if (message.length < 10) errors.push('a short description of the problem');

  if (errors.length > 0) {
    return json(422, {
      message: `Please include ${errors.join(', ')}.`,
    });
  }

  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO;
  const from = env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    return json(503, {
      message:
        'The contact form is not configured yet. Please email hello@numaratech.com and we will pick it up directly.',
    });
  }

  // Plain text only. Nothing the visitor typed is interpreted as markup
  // anywhere, so there is no injection surface in the message body.
  const body = [
    'New enquiry from the NUMARATECH website',
    '',
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Company:  ${company || '—'}`,
    `Interest: ${interest || '—'}`,
    '',
    'Message:',
    message,
  ].join('\n');

  try {
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website enquiry — ${name}${company ? ` (${company})` : ''}`,
        text: body,
      }),
    });

    if (!sent.ok) {
      // Log upstream detail for us; tell the visitor something useful.
      console.error('Resend rejected the message', sent.status, await sent.text());
      return json(502, {
        message:
          'We could not send that just now. Please email hello@numaratech.com and we will pick it up directly.',
      });
    }
  } catch (error) {
    console.error('Contact form delivery failed', error);
    return json(502, {
      message:
        'We could not send that just now. Please email hello@numaratech.com and we will pick it up directly.',
    });
  }

  return json(200, {
    message:
      'Thank you — your enquiry is with us. We reply within one working day.',
  });
}
