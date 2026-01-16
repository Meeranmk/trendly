'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Video, Clock, Mail, User, Phone } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { MobileNav } from "@/components/mobile-nav"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(5 * 60) // 5 minutes in seconds
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; amount: number } | null>(null)
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    contact: '',
  })

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          return 5 * 60 // Reset to 5 minutes when it reaches 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleBuyNowClick = (planName: string, amount: number) => {
    setSelectedPlan({ name: planName, amount })
    setShowDetailsDialog(true)
  }

  const handleDetailsSubmit = () => {
    // Validate customer details
    if (!customerDetails.name || !customerDetails.email || !customerDetails.contact) {
      alert('Please fill in all fields')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerDetails.email)) {
      alert('Please enter a valid email address')
      return
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(customerDetails.contact)) {
      alert('Please enter a valid 10-digit phone number')
      return
    }

    setShowDetailsDialog(false)
    if (selectedPlan) {
      handlePayment(selectedPlan.name, selectedPlan.amount)
    }
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
          currency: 'INR',
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
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.contact,
        },
        notes: {
          package: planName,
          amount: amount,
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: function () {
            setLoading(null)
          },
          confirm_close: true,
        },
        // Make email and contact readonly: false to allow editing
        readonly: {
          email: false,
          contact: false,
          name: false,
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
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900">
              FAQ
            </Link>
            <Button asChild className="bg-amber-400 hover:bg-amber-500 text-black font-semibold btn-glow">
              <Link href="/pricing">Buy Now</Link>
            </Button>
          </nav>
          <MobileNav />
        </div>
      </header>

      {/* Customer Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter Your Details</DialogTitle>
            <DialogDescription>
              We'll send your package download link to this email address after payment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={customerDetails.name}
                onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={customerDetails.email}
                onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
              />
              <p className="text-xs text-gray-500">Package link will be sent to this email</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number *
              </Label>
              <Input
                id="contact"
                type="tel"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={customerDetails.contact}
                onChange={(e) => setCustomerDetails({ ...customerDetails, contact: e.target.value.replace(/\D/g, '') })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDetailsDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleDetailsSubmit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Pricing Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h1 className="text-balance text-3xl font-bold text-gray-900 sm:text-4xl">Choose Your Plan</h1>
            <p className="mt-4 text-pretty text-lg text-gray-600">
              Select the perfect plan for your learning journey. All plans include lifetime access to purchased courses.
            </p>

            {/* 5 Minute Countdown Timer */}
            <div className="mt-8 inline-block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl px-8 py-6 shadow-2xl border-2 border-red-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full animate-bounce">
                      <Clock className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-white text-sm font-semibold uppercase tracking-wider">⚡ Limited Time Offer</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-white text-xs">Offer expires in:</span>
                        <span className="text-white text-2xl font-bold font-mono tabular-nums">
                          {formatTime(timeLeft)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-yellow-200 text-xs font-semibold animate-pulse">🔥 Don't miss out! Prices may increase soon!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-8 lg:items-stretch">
            {/* Basic Plan - ₹99 */}
            <Card className="border-gray-200 bg-white flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">BASIC BUNDLE</CardTitle>
                <CardDescription className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">₹1</span>
                  <span className="text-gray-600"> Lifetime</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <p className="text-gray-600 mb-4 font-semibold">👉 Best for Beginners & Simple Editing</p>
                {[
                  "Simple Transitions (Zoom, Swipe, Fade)",
                  "Basic Text Animations",
                  "Trending Background Music",
                  "Simple Color Presets",
                  "Basic Skull Faces & Backgrounds",
                  "Animated Emojis & Arrows",
                  "Film Burn Effects & Glowing Icons",
                  "Easy to Use – No Editing Skills Needed",
                  "Mobile-Friendly (CapCut / VN)",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold btn-glow"
                  onClick={() => handleBuyNowClick('Basic', 1)}
                  disabled={loading !== null}
                >
                  {loading === 'Basic' ? 'Processing...' : 'Buy Now'}
                </Button>
              </CardFooter>
            </Card>

            {/* Advanced Plan - ₹149 */}
            <Card className="relative border-2 border-blue-600 bg-white shadow-lg flex flex-col">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                Most Popular
              </div>
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl">ADVANCED BUNDLE</CardTitle>
                <CardDescription className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">₹1</span>
                  <span className="text-gray-600"> Lifetime</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <p className="text-gray-600 mb-4 font-semibold">👉 Best for Professional & Cinematic Editing</p>
                {[
                  "Premium Cinematic Transitions",
                  "Advanced Motion Graphics & Visual Effects",
                  "Trending Background Music",
                  "Premium Skull Faces & Backgrounds",
                  "AI Animations & Overlays",
                  "Professional Text & Title Animations",
                  "High-Quality LUTs / Color Grading Presets",
                  "Green Screen Overlays (Smoke, Fire, FX)",
                  "Professional Sound Effects (SFX)",
                  "Full Customization & Layered Editing",
                  "Mobile + PC Support (CapCut, VN, Alight Motion, Premiere Pro, After Effects)",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold btn-glow"
                  onClick={() => handleBuyNowClick('Advanced', 1)}
                  disabled={loading !== null}
                >
                  {loading === 'Advanced' ? 'Processing...' : 'Buy Now'}
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan - ₹199 */}
            <Card className="relative border-2 border-amber-500 bg-gradient-to-br from-amber-50 to-white shadow-xl flex flex-col">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1 text-sm font-semibold text-white">
                🔥 Best Value
              </div>
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl">PREMIUM BUNDLE</CardTitle>
                <CardDescription className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">₹1</span>
                  <span className="text-gray-600"> Lifetime</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <p className="text-gray-600 mb-4 font-semibold">👉 Best for Creators, Agencies & Power Editors</p>
                {[
                  "Lakhs of Ready-to-Use Assets & Mega Bundles",
                  "Everything Included in ₹99 + ₹149 Packages",
                  "Ultra-Cinematic Transitions & Effects",
                  "AI-Powered Video Animations & Smart Overlays",
                  "Premium Motion Packs (Reels, Shorts, YouTube, Ads)",
                  "Viral Reels & Trending Templates (Updated Regularly)",
                  "Advanced Text, Typography & Logo Animations",
                  "Hollywood-Style LUTs & Color Grading Packs",
                  "Massive Green Screen FX Library",
                  "High-End Sound Effects & Music Packs",
                  "Full Creative Freedom – Deep Customization",
                  "Mobile + PC Supported (CapCut, VN, Alight Motion, Premiere Pro, After Effects)",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-amber-200">
                  <p className="text-center text-sm font-semibold text-amber-700">
                    🔥 All-in-One Editing Solution | Lifetime Use
                  </p>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold btn-glow shadow-lg"
                  onClick={() => handleBuyNowClick('Premium', 1)}
                  disabled={loading !== null}
                >
                  {loading === 'Premium' ? 'Processing...' : 'Buy Now'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-gray-400">© 2026 Trendlygroww. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
