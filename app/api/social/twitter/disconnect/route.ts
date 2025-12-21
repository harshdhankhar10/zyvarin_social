import { currentLoggedInUserInfo } from "@/utils/currentLogegdInUserInfo"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST() {
  try {
    const session = await currentLoggedInUserInfo()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.socialProvider.updateMany({
      where: {
        userId: session.id,
        provider: 'twitter',
        isConnected: true,
      },
      data: {
        isConnected: false,
        access_token: null,
        refresh_token: null,
        expires_at: null,
        disconnectedAt: new Date(),
      },
    })

    return NextResponse.json({ 
      success: true, 
      message: "Twitter disconnected successfully" 
    })
    
  } catch (error) {
    console.error('Twitter disconnect error:', error)
    return NextResponse.json({ error: "Disconnect failed" }, { status: 500 })
  }
}