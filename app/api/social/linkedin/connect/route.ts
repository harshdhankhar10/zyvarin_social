import { NextResponse } from "next/server"
import { currentLoggedInUserInfo } from "@/utils/currentLogegdInUserInfo"
import { canConnectMorePlatforms } from "@/app/dashboard/pricingUtils"

export async function GET() {
  try {
    const session = await currentLoggedInUserInfo()
    if(!session){
        return ;
    }
    
    if (!session?.id) {
      return ;
    }

    const canConnect = await canConnectMorePlatforms(session.id)
    if (!canConnect) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/connect-accounts?error=platform_limit_reached`)
    }

    const stateData = {
      userId: session.id,
      timestamp: Date.now(),
      nonce: Math.random().toString(36).substring(7)
    }

    const stateString = JSON.stringify(stateData)
    const state = Buffer.from(stateString).toString('base64')
    
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/social/linkedin/callback`
    
    const linkedinAuthUrl = new URL('https://www.linkedin.com/oauth/v2/authorization')
    linkedinAuthUrl.searchParams.set('response_type', 'code')
    linkedinAuthUrl.searchParams.set('client_id', process.env.LINKEDIN_CLIENT_ID!)
    linkedinAuthUrl.searchParams.set('redirect_uri', redirectUri)
    linkedinAuthUrl.searchParams.set('scope', 'openid profile email w_member_social')
    linkedinAuthUrl.searchParams.set('state', state)

    return NextResponse.redirect(linkedinAuthUrl.toString())
    
  } catch (error) {
    console.error('LinkedIn connect error:', error)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/connect-accounts?error=connection_failed`)
  }
}