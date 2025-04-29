import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import Link from "next/link";
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Leaf Lens - Discover the World of Leaves",
  description: "Identify any leaf, learn its benefits, and understand its uses in nature and medicine.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <header className="border-b">
          <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/leaf-lens-logo.jpeg?height=32&width=32"
                alt="Leaf Lens Logo"
                width={32}
                height={32}
                className="rounded-sm w-auto h-auto"
              />
              <span className="text-xl font-bold">Leaf Lens</span>
            </Link>
            <nav className="ml-auto flex gap-4">
              <Link href="/about" className="text-sm font-medium hover:underline">
                About
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t bg-gray-50 mt-4">
          <div className="container flex flex-col gap-2 sm:flex-row py-6 px-4 sm:px-6 lg:px-8 items-center justify-between">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Leaf Lens. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}


