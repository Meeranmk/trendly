'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Video } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async (planName: string, amount: number) => {
    setLoading(planName)

    try {
      // Load Razorpay script
      const res = await loadRazorpayScript()
      if (!res) {
        alert('Razorpay SDK failed to load. Please check your internet connection.')
        setLoading(null)
        return
      }

      // Create order
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'USD',
          planName: planName,
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      // Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Trendlygroww',
        description: `${planName} Plan Subscription`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (verifyResponse.ok && verifyData.success) {
              // Redirect to success page
              router.push(`/payment/success?payment_id=${verifyData.paymentId}&plan=${planName}`)
            } else {
              throw new Error('Payment verification failed')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            router.push('/payment/failure')
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: function () {
            setLoading(null)
          },
        },
      }

      // Open Razorpay checkout
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
      setLoading(null)
    } catch (error) {
      console.error('Payment error:', error)
      alert('Failed to initiate payment. Please try again.')
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <Video className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Trendlygroww</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Buy Now
            </Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/pricing">Buy Now</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold text-gray-900">Choose Your Plan</h1>
            <p className="mt-4 text-pretty text-lg text-gray-600">
              Select the perfect plan for your learning journey. All plans include lifetime access to purchased courses.
            </p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Basic Plan */}
            <Card className="border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl">Basic</CardTitle>
                <CardDescription className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$19</span>
                  <span className="text-gray-600">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Access to 50+ basic courses",
                  "Standard video quality",
                  "Community forum access",
                  "Mobile app access",
                  "Course certificates",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => handlePayment('Basic', 19)}
                  disabled={loading !== null}
                >
                  {loading === 'Basic' ? 'Processing...' : 'Buy Now'}
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-2 border-blue-600 bg-white shadow-lg">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                Most Popular
              </div>
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$39</span>
                  <span className="text-gray-600">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Access to ALL 500+ courses",
                  "HD & 4K video quality",
                  "Priority community support",
                  "Mobile & desktop apps",
                  "Course certificates",
                  "Downloadable resources",
                  "Project files included",
                  "Monthly live Q&A sessions",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handlePayment('Pro', 39)}
                  disabled={loading !== null}
                >
                  {loading === 'Pro' ? 'Processing...' : 'Buy Now'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="mt-12 space-y-6">
            <Card className="border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Can I cancel my subscription anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of
                  your billing period.
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, contact us for a
                  full refund.
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Can I upgrade or downgrade my plan?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  You can change your plan at any time from your account settings. Changes take effect immediately.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-gray-400">© 2025 Trendlygroww. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
