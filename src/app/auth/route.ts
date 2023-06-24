import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { AUTH_TOKEN_KEY } from "@/defaults/enum"
import { destroyAuth, verifyToken } from "@/server_actions/auth_actions"

export const revalidate = 0

export const GET = async (req: NextRequest) => {
  const token = cookies().get(AUTH_TOKEN_KEY)?.value
  const redirectUrl = req.nextUrl.searchParams.get("redirect")
  const responseRedirectToAuthPage = NextResponse.redirect(
    req.nextUrl.origin + "/auth/login?" + req.nextUrl.searchParams.toString()
  )
  if (!token) {
    return responseRedirectToAuthPage
  }

  const user = verifyToken(token)
  if (!user) {
    destroyAuth()
    return responseRedirectToAuthPage
  }
  if (redirectUrl) {
    const url = new URL(redirectUrl)
    url.searchParams.set("token", token)
    return NextResponse.redirect(url)
  }
  return NextResponse.redirect(req.nextUrl.origin)
}
