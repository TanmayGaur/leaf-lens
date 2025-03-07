"use client"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useParams } from "next/navigation"
import { leafData } from "@/lib/data"
export default function LeafDetail() {
  const params = useParams()
  const id = params?.id as string
  const leaf = leafData.find((leaf) => leaf.id === id) || leafData[0];
  // if(leaf === undefined){
  //   return (
  //       <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
  //         <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
  //         <p className="text-gray-600 mb-8">We couldn't find the leaf you're looking for.</p>
  //         <Link href="/" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
  //           Return Home
  //         </Link>
  //       </div>
  //     )
  // }
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return
    // Add user message
    setMessages((prev) => [...prev, { text: question, isUser: true }])
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: `Thank you for your question about ${leaf.name}. ${leaf.name} leaves are known for ${leaf.benefits[0].toLowerCase()}. Would you like to know more about specific uses or benefits?`,
          isUser: false,
        },
      ])
    }, 1000)
    setQuestion("")
  }
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
          <h1 className="text-2xl font-bold">{leaf.name}</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden mb-6">
              <Image
                src={leaf.image || "/placeholder.svg"}
                alt={leaf.name}
                width={800}
                height={500}
                className="max-h-96 object-cover "
              />
            </div>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="uses">Uses</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="p-4 border rounded-lg mt-2">
                <h2 className="text-xl font-bold mb-2">About {leaf.name}</h2>
                <p className="text-gray-700 mb-4">{leaf.description}</p>
                <h3 className="text-lg font-semibold mb-2">Scientific Classification</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm">
                    <span className="font-medium">Scientific Name:</span> {leaf.scientificName}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Family:</span> {leaf.family}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Native Region:</span> {leaf.nativeRegion}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Leaf Type:</span> {leaf.leafType}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="benefits" className="p-4 border rounded-lg mt-2">
                <h2 className="text-xl font-bold mb-4">Health Benefits</h2>
                <ul className="space-y-2">
                  {leaf.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-green-600"></div>
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="uses" className="p-4 border rounded-lg mt-2">
                <h2 className="text-xl font-bold mb-4">Common Uses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leaf.uses.map((use, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{use.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">{use.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Ask about this leaf
                </CardTitle>
                <CardDescription>Have questions about {leaf.name}? Ask our plant expert.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] overflow-y-auto mb-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <p>No messages yet. Ask a question to get started!</p>
                    </div>
                  ) : (
                    messages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            msg.isUser ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <form onSubmit={handleSendQuestion} className="flex gap-2">
                  <Input
                    placeholder="Type your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Similar Leaves</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leafData
                    .filter((l) => l.id !== leaf.id)
                    .slice(0, 3)
                    .map((similarLeaf) => (
                      <Link
                        href={`/leaf/${similarLeaf.id}`}
                        key={similarLeaf.id}
                        className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                      >
                        <Image
                          src={similarLeaf.image || "/placeholder.svg"}
                          alt={similarLeaf.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover w-12 h-12"
                        />
                        <div>
                          <h3 className="font-medium">{similarLeaf.name}</h3>
                          <p className="text-xs text-gray-500">{similarLeaf.family}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
