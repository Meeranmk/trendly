import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Instagram, Video } from "lucide-react"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"

export default function ContactPage() {
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
                        <Button asChild className="bg-amber-400 hover:bg-amber-500 text-black font-semibold btn-glow">
                            <Link href="/pricing">Buy Now</Link>
                        </Button>
                    </nav>
                    <MobileNav />
                </div>
            </header>

            {/* Contact Section */}
            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-20">
                <div className="mx-auto max-w-4xl px-6">
                    <div className="text-center">
                        <h1 className="text-balance text-5xl font-bold text-white">Get in Touch</h1>
                        <p className="mt-4 text-lg text-blue-50">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-8 md:grid-cols-2">
                        {/* Email Cards */}
                        <Card className="border-0 bg-white shadow-xl">
                            <CardContent className="p-8">
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                        <Mail className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">Primary Email</h3>
                                    <p className="mt-2 text-sm text-gray-600">For general inquiries and support</p>
                                    <a
                                        href="mailto:trendlygroww@gmail.com"
                                        className="mt-4 text-lg font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                        trendlygroww@gmail.com
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-xl">
                            <CardContent className="p-8">
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                        <Mail className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">Secondary Email</h3>
                                    <p className="mt-2 text-sm text-gray-600">Alternative contact</p>
                                    <a
                                        href="mailto:rethivkganesh001@gmail.com"
                                        className="mt-4 text-lg font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                        rethivkganesh001@gmail.com
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Instagram Section */}
                    <div className="mt-12">
                        <Card className="border-0 bg-white shadow-xl">
                            <CardContent className="p-8">
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
                                        <Instagram className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">Follow Us on Instagram</h3>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Stay updated with our latest tutorials, tips, and behind-the-scenes content
                                    </p>
                                    <Button
                                        asChild
                                        className="mt-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600"
                                    >
                                        <a
                                            href="https://www.instagram.com/trendlygroww/?igsh=MTR6cmF1c3hydjl6Ng%3D%3D&utm_source=qr"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            @trendlygroww
                                        </a>
                                    </Button>
                                </div>
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
