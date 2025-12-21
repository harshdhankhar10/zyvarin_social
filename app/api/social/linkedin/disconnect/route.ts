import { NEXT_AUTH } from "@/utils/auth"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"

export async function POST() {
    const session = await getServerSession(NEXT_AUTH);
    if (!session?.user) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" }, { status: 401 }
    );
    }
    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
    });

  try {

    await prisma.socialProvider.updateMany({
      where: {
        userId: user?.id,
        provider: 'linkedin',
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
      message: "LinkedIn disconnected successfully"
    }, { status: 200 })
    
  } catch (error) {
    console.error('LinkedIn disconnect error:', error)
    return NextResponse.json({ success: false, error: "Disconnect failed" }, { status: 500 })
  }
}