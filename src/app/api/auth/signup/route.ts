import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use admin client to create users with auto-confirmed email
// This bypasses the need for email confirmation / SMTP setup
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    // Create user via admin API — auto-confirms email
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Skip email confirmation
    })

    if (error) {
      // Handle duplicate user
      if (error.message?.includes('already been registered') || error.message?.includes('already exists')) {
        return NextResponse.json({ error: 'An account with this email already exists. Please sign in.' }, { status: 409 })
      }
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Also create a row in our users table
    if (data.user) {
      await supabaseAdmin.from('users').upsert({
        id: data.user.id,
        email: data.user.email,
        plan: 'starter',
        onboarded: false,
      }, { onConflict: 'id' })
    }

    return NextResponse.json({
      success: true,
      message: 'Account created. You can now sign in.',
      user_id: data.user?.id,
    })
  } catch (err) {
    console.error('Signup error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
