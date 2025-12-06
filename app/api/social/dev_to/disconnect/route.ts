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
        provider: 'devto',
        isConnected: true,
      },
      data: {
        isConnected: false,
        access_token: null,
        disconnectedAt: new Date(),
      },
    })

    return NextResponse.json({
        message: "Dev.to disconnected successfully",
    }, { status: 200 })
    
  } catch (error) {
    console.error('Dev.to disconnect error:', error)
    return NextResponse.json({ error: "Disconnect failed" }, { status: 500 })
  }
}