// pages/api/webhook.ts
import { buffer } from "micro";
import Stripe from "stripe";

export const config = {
    api: {
        bodyParser: false, // Stripe requires raw body
    },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-07-30.basil" as const,
});


export default async function handler(req, res) {
    if (req.method === "POST") {
        const buf = await buffer(req);
        const sig = req.headers["stripe-signature"]!;
        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
        } catch (err: any) {
            console.error("Webhook signature verification failed:", err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                console.log("Payment succeeded:", paymentIntent.id, paymentIntent.amount);
                break;
            }
            case "payment_intent.payment_failed": {
                console.log("Payment failed:", event.data.object);
                break;
            }

            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
