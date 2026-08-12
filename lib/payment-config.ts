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

export function getShippingAmountCents() {
  const configuredAmount = process.env.STRIPE_SHIPPING_AMOUNT_CENTS;
  if (!configuredAmount) return 0;

  const amount = Number(configuredAmount);
  return Number.isSafeInteger(amount) && amount >= 0 ? amount : 0;
}

export function isAutomaticTaxEnabled() {
  return process.env.STRIPE_AUTOMATIC_TAX_ENABLED === "true";
}
