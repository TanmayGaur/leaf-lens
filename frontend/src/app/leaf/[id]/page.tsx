"use client"

import type React from "react"
import { useState, useEffect} from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useParams, useSearchParams } from "next/navigation"
import { sendChatMessage, searchLeaves, getLeafDetails } from "@/lib/api"


interface Message {
  content: string
  role: "user" | "assistant"
}

interface Leaf {
  id: string,
  name: string,
  image?: File,
  summary: string,
  scientific_name: string,
  family: string,
  native_region: string,
  leaf_type: string,
  benefits: { description: string }[],
  uses: { category: string, description: string }[],
  characteristics: { description: string }[],
  cultivation: { description: string }[],
  precautions: { description: string }[],
  similarLeaves?: { id: string, name: string, image?: string }[],
}


export default function LeafDetail() {
  const params = useParams()
  const id = params?.id as string
  const [leaf, setLeaf] = useState<Leaf | null>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const search = searchParams?.get("search") as string
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    async function fetchLeaf() {
      try {
        console.log("id",id)
        console.log("search",search)
        const leafData = id !== 's'? await getLeafDetails(id) : await searchLeaves(search)
        setLeaf(leafData)
        console.log("leafdata",leafData)
      } catch (error) {
        console.error("Error fetching leaf:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaf()
  }, [id,search])

  const handleSendQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim() || isSending) return
    const history  = messages
    setMessages((prev) => [...prev, { content: question, role: "user" }])
    setIsSending(true)
    
    try {
      // Get AI response from backend
      if (!leaf) {
        throw new Error("Leaf data is not available.");
      }
      const response = await sendChatMessage(question, leaf.id, history);

      setMessages((prev) => [
        ...prev,
        {
          content: response,
          role: "assistant",
        },
      ])
    } catch (error) {
      console.error("Error getting chat response:", error)

      setMessages((prev) => [
        ...prev,
        {
          content: "I'm sorry, I couldn't process your question. Please try again later.",
          role: 'assistant',
        },
      ])
    } finally {
      setQuestion("")
      setIsSending(false)
    }
  }
  // console.log("leaf",leaf)

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
  if (leaf === null || leaf === undefined) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container px-4 py-6 md:py-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Leaf Not Found</h1>
            <p className="mb-6">We couldn&apos;t find information about this leaf.</p>
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
          <h1 className="text-2xl font-bold">{leaf.name}</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden mb-6">
              <Image
                src={typeof leaf.image === "string" ? leaf.image : leaf.image ? URL.createObjectURL(leaf.image) : "/placeholder.svg"}
                alt={leaf.name}
                width={800}
                height={500}
                className="w-full h-96 object-cover"
              />
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="flex flex-wrap h-auto justify-start gap-2 sm:h-10">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="uses">Uses</TabsTrigger>
                <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
                <TabsTrigger value="cultivation">Cultivation</TabsTrigger>
                <TabsTrigger value="precautions">Precautions</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="p-4 border rounded-lg mt-2">
                <h2 className="text-xl font-bold mb-2">About {leaf.name}</h2>
                <p className="text-gray-700 mb-4">{leaf.summary}</p>

                <h3 className="text-lg font-semibold mb-2">Scientific Classification</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm">
                    <span className="font-medium">Scientific Name:</span> {leaf.scientific_name}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Family:</span> {leaf.family}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Native Region:</span> {leaf.native_region}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Leaf Type:</span> {leaf.leaf_type}
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
                      <span>{benefit.description}</span>
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
              <TabsContent value="characteristics" className="p-4 border rounded-lg mt-2">
                <h2 className="text-xl font-bold mb-4">Physical characteristics</h2>
                <ul className="space-y-2">
                  {leaf.characteristics.map((characteristic, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-green-600"></div>
                      </div>
                      <span>{characteristic.description}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="cultivation" className="p-4 border rounded-lg mt-2">
                <h2 className="text-xl font-bold mb-4">Cultivation tips</h2>
                <ul className="space-y-2">
                  {leaf.cultivation.map((cultivation, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-green-600"></div>
                      </div>
                      <span>{cultivation.description}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="precautions" className="p-4 border rounded-lg mt-2">
                <h2 className="text-xl font-bold mb-4">Precautions</h2>
                <ul className="space-y-2">
                  {leaf.precautions.map((precaution, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-green-600"></div>
                      </div>
                      <span>{precaution.description}</span>
                    </li>
                  ))}
                </ul>
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
                      <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            msg.role === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {msg.content}
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
                    disabled={isSending}
                  />
                  <Button type="submit" size="icon" disabled={isSending}>
                    {isSending ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
