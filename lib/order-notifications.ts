import "server-only";

import { Resend } from "resend";
import type Stripe from "stripe";
import { getArtworkDetailImages } from "@/lib/artwork-images";
import { artworks } from "@/lib/data";
import { getProductImageOrigin } from "@/lib/payment-config";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatAmount(amount: number | null, currency: string | null) {
  if (amount === null || !currency) return "Amount unavailable";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatShippingAddress(session: Stripe.Checkout.Session) {
  const shipping = session.collected_information?.shipping_details;
  if (!shipping) return "Shipping address unavailable";

  const address = shipping.address;
  return [
    shipping.name,
    address.line1,
    address.line2,
    [address.city, address.state, address.postal_code].filter(Boolean).join(", "),
    address.country,
  ]
    .filter(Boolean)
    .join("\n");
}

function getArtworkImageUrl(artworkId: string, option: string) {
  const artwork = artworks.find((item) => item.id === artworkId);
  if (!artwork) return null;

  const selectedImage = getArtworkDetailImages(artwork).find(
    (image) => image.label === option,
  );
  if (!selectedImage) return null;

  return new URL(
    selectedImage.thumbnailSrc,
    `${getProductImageOrigin()}/`,
  ).toString();
}

export async function sendPaidOrderNotifications(
  eventId: string,
  session: Stripe.Checkout.Session,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("Paid order email skipped because RESEND_API_KEY is missing", {
      eventId,
      sessionId: session.id,
    });
    return;
  }

  const customerEmail = session.customer_details?.email;
  const artworkId = session.metadata?.artwork_id ?? "unknown-artwork";
  const artworkTitle = session.metadata?.artwork_title ?? "Artwork purchase";
  const option = session.metadata?.option ?? "Canvas only";
  const amount = formatAmount(session.amount_total, session.currency);
  const shippingAddress = formatShippingAddress(session);
  const artworkImageUrl = getArtworkImageUrl(artworkId, option);
  const ownerEmail = process.env.ORDER_NOTIFICATION_EMAIL ?? "info@sree.art";
  const fromEmail =
    process.env.ORDER_FROM_EMAIL ??
    process.env.CONTACT_FROM_EMAIL ??
    "Sree's Art <onboarding@resend.dev>";
  const resend = new Resend(apiKey);
  const safeTitle = escapeHtml(artworkTitle);
  const safeOption = escapeHtml(option);
  const safeAmount = escapeHtml(amount);
  const safeShippingAddress = escapeHtml(shippingAddress).replaceAll("\n", "<br />");
  const safeCustomerEmail = escapeHtml(customerEmail ?? "Unavailable");
  const imageBlock = artworkImageUrl
    ? `<img src="${escapeHtml(artworkImageUrl)}" alt="${safeTitle}" width="520" style="display:block;width:100%;max-width:520px;height:auto;margin:0 auto 26px;border-radius:18px;" />`
    : "";

  const sends: Array<Promise<unknown>> = [];

  if (customerEmail) {
    sends.push(
      resend.emails.send(
        {
          from: fromEmail,
          to: customerEmail,
          replyTo: ownerEmail,
          subject: `Order confirmed: ${artworkTitle}`,
          html: `
            <div style="background:#f6f1ea;padding:32px 16px;font-family:Arial,sans-serif;color:#27272a;">
              <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e7ded2;border-radius:24px;padding:34px;">
                <p style="margin:0 0 10px;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#78716c;">Sree's Art</p>
                <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:34px;font-weight:500;">Thank you for your purchase</h1>
                ${imageBlock}
                <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;font-weight:500;">${safeTitle}</h2>
                <p style="margin:0 0 6px;color:#57534e;">${safeOption}</p>
                <p style="margin:0 0 24px;font-size:20px;font-weight:600;">${safeAmount}</p>
                <p style="margin:0;line-height:1.7;color:#57534e;">Your payment is confirmed. Sree will contact you with shipping details. Stripe's receipt is your payment record.</p>
              </div>
            </div>
          `,
          text: [
            "Sree's Art — Order confirmed",
            "",
            artworkTitle,
            option,
            amount,
            "",
            "Your payment is confirmed. Sree will contact you with shipping details.",
          ].join("\n"),
        },
        { idempotencyKey: `stripe-${eventId}-customer` },
      ),
    );
  }

  sends.push(
    resend.emails.send(
      {
        from: fromEmail,
        to: ownerEmail,
        replyTo: customerEmail ?? ownerEmail,
        subject: `Paid artwork order: ${artworkTitle}`,
        html: `
          <div style="background:#f6f1ea;padding:32px 16px;font-family:Arial,sans-serif;color:#27272a;">
            <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e7ded2;border-radius:24px;padding:34px;">
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#78716c;">New paid order</p>
              <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:32px;font-weight:500;">${safeTitle}</h1>
              ${imageBlock}
              <p><strong>Option:</strong> ${safeOption}</p>
              <p><strong>Total paid:</strong> ${safeAmount}</p>
              <p><strong>Customer:</strong> ${safeCustomerEmail}</p>
              <p><strong>Shipping address:</strong><br />${safeShippingAddress}</p>
              <p><strong>Stripe Checkout Session:</strong> ${escapeHtml(session.id)}</p>
              <p style="margin-top:24px;padding:16px;border-radius:12px;background:#fef3c7;color:#78350f;"><strong>Action required:</strong> arrange shipping and mark this artwork sold in <code>lib/data.ts</code>.</p>
            </div>
          </div>
        `,
        text: [
          "New paid artwork order",
          "",
          `Artwork: ${artworkTitle}`,
          `Option: ${option}`,
          `Total paid: ${amount}`,
          `Customer: ${customerEmail ?? "Unavailable"}`,
          "",
          "Shipping address:",
          shippingAddress,
          "",
          `Stripe Checkout Session: ${session.id}`,
          "",
          "Action required: arrange shipping and mark this artwork sold in lib/data.ts.",
        ].join("\n"),
      },
      { idempotencyKey: `stripe-${eventId}-owner` },
    ),
  );

  const results = await Promise.all(sends);
  const failedSend = results.find(
    (result) =>
      typeof result === "object" &&
      result !== null &&
      "error" in result &&
      result.error,
  );

  if (failedSend) {
    throw new Error("Resend rejected an order notification email.");
  }
}
