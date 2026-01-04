'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function PaymentFailurePage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-6">
            <Card className="w-full max-w-2xl border-red-200 bg-white shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                        <XCircle className="h-12 w-12 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 sm:text-3xl">Payment Failed</CardTitle>
                    <CardDescription className="mt-2 text-lg text-gray-600">
                        We couldn't process your payment
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="rounded-lg bg-red-50 p-6">
                        <h3 className="font-semibold text-red-900 mb-3">What happened?</h3>
                        <p className="text-sm text-red-800">
                            Your payment could not be completed. This might have happened due to:
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-red-800">
                            <li className="flex items-start gap-2">
                                <span className="text-red-600">•</span>
                                <span>Insufficient funds in your account</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-600">•</span>
                                <span>Payment was cancelled or declined</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-600">•</span>
                                <span>Network connectivity issues</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-600">•</span>
                                <span>Card details were incorrect</span>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">What can you do?</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                                <RefreshCw className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
                                <span>Try the payment again with a different payment method</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <RefreshCw className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
                                <span>Check your card details and account balance</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <RefreshCw className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
                                <span>Contact your bank if the issue persists</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                            onClick={() => router.push('/pricing')}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>
                        <Button asChild variant="outline" className="flex-1">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Need help?{' '}
                            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                                Contact Support
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
