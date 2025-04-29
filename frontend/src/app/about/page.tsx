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
            Welcome to Leaf Lens, your pocket-sized botanical expert! This innovative project aims to make plant identification and learning accessible and engaging for everyone. Whether you&apos;re a seasoned botanist, a curious gardener, or simply someone intrigued by the natural world, Leaf Lens offers a powerful and intuitive way to explore the fascinating realm of leaves.
            </p>

            <h2 className="text-lg font-bold">Our Mission</h2>
            <p className="mb-2">
            At Leaf Lens, our mission is to bridge the gap between technology and nature. We strive to empower users with the knowledge to identify and understand the diverse plant life around them. By leveraging the latest advancements in artificial intelligence and user-friendly design, we&apos;ve created a platform that is both informative and enjoyable to use.
            </p>

            <h2 className="text-lg font-bold">How Leaf Lens Works</h2>
            <p className="mb-2">
            Leaf Lens offers two convenient ways to unlock information about the leaves you encounter:
            </p>
            <ul className="mb-2">
              <li className="list-disc ml-6"><b>Image-Based Search:</b> Simply capture a clear photograph of a leaf using your device&apos;s camera or upload an existing image. Our intelligent system will analyze the visual characteristics and provide you with potential matches, along with detailed information about the identified plant.</li>
              <li className="list-disc ml-6"><b>Text-Based Search:</b> If you already have some information about a leaf, you can directly search using keywords such as shape, color, or venation patterns.</li>
            </ul>

            <h2 className="text-lg font-bold">Engage with Our AI Chatbot</h2>
            <p className="mb-2">
            Curiosity piqued? Once a leaf is identified, you can delve deeper by engaging with our intelligent AI chatbot, powered by the cutting-edge Gemini API. Ask specific questions about the plant&apos;s properties, uses, habitat, or any other botanical inquiries you may have. Our AI is trained to provide informative and engaging responses, making learning an interactive experience.
            </p>

            <h2 className="text-lg font-bold">Our Technology Stack</h2>
            <p>
              Behind the seamless user experience of Leaf Lens lies a robust and modern technology stack:
            </p>
            <ul className="list-disc ml-6 mb-4" >
              <li><b>Frontend:</b> We&apos;ve built the intuitive and responsive user interface using Next.js, a powerful React framework known for its performance and developer-friendly features.</li>
              <li><b>Backend:</b> Our server-side logic and API are powered by Django REST framework, providing a scalable and secure foundation for handling data and user requests.</li>
              <li><b>Leaf Identification Model:</b> The core of our image recognition capability lies in a sophisticated deep learning model. We meticulously trained an Xception architecture using TensorFlow to create a highly accurate Keras model for leaf classification.</li>
            </ul>
            <h2 className="text-lg font-bold">Our Vision</h2>
            <p className="mb-2">
            As aspiring technologists and nature enthusiasts, we envision Leaf Lens as more than just a plant identification tool. We hope it sparks a greater appreciation for the natural world, encourages learning, and fosters a deeper connection between people and the environment.
            </p>

          </div>
        </div>
      </main>
    </div>
  )
}

