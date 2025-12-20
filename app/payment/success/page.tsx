'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Video } from "lucide-react"
import Link from "next/link"
import { Suspense } from 'react'

function SuccessContent() {
    const searchParams = useSearchParams()
    const paymentId = searchParams.get('payment_id')
    const plan = searchParams.get('plan')

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-6">
            <Card className="w-full max-w-2xl border-emerald-200 bg-white shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                        <CheckCircle className="h-12 w-12 text-emerald-600" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-900">Payment Successful!</CardTitle>
                    <CardDescription className="mt-2 text-lg text-gray-600">
                        Thank you for subscribing to Trendlygroww
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="rounded-lg bg-emerald-50 p-6">
                        <h3 className="font-semibold text-emerald-900 mb-3">Subscription Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Plan:</span>
                                <span className="font-semibold text-gray-900">{plan || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment ID:</span>
                                <span className="font-mono text-xs text-gray-900">{paymentId || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span className="font-semibold text-emerald-600">Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600 mt-0.5" />
                                <span>You now have access to all courses in your plan</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600 mt-0.5" />
                                <span>Check your email for the confirmation and receipt</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600 mt-0.5" />
                                <span>Start learning immediately from our course library</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Link href="/">
                                <Video className="mr-2 h-4 w-4" />
                                Start Learning
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1">
                            <Link href="/pricing">View Plans</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    )
}
