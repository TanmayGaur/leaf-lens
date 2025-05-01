import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
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
          <h1 className="text-2xl font-bold">About Leaf Lens</h1>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="prose prose-green lg:prose-lg">
            <p className="mb-2">
            <b>Welcome to Leaf Lens!</b> Your pocket-sized botanical expert combines cutting-edge AI and intuitive design to make plant identification and learning accessible to all—whether you&apos;re a botanist, gardener, or nature enthusiast.            
            </p>
            <h2 className="text-lg font-bold">Our Mission</h2>
            <p className="mb-2">
            We aim to connect technology with nature, empowering users to identify and understand diverse plant life with ease and enjoyment.
            </p>

            <h2 className="text-lg font-bold">How Leaf Lens Works</h2>
            <p className="mb-2">
            Leaf Lens offers two convenient ways to unlock information about the leaves you encounter:
            </p>
            <ul className="mb-2">
              <li className="list-disc ml-6"><b>Image-Based Search:</b> Capture or upload a leaf photo for precise identification and in-depth plant information.</li>
              <li className="list-disc ml-6"><b>Text-Based Search:</b> Search by keywords like name, leaf family, or scientific name for matching plants.</li>
            </ul>

            <h2 className="text-lg font-bold">AI Chatbot</h2>
            <p className="mb-2">
             Engage with our intelligent Gemini API-powered chatbot to explore identified plants&apos; uses, habitats, and botanical properties interactively.
            </p>

            <h2 className="text-lg font-bold">Our Technology Stack</h2>
            <ul className="list-disc ml-6 mb-4" >
              <li><b>Frontend:</b> Next.js for a seamless and responsive user interface.</li>
              <li><b>Backend:</b> Django REST framework for secure and scalable operations.</li>
              <li><b>Leaf Identification Model:</b> A deep learning Xception architecture built with TensorFlow for accurate leaf classification.</li>
            </ul>
            <h2 className="text-lg font-bold">Our Vision</h2>
            <p className="mb-2">
            Leaf Lens aspires to spark curiosity, promote learning, and strengthen the bond between people and the natural world.
            </p>

          </div>
        </div>
      </main>
    </div>
  )
}

