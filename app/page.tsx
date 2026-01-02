import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Users, Video, Award, Star, Play } from "lucide-react"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"

export default function TrendlygrowwPage() {
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-balance text-3xl font-bold leading-tight text-white lg:text-4xl">
                Latest Capcut Pro Video Editing Software Pre-Activated – With ALL A.I Tools, No Watermark, No Subscription Needed 💻📱
              </h1>
              <p className="mt-6 text-base text-blue-50">
                (For Windows PC/Laptop, & Android Phone, Apple Devices)
              </p>
              <Button asChild className="mt-8 bg-amber-400 hover:bg-amber-500 text-black font-semibold btn-glow">
                <Link href="/pricing">BUY NOW JUST AT ₹99</Link>
              </Button>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="flex h-64 w-64 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm lg:h-80 lg:w-80">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/90">
                  <Play className="ml-1 h-12 w-12 text-blue-600" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-bold text-gray-900">Features Included In Software</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Advanced Color Grading",
              "Powerful Editing A.I Tools",
              "Stunning Visual Effects",
              "Unleash Your Creativity",
              "User-Friendly Interface",
              "No Watermark",
            ].map((feature, index) => (
              <Card key={index} className="border-gray-200 bg-white">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <Check className="h-4 w-4 text-emerald-600" />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Activated Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-balance text-4xl font-bold text-white">100% Pre-Activated - NO Watermark</h2>
            <div className="mt-4 h-1 w-24 bg-amber-400 mx-auto"></div>
          </div>

          <div className="bg-purple-900/50 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-400">
                    <svg className="h-6 w-6 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">INSTANT DOWNLOAD</h3>
                  <p className="text-blue-100 text-sm">Make your payment and instantly access the download page. No waiting, no delays – just quick and easy access to your software.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-400">
                    <svg className="h-6 w-6 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">LIFETIME ACCESS</h3>
                  <p className="text-blue-100 text-sm">Enjoy lifetime access to your software, available for any PC. Whether you need to reinstall or switch devices, your access never expires.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-400">
                    <svg className="h-6 w-6 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">PRE-ACTIVATED</h3>
                  <p className="text-blue-100 text-sm">Say goodbye to activation hassles. Our software comes pre-activated, saving you time and effort. Simply install and start using right away, hassle-free.</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-400">
                    <svg className="h-6 w-6 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">NO WATERMARK</h3>
                  <p className="text-blue-100 text-sm">There will be no watermark in Capcut, allowing you to export your videos seamlessly. You can create and share high-quality content without any issues or distractions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button asChild className="bg-amber-400 hover:bg-amber-500 text-black font-bold text-lg px-12 py-6 btn-glow">
              <Link href="/pricing">BUY NOW JUST AT ₹99</Link>
            </Button>
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
