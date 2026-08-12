import Link from "next/link";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

type CheckoutSuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return <InvalidCheckout />;
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    const paid = session.payment_status === "paid";
    const item = session.line_items?.data[0];
    const artworkTitle = item?.description ?? session.metadata?.artwork_title;

    return (
      <section className="mx-auto flex w-full max-w-2xl flex-1 items-center px-6 py-20">
        <div className="w-full rounded-3xl border border-zinc-200 bg-[#FCFAF7] px-7 py-12 text-center shadow-sm md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            {paid ? "Payment confirmed" : "Payment processing"}
          </p>
          <h1 className="font-serif text-4xl text-zinc-900 md:text-5xl">
            {paid ? "Thank you for your purchase" : "Your payment is processing"}
          </h1>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-zinc-600">
            {paid
              ? session.livemode
                ? `${artworkTitle ?? "Your artwork"} is now reserved for you. Order details will be sent to ${session.customer_details?.email ?? "your email address"}.`
                : `${artworkTitle ?? "Your artwork"} completed successfully as a sandbox test. No real payment was made and automatic receipt email delivery may be suppressed.`
              : "We’ll confirm your order as soon as Stripe finishes processing the payment."}
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            Sree will contact you with shipping details.
          </p>
          <Link
            href="/gallery"
            className="mt-8 inline-flex rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Return to the gallery
          </Link>
        </div>
      </section>
    );
  } catch {
    return <InvalidCheckout />;
  }
}

function InvalidCheckout() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 items-center px-6 py-20">
      <div className="w-full text-center">
        <h1 className="font-serif text-4xl text-zinc-900">
          We couldn’t confirm this checkout
        </h1>
        <p className="mt-4 text-zinc-600">
          Check your Stripe receipt or contact Sree if you need assistance.
        </p>
        <Link href="/gallery" className="mt-7 inline-block border-b border-zinc-900 pb-1">
          Return to the gallery
        </Link>
      </div>
    </section>
  );
}
