import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileSizeInMB = file.size / (1024 * 1024)
    if (fileSizeInMB > 5) {
      return NextResponse.json({ error: 'File too large. Maximum 5MB.' }, { status: 400 })
    }

    const uploadFormData = new FormData()
    uploadFormData.append('image', file)

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      uploadFormData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000
      }
    )

    if (response.data.success) {
      return NextResponse.json({ 
        success: true, 
        imageUrl: response.data.data.url 
      })
    }

    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({ 
      error: error.response?.status === 413 ? 'File too large' : 'Upload failed' 
    }, { status: 500 })
  }
}