const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL+'/api' 

interface Message {
  content: string
  role: "user" | "assistant"
}


export async function uploadLeafImage(file: File){
  const formData = new FormData()
  formData.append("image", file)

  try {
    const response = await fetch(`${API_BASE_URL}/upload/`, {
      method: "POST",
      body: formData,
    })
    // console.log("response at api uploadleaf: ",response)
    // if (!response.ok) {
    //   throw new Error("Failed to upload image")
    // }

    const data = await response.json()
    // console.log("data in api: ",data)
    return data
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

export async function getAllLeaves(page : number) {
  try {
    const response = await fetch(`${API_BASE_URL}/leaves/?page=${page}`)

    if (!response.ok) {
      throw new Error("Failed to fetch leaves")
    }

    const data = await response.json()
    return data.results 
  } catch (error) {
    console.error("Error fetching leaves:", error)
    throw error
  }
}

export async function getLeafDetails(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/leaves/${id}/`)

    if (!response.ok) {
      throw new Error("Failed to fetch leaf details")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching leaf details:", error)
    throw error
  }
}

export async function sendChatMessage(question: string, leafId?: string, history?: Message[]) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: question,
        leaf_id: leafId,
        history: history ? JSON.stringify(history) : null,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send chat message")
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    console.error("Error sending chat message:", error)
    throw error
  }
}

export async function searchLeaves(query: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/leaves/?search=${encodeURIComponent(query)}`)

    if (!response.ok) {
      throw new Error("Failed to search leaves")
    }

    const data = await response.json()
    return data.results[0] 
  } catch (error) {
    console.error("Error searching leaves:", error)
    throw error
  }
}

export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health/`)

    if (!response.ok) {
      throw new Error("Backend health check failed")
    }

    const data = await response.json()
    return data.status === "ok"
  } catch (error) {
    console.error("Error checking backend health:", error)
    return false
  }
}
