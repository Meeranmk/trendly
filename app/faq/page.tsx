import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video } from "lucide-react"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"

export default function FAQPage() {
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

            {/* FAQ Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-20">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h1 className="text-balance text-5xl font-bold text-white">Frequently Asked Questions</h1>
                    <p className="mt-4 text-lg text-blue-50">
                        Find answers to common questions about our AI tools, pricing, and policies
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-3xl px-6">
                    <div className="space-y-6">
                        <Card className="border-gray-200 bg-white shadow-sm">
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


                        <Card className="border-gray-200 bg-white shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Can I upgrade or downgrade my plan?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    You can change your plan at any time from your account settings. Changes take effect immediately.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 bg-white shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    We accept all major credit cards, debit cards, and UPI payments through our secure payment gateway Razorpay.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 bg-white shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Do I get lifetime access to the AI tools?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Yes! Once you purchase the software or subscribe to a plan, you get lifetime access to all the AI tools and features, including future updates.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 bg-white shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Are there any prerequisites for using the software?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    No! Our software is designed to be user-friendly and doesn't require any prior video editing experience. The AI tools make it easy for anyone to create professional videos.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-16 text-center">
                        <h3 className="text-2xl font-bold text-gray-900">Still have questions?</h3>
                        <p className="mt-2 text-gray-600">Contact us and we'll be happy to help!</p>
                        <Button asChild className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                            <Link href="/contact">Contact Us</Link>
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
