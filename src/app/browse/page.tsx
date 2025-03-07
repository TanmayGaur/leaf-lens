"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { leafData } from "@/lib/data"

export default function BrowsePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container px-4 py-6 md:py-12">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Browse Common Leaves</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leafData.map((leaf) => (
            <Card key={leaf.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={leaf.image || "/placeholder.svg"} alt={leaf.name} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{leaf.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4 line-clamp-3">{leaf.description}</p>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <Link href={`/leaf/${leaf.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

