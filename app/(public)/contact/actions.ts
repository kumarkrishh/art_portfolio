"use server";

import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  message: z.string().trim().min(10, "Please enter a longer message."),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: "Contact form delivery is not configured yet. Please email info@sree.art directly.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const senderName = parsed.data.name.replace(/[<>"]/g, "").trim();
    const submittedAt = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    const escapedSenderName = escapeHtml(senderName);
    const escapedEmail = escapeHtml(parsed.data.email);
    const escapedMessage = escapeHtml(parsed.data.message);
    const escapedSubmittedAt = escapeHtml(submittedAt);

    await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ??
        "Sree Art Contact <onboarding@resend.dev>",
      to: "info@sree.art",
      replyTo: parsed.data.email,
      subject: `New inquiry from ${parsed.data.name}`,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; background: #f6f1ea; padding: 32px; color: #27272a;">
          <div style="max-width: 680px; margin: 0 auto; background: rgba(255,255,255,0.92); border: 1px solid #e7ded2; border-radius: 24px; overflow: hidden;">
            <div style="padding: 28px 32px; border-bottom: 1px solid #efe7dc; background: linear-gradient(180deg, #f8f4ee 0%, #f5eee6 100%);">
              <p style="margin: 0 0 8px; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #78716c;">Sree Art Contact Form</p>
              <h1 style="margin: 0; font-size: 28px; line-height: 1.2; font-weight: 600; color: #18181b;">New inquiry from ${escapedSenderName}</h1>
            </div>
            <div style="padding: 28px 32px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 0 0 14px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #78716c; width: 120px;">From</td>
                  <td style="padding: 0 0 14px; font-size: 16px; color: #18181b;">${escapedSenderName}</td>
                </tr>
                <tr>
                  <td style="padding: 0 0 14px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #78716c;">Email</td>
                  <td style="padding: 0 0 14px; font-size: 16px;"><a href="mailto:${escapedEmail}" style="color: #7c2d12; text-decoration: none;">${escapedEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 0; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #78716c;">Received</td>
                  <td style="padding: 0; font-size: 16px; color: #18181b;">${escapedSubmittedAt}</td>
                </tr>
              </table>
              <div style="border: 1px solid #efe7dc; border-radius: 20px; background: #fcfaf7; padding: 24px;">
                <p style="margin: 0 0 12px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #78716c;">Message</p>
                <p style="margin: 0; font-size: 17px; line-height: 1.75; color: #27272a; white-space: pre-wrap;">${escapedMessage}</p>
              </div>
            </div>
          </div>
        </div>
      `,
      text: [
        `Sree Art Contact Form`,
        ``,
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        `Reply-To: ${parsed.data.email}`,
        `Received: ${submittedAt}`,
        "",
        parsed.data.message,
      ].join("\n"),
    });

    return {
      status: "success",
      message: "Message sent. I'll get back to you soon.",
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong while sending your message. Please try again or email info@sree.art directly.",
    };
  }
}
