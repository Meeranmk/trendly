/**
 * Email Configuration Test Script
 * 
 * This script helps you test your SMTP configuration before going live.
 * Run this to verify your email settings are working correctly.
 * 
 * Usage:
 * 1. Make sure your .env.local has SMTP settings configured
 * 2. Run: node --loader ts-node/esm test-email.ts
 * Or create an API route and call it from the browser
 */

import { sendPackageEmail } from './lib/email'

async function testEmail() {
    console.log('🧪 Testing Email Configuration...\n')

    // Test configuration
    const testConfig = {
        customerEmail: 'your-test-email@example.com', // ⚠️ CHANGE THIS to your email
        customerName: 'Test Customer',
        packageName: 'Basic', // Options: 'Basic', 'Advanced', 'Premium'
        orderId: 'test_order_' + Date.now(),
        paymentId: 'test_payment_' + Date.now(),
    }

    console.log('Test Configuration:')
    console.log('-------------------')
    console.log(`To: ${testConfig.customerEmail}`)
    console.log(`Package: ${testConfig.packageName}`)
    console.log(`Order ID: ${testConfig.orderId}`)
    console.log(`Payment ID: ${testConfig.paymentId}`)
    console.log('\n')

    try {
        console.log('📧 Sending test email...')
        const result = await sendPackageEmail(testConfig)

        console.log('\n✅ SUCCESS! Email sent successfully!')
        console.log(`Message ID: ${result.messageId}`)
        console.log('\n📬 Check your inbox (and spam folder) for the test email.')
        console.log('\nIf you received the email, your configuration is working correctly! 🎉')
    } catch (error) {
        console.error('\n❌ ERROR: Failed to send email')
        console.error('Error details:', error)
        console.log('\n🔍 Troubleshooting:')
        console.log('1. Check your .env.local file has all SMTP settings')
        console.log('2. Verify SMTP credentials are correct')
        console.log('3. For Gmail, make sure you\'re using an App Password')
        console.log('4. Check if your email provider requires specific settings')
        console.log('\nSee EMAIL_SETUP.md for detailed configuration instructions.')
    }
}

// Run the test
testEmail()
