import "server-only";

const DEFAULT_PRODUCT_IMAGE_ORIGIN = "https://www.sree.art";

export type PaymentReadiness = {
  ready: boolean;
  reason?: string;
};

export function getConfiguredSiteOrigin() {
  return process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
}

export function getProductImageOrigin() {
  return (
    process.env.STRIPE_PRODUCT_IMAGE_ORIGIN ?? DEFAULT_PRODUCT_IMAGE_ORIGIN
  ).replace(/\/$/, "");
}

export function getPaymentReadiness(): PaymentReadiness {
  const isProduction = process.env.NODE_ENV === "production";
  const explicitlyEnabled = process.env.PAYMENTS_ENABLED;
  const enabled = explicitlyEnabled
    ? explicitlyEnabled === "true"
    : !isProduction;

  if (!enabled) {
    return { ready: false, reason: "Payments are disabled." };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return { ready: false, reason: "Stripe is not configured." };
  }

  if (!isProduction) {
    return { ready: true };
  }

  if (!secretKey.startsWith("sk_live_")) {
    return {
      ready: false,
      reason: "Production payments require a live Stripe secret key.",
    };
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET?.startsWith("whsec_")) {
    return {
      ready: false,
      reason: "Production payments require a live webhook signing secret.",
    };
  }

  const siteOrigin = getConfiguredSiteOrigin();
  if (!siteOrigin) {
    return {
      ready: false,
      reason: "Production payments require SITE_URL.",
    };
  }

  try {
    const parsedOrigin = new URL(siteOrigin);
    if (parsedOrigin.protocol !== "https:") {
      return {
        ready: false,
        reason: "Production payments require an HTTPS SITE_URL.",
      };
    }
  } catch {
    return { ready: false, reason: "SITE_URL is invalid." };
  }

  return { ready: true };
}

type ShippingTier = {
  name: string;
  amountCents: number;
};

const SHIPPING_TIERS = {
  small: { name: "Small artwork", amountCents: 2_500 },
  medium: { name: "Medium artwork", amountCents: 3_500 },
  large: { name: "Large artwork", amountCents: 4_500 },
  extraLarge: { name: "Extra-large artwork", amountCents: 6_500 },
  oversized: { name: "Oversized artwork", amountCents: 9_500 },
} satisfies Record<string, ShippingTier>;

export function getShippingTier(dimensions: string): ShippingTier {
  const measurements = dimensions
    .toLowerCase()
    .replaceAll("×", "x")
    .match(/(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)/);

  // Use the safest tier if a future catalog entry has an unexpected format.
  if (!measurements) return SHIPPING_TIERS.oversized;

  const longestSide = Math.max(
    Number(measurements[1]),
    Number(measurements[2]),
  );

  if (longestSide <= 12) return SHIPPING_TIERS.small;
  if (longestSide <= 16) return SHIPPING_TIERS.medium;
  if (longestSide <= 18) return SHIPPING_TIERS.large;
  if (longestSide <= 24) return SHIPPING_TIERS.extraLarge;
  return SHIPPING_TIERS.oversized;
}

export function isAutomaticTaxEnabled() {
  return process.env.STRIPE_AUTOMATIC_TAX_ENABLED === "true";
}
