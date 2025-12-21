import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { NEXT_AUTH } from "@/utils/auth"
import { getServerSession } from "next-auth"
export async function GET() {
  try {
      const session = await getServerSession(NEXT_AUTH);
    if (!session?.user) {
        return NextResponse.json(
            { error: "Unauthorized" }, { status: 401 }
        );
    }
    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
    });


    const linkedinProvider = await prisma.socialProvider.findFirst({
      where: {
        userId: user?.id,
        provider: 'linkedin',
        isConnected: true,
      },
    })

    if (!linkedinProvider?.access_token) {
      return NextResponse.json({ 
        valid: false, 
        message: "LinkedIn not connected" 
      })
    }

    const verifyResponse = await fetch('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${linkedinProvider.access_token}`,
      },
    })

    if (verifyResponse.ok) {
      await prisma.socialProvider.update({
        where: { id: linkedinProvider.id },
        data: { lastUsedAt: new Date() }
      })

      return NextResponse.json({ 
        valid: true, 
        message: "Token is valid" 
      }, { status: 200 })
    } else {
      await prisma.socialProvider.update({
        where: { id: linkedinProvider.id },
        data: { 
          isConnected: false,
          disconnectedAt: new Date()
        }
      })

      return NextResponse.json({ 
        valid: false, 
        message: "Token is invalid or expired" 
      }, { status: 401 })
    }
    
  } catch (error) {
    console.error('LinkedIn verify error:', error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}