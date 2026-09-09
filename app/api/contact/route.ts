import { NextResponse } from 'next/server';

function isGibberish(text: string): boolean {
  const clean = text.toLowerCase().trim();

  if (!/[a-zA-Z\u0900-\u097F]/.test(clean)) return true;
  if (/(.)\1{3,}/i.test(clean)) return true;

  const lettersOnly = clean.replace(/[^a-z]/g, '');
  if (lettersOnly.length >= 4) {
    const vowels = lettersOnly.match(/[aeiouy]/g);
    const vowelCount = vowels ? vowels.length : 0;
    const vowelRatio = vowelCount / lettersOnly.length;

    if (vowelRatio < 0.15) return true;
    if (/[bcdfghjklmnpqrstvwxz]{5,}/i.test(clean)) return true;
  }

  return false;
}

function isMeaningfulMessage(msg: string): { valid: boolean; reason?: string } {
  const clean = msg.trim();

  if (clean.length < 10) {
    return { valid: false, reason: 'Message is too short. Please provide at least 10 characters.' };
  }

  const words = clean.split(/\s+/).filter((w) => w.length > 1);
  if (words.length < 2) {
    return { valid: false, reason: 'Please write a complete sentence or query (at least 2 words).' };
  }

  for (const word of words) {
    if (word.length > 5 && isGibberish(word)) {
      return { valid: false, reason: 'Message contains unrecognized or random gibberish words.' };
    }
  }

  return { valid: true };
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    const cleanEmail = email?.toLowerCase().trim();
    const cleanName = name?.trim();
    const cleanSubject = subject?.trim() || 'General Inquiry';
    const cleanMessage = message?.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    if (cleanName.length < 2 || cleanName.length > 50) {
      return NextResponse.json({ error: 'Name must be between 2 and 50 characters.' }, { status: 400 });
    }
    if (isGibberish(cleanName)) {
      return NextResponse.json({ error: 'Please enter a valid human name.' }, { status: 400 });
    }

    const messageCheck = isMeaningfulMessage(cleanMessage);
    if (!messageCheck.valid) {
      return NextResponse.json({ error: messageCheck.reason }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server mail configuration missing (BREVO_API_KEY).' }, { status: 500 });
    }

    // Brevo API call using contact@rmnlove.com as Sender & Receiver
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'RMN WordCounter Support',
          email: 'contact@rmnlove.com', // Sender contact@
        },
        to: [
          { email: 'contact@rmnlove.com', name: 'RMN Contact Desk' }, // Receiver contact@ (Jo redirect hoke Gmail me aayega)
        ],
        replyTo: { email: cleanEmail, name: cleanName }, // Gmail me reply karne par seedha user ko jayega
        subject: `[WordCounter Query] ${cleanSubject} - From ${cleanName}`,
        htmlContent: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff; color: #1e293b; max-width: 600px;">
            <div style="display: inline-block; padding: 4px 10px; background: #ecfdf5; color: #047857; font-size: 12px; font-weight: bold; border-radius: 9999px; margin-bottom: 12px;">
              ✔ Verified Form Submission
            </div>
            <h2 style="margin: 0 0 16px; font-size: 18px; color: #0f172a; border-bottom: 2px solid #6366f1; padding-bottom: 8px;">
              New Message via contact@rmnlove.com
            </h2>
            <p style="margin: 6px 0; font-size: 14px;"><strong>From:</strong> ${cleanName}</p>
            <p style="margin: 6px 0; font-size: 14px;"><strong>User Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
            <p style="margin: 6px 0; font-size: 14px;"><strong>Subject:</strong> ${cleanSubject}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p style="font-size: 13px; font-weight: bold; color: #64748b; margin-bottom: 6px;">Message:</p>
            <div style="background: #f8fafc; padding: 14px; border-radius: 8px; font-size: 14px; line-height: 1.6; border: 1px solid #f1f5f9; white-space: pre-wrap;">${cleanMessage}</div>
            <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">Hit 'Reply' in Gmail to respond directly to ${cleanName} (${cleanEmail}).</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return NextResponse.json({ error: errData?.message || 'Failed to deliver message via Brevo.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}