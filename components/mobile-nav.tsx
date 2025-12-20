'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

export function MobileNav() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 mt-8 pl-4">
                    <Link
                        href="/"
                        className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/contact"
                        className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        Contact
                    </Link>
                    <Link
                        href="/faq"
                        className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        FAQ
                    </Link>
                    <Button asChild className="bg-amber-400 hover:bg-amber-500 text-black font-semibold mt-4 btn-glow">
                        <Link href="/pricing" onClick={() => setOpen(false)}>
                            Buy Now
                        </Link>
                    </Button>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
