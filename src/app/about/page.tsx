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
            <p className="lead">
              Leaf Lens is a platform dedicated to helping people identify and learn about various types of leaves,
              their benefits, and uses in nature and medicine.
            </p>

            <h2 className="text-lg font-bold">Our Mission</h2>
            <p>
              Our mission is to connect people with the natural world by providing accessible, accurate information
              about plants and their leaves. We believe that understanding the plants around us can lead to greater
              appreciation for nature and more sustainable living practices.
            </p>

            <h2 className="text-lg font-bold">How It Works</h2>
            <p>
              Leaf Lens uses a combination of image recognition technology and a comprehensive database of plant
              information to help users identify leaves and learn about their properties. Simply upload a photo of a
              leaf or search for a specific plant, and our system will provide you with detailed information about it.
            </p>

            <h2 className="text-lg font-bold">Our Team</h2>
            <p>
              Leaf Lens was created by a team of botanists, developers, and nature enthusiasts who share a passion for
              plants and technology. Our experts continually update our database with the latest research and
              information to ensure accuracy and relevance.
            </p>

            <h2 className="text-lg font-bold">Privacy and Data</h2>
            <p>
              We respect your privacy and handle all data with care. Images uploaded to Leaf Lens are used solely for
              identification purposes and are not shared with third parties without consent. For more information,
              please see our Privacy Policy.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

