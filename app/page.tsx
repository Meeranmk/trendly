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
              <h1 className="text-balance text-5xl font-bold leading-tight text-white lg:text-6xl">
                Master Video Editing with Expert Tutorials
              </h1>
              <p className="mt-6 text-lg text-blue-50">
                Learn from industry professionals and transform your video editing skills. From beginner to pro in one
                place.
              </p>
              <Button asChild className="mt-8 bg-amber-400 hover:bg-amber-500 text-black font-semibold btn-glow">
                <Link href="/pricing">Buy Now</Link>
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
            <h2 className="text-balance text-4xl font-bold text-gray-900">Why Choose Trendlygroww?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Get access to comprehensive video editing courses designed by industry experts
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Professional video editing techniques",
              "Industry-standard software training",
              "Step-by-step project-based learning",
              "Certificate upon completion",
              "Lifetime access to course materials",
              "24/7 community support",
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

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-balance text-4xl font-bold text-white">Ready to Start Your Journey?</h2>
          <p className="mt-4 text-lg text-blue-50">Join thousands of students learning professional video editing</p>
          <Button asChild className="mt-8 bg-amber-400 hover:bg-amber-500 text-black font-semibold btn-glow">
            <Link href="/pricing">Get Started Today</Link>
          </Button>
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
