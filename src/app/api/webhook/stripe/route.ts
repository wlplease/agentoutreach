import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  // Graceful fallback if webhook secret is not configured
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.warn('STRIPE_WEBHOOK_SECRET not configured — skipping webhook processing');
    return NextResponse.json({ received: true });
  }

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe!.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook signature verification failed';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Retrieve the subscription to access its metadata
    let userId: string | undefined;
    let plan: string | undefined;

    if (session.subscription) {
      const subscription = await stripe!.subscriptions.retrieve(
        session.subscription as string
      );
      userId = subscription.metadata.user_id;
      plan = subscription.metadata.plan;
    }

    if (userId && plan) {
      const { error } = await supabaseAdmin
        .from('users')
        .update({
          plan,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) {
        console.error('Failed to update user plan:', error);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }

      console.log(`User ${userId} upgraded to ${plan} plan`);
    } else {
      console.warn('checkout.session.completed missing user_id or plan in subscription metadata');
    }
  }

  return NextResponse.json({ received: true });
}
