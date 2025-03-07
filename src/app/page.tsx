'use client'

import { Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const leafName = searchTerm.trim().toLowerCase();
    router.push(`/leaf/${leafName}`);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-green-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Discover the World of Leaves
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Identify any leaf, learn its benefits, and understand its uses in nature and medicine.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form onSubmit={handleSearch} className="flex w-full max-w-md items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                    type="search" 
                    placeholder="Search for a leaf..." 
                    className="w-full pl-8 bg-white"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearchTerm(e.target.value) }} />
                  </div>
                  <Button type="submit" variant="outline">Search</Button>
                </form>
                <p className="text-xs text-gray-500">Try searching for &quot;mint&quot;, &quot;oak&quot;, or &quot;basil&quot;</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <Link href="/upload">Upload Leaf Image</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/browse">Browse Common Leaves</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Leaf Lens makes it easy to identify and learn about any leaf in just a few steps.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <Search className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold">Search</h3>
                    <p className="text-gray-500 text-center mt-2">Search for a leaf by name or characteristics</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-green-600"
                      >
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                        <circle cx="12" cy="13" r="3" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Upload</h3>
                    <p className="text-gray-500 text-center mt-2">
                      Upload a photo of a leaf for instant identification
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-green-600"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Learn</h3>
                    <p className="text-gray-500 text-center mt-2">
                      Discover benefits, uses, and interesting facts about the leaf
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
