import { NextRequest, NextResponse } from 'next/server';
import { stripe, PLANS } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    // Graceful fallback if Stripe is not configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        url: '/onboarding',
        message: 'Stripe not configured — proceeding to onboarding',
      });
    }

    const body = await req.json();
    const { plan, user_id, email } = body as {
      plan: 'starter' | 'growth' | 'scale';
      user_id: string;
      email: string;
    };

    if (!plan || !user_id || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: plan, user_id, email' },
        { status: 400 }
      );
    }

    const selectedPlan = PLANS[plan];
    if (!selectedPlan) {
      return NextResponse.json(
        { error: 'Invalid plan. Must be starter, growth, or scale.' },
        { status: 400 }
      );
    }

    if (!selectedPlan.priceId) {
      return NextResponse.json(
        { error: `Price ID not configured for ${plan} plan.` },
        { status: 500 }
      );
    }

    const session = await stripe!.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
          user_id,
          plan,
        },
      },
      success_url: `${req.nextUrl.origin}/dashboard?checkout=success`,
      cancel_url: `${req.nextUrl.origin}/#pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Checkout session error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to create checkout session';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
