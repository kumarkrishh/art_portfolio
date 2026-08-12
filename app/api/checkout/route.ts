import { NextResponse } from "next/server";
import { z } from "zod";
import { getArtworkDetailImages } from "@/lib/artwork-images";
import { artworks } from "@/lib/data";
import {
  getConfiguredSiteOrigin,
  getPaymentReadiness,
  getProductImageOrigin,
  getShippingTier,
  isAutomaticTaxEnabled,
} from "@/lib/payment-config";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

const FRAME_PRICE_DOLLARS = 15;
const CHECKOUT_EXPIRATION_SECONDS = 30 * 60;

const checkoutRequestSchema = z.object({
  artworkId: z.string().trim().min(1),
  selectedLabel: z.string().trim().min(1),
});

function getSiteOrigin(request: Request) {
  const configuredOrigin = getConfiguredSiteOrigin();

  if (configuredOrigin) {
    return configuredOrigin.replace(/\/$/, "");
  }

  return new URL(request.url).origin;
}

function requestHasAllowedOrigin(request: Request, siteOrigin: string) {
  const requestOrigin = request.headers.get("origin");
  if (!requestOrigin) return true;

  try {
    return new URL(requestOrigin).origin === new URL(siteOrigin).origin;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const readiness = getPaymentReadiness();
    if (!readiness.ready) {
      console.error("Checkout blocked because payments are not ready", {
        reason: readiness.reason,
      });
      return NextResponse.json(
        { error: "Online purchasing is not available yet. Please contact Sree." },
        { status: 503 },
      );
    }

    const origin = getSiteOrigin(request);
    if (!requestHasAllowedOrigin(request, origin)) {
      return NextResponse.json(
        { error: "Checkout request was rejected." },
        { status: 403 },
      );
    }

    const parsed = checkoutRequestSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please choose a valid artwork option." },
        { status: 400 },
      );
    }

    const artwork = artworks.find((item) => item.id === parsed.data.artworkId);

    if (!artwork || artwork.notForSale || artwork.isSold || artwork.price <= 0) {
      return NextResponse.json(
        { error: "This artwork is not currently available for purchase." },
        { status: 409 },
      );
    }

    const selectedOption = getArtworkDetailImages(artwork).find(
      (image) => image.label === parsed.data.selectedLabel,
    );

    if (!selectedOption) {
      return NextResponse.json(
        { error: "Please choose a valid artwork option." },
        { status: 400 },
      );
    }

    const includesFrame = parsed.data.selectedLabel !== "Canvas only";
    const unitAmount = Math.round(
      (artwork.price + (includesFrame ? FRAME_PRICE_DOLLARS : 0)) * 100,
    );
    const productImageOrigin = getProductImageOrigin();
    const checkoutImageUrl = new URL(
      selectedOption.thumbnailSrc,
      `${productImageOrigin.replace(/\/$/, "")}/`,
    ).toString();
    const shippingTier = getShippingTier(artwork.dimensions);
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: artwork.id,
      customer_creation: "always",
      expires_at: Math.floor(Date.now() / 1000) + CHECKOUT_EXPIRATION_SECONDS,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: unitAmount,
            product_data: {
              name: artwork.title,
              description: `${artwork.medium} · ${artwork.dimensions} · ${parsed.data.selectedLabel}`,
              images: [checkoutImageUrl],
              metadata: {
                artwork_id: artwork.id,
                option: parsed.data.selectedLabel,
              },
            },
          },
        },
      ],
      metadata: {
        artwork_id: artwork.id,
        artwork_title: artwork.title,
        option: parsed.data.selectedLabel,
        base_price_dollars: String(artwork.price),
        shipping_tier: shippingTier.name,
        shipping_amount_cents: String(shippingTier.amountCents),
      },
      payment_intent_data: {
        description: `${artwork.title} — ${parsed.data.selectedLabel}`,
        metadata: {
          artwork_id: artwork.id,
          artwork_title: artwork.title,
          option: parsed.data.selectedLabel,
        },
      },
      automatic_tax: {
        enabled: isAutomaticTaxEnabled(),
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount" as const,
            display_name: `Standard shipping — ${shippingTier.name}`,
            fixed_amount: {
              amount: shippingTier.amountCents,
              currency: "usd",
            },
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/gallery/${encodeURIComponent(artwork.id)}`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a Checkout URL.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Unable to create Stripe Checkout Session", error);
    return NextResponse.json(
      { error: "Checkout is temporarily unavailable. Please try again." },
      { status: 500 },
    );
  }
}
