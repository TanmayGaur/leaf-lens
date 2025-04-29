"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense, useEffect, useState } from "react"
import { getAllLeaves } from "@/lib/api"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation"

export default function BrowsePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BrowsePageContent />
    </Suspense>
  );
}

function BrowsePageContent() {
  const searchParams = useSearchParams()
  interface Leaf {
    id: string;
    name: string;
    image?: string;
    summary: string;
  }

  const [leafData, setLeafData] = useState<Leaf[] | null>(null)
  const [loading, setLoading] = useState(true)
  const page = Number(searchParams.get('page')) || 1
  
  useEffect(()=>{
    async function fetchAllLeaf() {
          try {
            const data = await getAllLeaves(page)
            setLeafData(data)
          } catch (error) {
            console.error("Error fetching leaf:", error)
            setLeafData([])
          } finally {
            setLoading(false)
          }
        }
        fetchAllLeaf()
  },[page])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container px-4 py-6 md:py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
            <p className="mt-4 text-lg">Loading leaf information...</p>
          </div>
        </main>
      </div>
    )
  }

  if (leafData === null) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container px-4 py-6 md:py-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Invalid page</h1>
            <p className="mb-6">We couldn&apos;t find information about this page.</p>
            <Button asChild>
              <Link href="/" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Return Home</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen mt-4">
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
                <p className="text-sm text-gray-500 mb-4 line-clamp-3">{leaf.summary}</p>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <Link href={`/leaf/${leaf.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-3">
          <Pagination>
            <PaginationContent>
              <PaginationPrevious href={`/browse/?page=${page-1}`} className={`${page === 1? "hidden":""}`}/>
              <PaginationEllipsis className={`${page === 1? "hidden":""}`}/>
              <PaginationItem>
                <PaginationLink className={`${page === 1? "hidden":""}`} href={`/browse/?page=${page-1}`}>{page-1}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`/browse/?page=${page+1}`} className={`${page === 8? "hidden":""}`}>{page+1}</PaginationLink>
              </PaginationItem>
              <PaginationEllipsis className={`${page === 8? "hidden":""}`}/>
              <PaginationNext href={`/browse/?page=${page+1}`} className={`${page === 8? "hidden":""}`}/>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container px-4 py-6 md:py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
          <p className="mt-4 text-lg">Loading leaf information...</p>
        </div>
      </main>
    </div>
  );
}