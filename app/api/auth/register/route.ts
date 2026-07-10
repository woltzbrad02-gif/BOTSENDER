import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { generateToken, setAuthCookie } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').lowercase(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  country: z.string().min(2, 'Please select a country'),
  currency: z.enum(['USD', 'ZWG']),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  referralCode: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate input
    if (body.password !== body.confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
    }

    const validatedData = registerSchema.parse(body);

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email: validatedData.email }, { username: validatedData.username }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email or username already exists' },
        { status: 400 }
      );
    }

    // Create user
    const user = new User({
      fullName: validatedData.fullName,
      username: validatedData.username,
      email: validatedData.email,
      phone: validatedData.phone,
      country: validatedData.country,
      currency: validatedData.currency,
      password: validatedData.password,
      referredBy: validatedData.referralCode || null,
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id?.toString() || '', user.email);
    await setAuthCookie(token);

    // If user was referred, add referral earnings
    if (validatedData.referralCode) {
      const referrer = await User.findOne({ referralCode: validatedData.referralCode });
      if (referrer) {
        referrer.referralEarnings += 5; // $5 referral bonus
        await referrer.save();
      }
    }

    return NextResponse.json(
      {
        message: 'Registration successful',
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          balance: user.balance,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Registration failed' }, { status: 500 });
  }
}
