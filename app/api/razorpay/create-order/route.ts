import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export async function POST(request: NextRequest) {
    try {
        const { amount, currency, planName } = await request.json()

        // Validate input
        if (!amount || !currency || !planName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        })

        // Create order
        const order = await razorpay.orders.create({
            amount: amount * 100, // Razorpay expects amount in paise (smallest currency unit)
            currency: currency,
            receipt: `receipt_${Date.now()}`,
            notes: {
                planName: planName,
            },
        })

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        })
    } catch (error) {
        console.error('Error creating Razorpay order:', error)
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        )
    }
}
