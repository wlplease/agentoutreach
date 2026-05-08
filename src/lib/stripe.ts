import Stripe from 'stripe';

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-04-22.dahlia' })
  : null;

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 19900, // $199 in cents
    priceId: process.env.STRIPE_STARTER_PRICE_ID || '',
  },
  growth: {
    name: 'Growth',
    price: 49900,
    priceId: process.env.STRIPE_GROWTH_PRICE_ID || '',
  },
  scale: {
    name: 'Scale',
    price: 99900,
    priceId: process.env.STRIPE_SCALE_PRICE_ID || '',
  },
};
