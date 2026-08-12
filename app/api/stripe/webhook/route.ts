import Stripe from "stripe";
import { sendPaidOrderNotifications } from "@/lib/order-notifications";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new Response("Stripe webhook is not configured.", { status: 503 });
  }

  let event: Stripe.Event;

  try {
    const payload = await request.text();
    event = getStripe().webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return new Response("Invalid webhook signature.", { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object;

    if (session.payment_status === "paid") {
      console.info("Stripe payment completed", {
        eventId: event.id,
        sessionId: session.id,
        artworkId: session.metadata?.artwork_id,
        option: session.metadata?.option,
      });

      try {
        await sendPaidOrderNotifications(event.id, session);
      } catch (error) {
        console.error("Paid order notification failed", {
          eventId: event.id,
          sessionId: session.id,
          message: error instanceof Error ? error.message : "Unknown error",
        });
        return new Response("Paid order notification failed.", { status: 500 });
      }
    }
  }

  if (
    event.type === "checkout.session.async_payment_failed" ||
    event.type === "checkout.session.expired"
  ) {
    console.info("Stripe Checkout Session closed without payment", {
      eventId: event.id,
      eventType: event.type,
      sessionId: event.data.object.id,
      artworkId: event.data.object.metadata?.artwork_id,
    });
  }

  return Response.json({ received: true });
}
