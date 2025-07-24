// lib/stripe/payment.ts
import express, { Request, Response } from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-05-28.basil",
});

app.use(cors());
app.use(express.json());

// POST /create-payment-intent
app.post("/create-payment-intent", async (req: Request, res: Response) => {
  try {
    const { amount = 1999, currency = "usd" } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error("Error creating payment intent:", err);
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get("/", (_: Request, res: Response) => {
  res.send("Stripe backend is running ✅");
});

export default app;
