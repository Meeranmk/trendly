import { NextRequest, NextResponse } from 'next/server'
import { sendPackageEmail } from '@/lib/email'

/**
 * Test Email API Route
 * 
 * This endpoint allows you to test email sending from the browser.
 * 
 * Usage:
 * POST /api/test-email
 * Body: {
 *   "email": "your-email@example.com",
 *   "packageName": "Basic" // or "Advanced" or "Premium"
 * }
 * 
 * Or visit in browser: /api/test-email?email=your-email@example.com&package=Basic
 */

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')
    const packageName = searchParams.get('package') || 'Basic'

    if (!email) {
        return NextResponse.json(
            {
                error: 'Email parameter is required',
                usage: '/api/test-email?email=your-email@example.com&package=Basic'
            },
            { status: 400 }
        )
    }

    return sendTestEmail(email, packageName)
}

export async function POST(request: NextRequest) {
    try {
        const { email, packageName = 'Basic' } = await request.json()

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            )
        }

        return sendTestEmail(email, packageName)
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        )
    }
}

async function sendTestEmail(email: string, packageName: string) {
    try {
        // Validate package name
        const validPackages = ['Basic', 'Advanced', 'Premium']
        if (!validPackages.includes(packageName)) {
            return NextResponse.json(
                {
                    error: 'Invalid package name',
                    validPackages: validPackages
                },
                { status: 400 }
            )
        }

        console.log(`Testing email to: ${email} for package: ${packageName}`)

        const result = await sendPackageEmail({
            customerEmail: email,
            customerName: 'Test Customer',
            packageName: packageName,
            orderId: `test_order_${Date.now()}`,
            paymentId: `test_payment_${Date.now()}`,
        })

        return NextResponse.json({
            success: true,
            message: 'Test email sent successfully!',
            details: {
                email: email,
                packageName: packageName,
                messageId: result.messageId,
            },
            note: 'Check your inbox (and spam folder) for the test email.'
        })
    } catch (error) {
        console.error('Error sending test email:', error)

        return NextResponse.json(
            {
                error: 'Failed to send test email',
                details: error instanceof Error ? error.message : 'Unknown error',
                troubleshooting: [
                    'Check your .env.local file has all SMTP settings',
                    'Verify SMTP credentials are correct',
                    'For Gmail, make sure you\'re using an App Password',
                    'See EMAIL_SETUP.md for detailed instructions'
                ]
            },
            { status: 500 }
        )
    }
}
