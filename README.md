# Sree Art Website

This repository contains the Sree Art portfolio and artwork catalog.

## Website owner documentation

For plain-language instructions on updating paintings, prices, availability, images, frame options, homepage content, and publishing changes, read:

**[Website Owner's Guide](docs/WEBSITE-OWNER-GUIDE.md)**

## Quick start for developers

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Useful commands:

```bash
npm run check
npm run generate:previews
npm run build
```

The site is built with Next.js, React, TypeScript, and Tailwind CSS.

## Stripe Checkout

Artwork checkout is created server-side from `lib/data.ts`; products do not need
to be entered manually in Stripe. Local development requires these values in
`.env.local`:

```text
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SITE_URL=http://localhost:3000
# Optional; defaults to https://www.sree.art
STRIPE_PRODUCT_IMAGE_ORIGIN=https://www.sree.art
```

The browser sends an artwork ID and selected frame option. The server validates
availability and calculates the authoritative price before creating a hosted
Stripe Checkout Session. Never commit or expose the secret values.

Shipping is calculated server-side from the artwork dimensions: $25 up to 12
inches, $35 up to 16 inches, $45 up to 18 inches, $65 up to 24 inches, and $95
for larger pieces. Checkout accepts United States shipping addresses only.

Production checkout is fail-closed. It only appears when `PAYMENTS_ENABLED=true`,
`STRIPE_SECRET_KEY` is a live key, `STRIPE_WEBHOOK_SECRET` is configured, and
`SITE_URL` is HTTPS. See [the Stripe go-live guide](docs/STRIPE-GO-LIVE.md) for
the deployment order, complete environment-variable list, webhook events, and
post-launch workflow.
