import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { sendPackageEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            await request.json()

        // Validate input
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Create signature for verification
        const body = razorpay_order_id + '|' + razorpay_payment_id
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest('hex')

        // Verify signature
        const isAuthentic = expectedSignature === razorpay_signature

        if (isAuthentic) {
            // Initialize Razorpay to fetch order and payment details
            const razorpay = new Razorpay({
                key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                key_secret: process.env.RAZORPAY_KEY_SECRET!,
            })

            try {
                // Fetch order details to get package name
                const order = await razorpay.orders.fetch(razorpay_order_id)
                const packageName = order.notes?.planName ? String(order.notes.planName) : 'Basic'

                // Fetch payment details to get customer email
                const payment = await razorpay.payments.fetch(razorpay_payment_id)
                const customerEmail = payment.email ? String(payment.email) : null
                const customerName = payment.contact ? String(payment.contact) : 'Customer'

                // Send email with package link if email is available
                if (customerEmail) {
                    try {
                        await sendPackageEmail({
                            customerEmail,
                            customerName,
                            packageName,
                            orderId: razorpay_order_id,
                            paymentId: razorpay_payment_id,
                        })
                        console.log(`Package email sent to ${customerEmail} for ${packageName} package`)
                    } catch (emailError) {
                        console.error('Failed to send email, but payment was successful:', emailError)
                        // Don't fail the payment verification if email fails
                        // You might want to log this to a database for manual follow-up
                    }
                } else {
                    console.warn('No customer email found in payment details')
                }
            } catch (fetchError) {
                console.error('Error fetching order/payment details:', fetchError)
                // Continue with payment verification even if fetching details fails
            }

            return NextResponse.json({
                success: true,
                message: 'Payment verified successfully',
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
            })
        } else {
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 400 }
            )
        }
    } catch (error) {
        console.error('Error verifying payment:', error)
        return NextResponse.json(
            { error: 'Failed to verify payment' },
            { status: 500 }
        )
    }
}
