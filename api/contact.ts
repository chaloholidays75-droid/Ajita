/// <reference types="node" />
import nodemailer from 'nodemailer';

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

type VercelRequestLike = {
  method?: string;
  body?: ContactPayload;
};

type VercelResponseLike = {
  status: (code: number) => {
    json: (body: unknown) => void;
  };
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: VercelRequestLike, res: VercelResponseLike) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const smtpHost = process.env.SMTP_HOST;
     const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactToEmail = process.env.CONTACT_TO_EMAIL || smtpUser;
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;
    const secure = smtpPort === 465;

    if (!smtpHost || !smtpUser || !smtpPass || !contactToEmail || !contactFromEmail) {
      console.error('Contact form config validation failed', {
        smtpConfig: {
          hostPresent: Boolean(smtpHost),
          hostValue: smtpHost || null,
          port: smtpPort,
          secure,
          userPresent: Boolean(smtpUser),
          passPresent: Boolean(smtpPass),
          fromPresent: Boolean(contactFromEmail),
          toPresent: Boolean(contactToEmail),
        },
      });
      return res.status(500).json({ error: 'Email service is not configured.' });
    }

    const { name, email, message } = req.body ?? {};

    console.log('Contact form request received', {
      method: req.method,
      fields: {
        namePresent: Boolean(name),
        emailPresent: Boolean(email),
        messagePresent: Boolean(message),
      },
      smtpConfig: {
        hostPresent: Boolean(smtpHost),
        hostValue: smtpHost || null,
        port: smtpPort,
        secure,
        userValue: smtpUser,
        userPresent: Boolean(smtpUser),
        passPresent: Boolean(smtpPass),
        fromPresent: Boolean(contactFromEmail),
        fromValue: contactFromEmail,
        toPresent: Boolean(contactToEmail),
        toValue: contactToEmail,
      },
    });

    if (!name || !email || !message) {
      console.error('Contact form validation failed', {
        fields: {
          namePresent: Boolean(name),
          emailPresent: Boolean(email),
          messagePresent: Boolean(message),
        },
      });
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log('SMTP USER:', smtpUser);
    console.log('Attempting Titan SMTP...', {
      host: smtpHost,
      port: smtpPort,
      secure,
    });

    console.log('Contact form SMTP verify starting', {
      smtpConfig: {
        host: smtpHost,
        port: smtpPort,
        secure,
        user: smtpUser,
        from: contactFromEmail,
        to: contactToEmail,
      },
    });

    try {
      await transporter.verify();
      console.log('Contact form SMTP verify succeeded', {
        smtpConfig: {
          host: smtpHost,
          port: smtpPort,
          secure,
          user: smtpUser,
        },
      });
    } catch (verifyError) {
      console.error('Contact form SMTP verify failed', {
        smtpConfig: {
          host: smtpHost,
          port: smtpPort,
          secure,
          user: smtpUser,
          from: contactFromEmail,
          to: contactToEmail,
        },
        error: verifyError,
        message: verifyError instanceof Error ? verifyError.message : 'Unknown verify error',
        stack: verifyError instanceof Error ? verifyError.stack : undefined,
      });
      throw verifyError;
    }

    console.log('Contact form sendMail starting', {
      subject: `New Contact Form Submission from ${name}`,
    });
    await transporter.sendMail({
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });
    console.log('Contact form sendMail succeeded', {
      to: contactToEmail,
      from: contactFromEmail,
      replyTo: email,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact form email error', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    const message =
      error instanceof Error ? error.message : 'Failed to send email.';

    return res.status(500).json({ error: message });
  }
}
