"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { uploadLeafImage } from "@/lib/api"
import { useRouter } from "next/navigation"
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/dropzone"

interface RecognitionResult {
  recognition?: {
    name?: string;
    confidence?: number;
  };
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recognition, setRecognition] = useState<RecognitionResult['recognition'] | null>(null)
  const [leafId, setLeafId] = useState<string | null>(null)

  const handleDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0] || null;
    setFile(selectedFile);
    setError(null);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image to upload")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Upload the image to the backend
      const result = await uploadLeafImage(file)
      console.log("result of upload",result)
      setIsUploading(false)
      setIsAnalyzing(true)

      if (result.recognition && result.leaf_id) {
        setTimeout(() => {
          setLeafId(result.leaf_id)
          setRecognition(result.recognition)
        }, 2000) // Short delay to show the analyzing state
      } else {
        setError("Could not identify the leaf. Please try a different image.")
        setIsAnalyzing(false)
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      setError("Failed to upload image. Please try again.")
      setIsUploading(false)
      setIsAnalyzing(false)
    }
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
          <h1 className="text-2xl font-bold">Upload Leaf Image</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Leaf Identification</CardTitle>
              <CardDescription>
                Upload a clear image of a leaf to identify it and learn about its properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recognition!==null?
              <>
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={preview || "/placeholder.svg"} alt={recognition?.name || "Leaf preview"} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>{recognition?.name || "Unknown Leaf"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3">Confidence: {recognition?.confidence ?? "N/A"}</p>
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                      <Link href={recognition ? `/leaf/${leafId}` : "#"}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              </>
              :
              <>
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-12 w-12 text-green-600 animate-spin mb-4" />
                  <h3 className="text-xl font-medium mb-2">Analyzing your leaf...</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    Our AI is examining the leaf characteristics to provide you with accurate information.
                  </p>
                </div>
              ) : (
                <>
                  <div
                    className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center"
                    style={{ minHeight: "250px" }}
                  >
                    {preview ? (
                      <div className="relative w-full max-w-md">
                        <Image
                          src={preview || "/placeholder.svg"}
                          alt="Leaf preview"
                          width={400}
                          height={300}
                          className="rounded-lg mx-auto max-h-[300px] w-auto object-contain"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setFile(null)
                            setPreview(null)
                            setError(null)
                          }}
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                        <Dropzone
                        maxSize={1024 * 1024 * 10}
                        minSize={1024}
                        maxFiles={1}
                        accept={{ 'image/*': [] }}
                        onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
                        onError={(error) => setError(error.message)}
                        >
                        <DropzoneEmptyState />
                        <DropzoneContent />
                        </Dropzone>
                    )}
                  </div>

                  {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Tips for best results:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Use a well-lit image with the leaf clearly visible</li>
                      <li>Place the leaf against a contrasting background</li>
                      <li>Include the entire leaf in the frame if possible</li>
                      <li>Avoid shadows or glare on the leaf surface</li>
                    </ul>
                  </div>
                </>
              )}
              </>}
            </CardContent>
            {preview && !isAnalyzing && (
              <CardFooter>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleUpload}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Identify Leaf"
                  )}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
