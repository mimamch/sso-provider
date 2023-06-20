import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { AUTH_REDIRECT_KEY, AUTH_TOKEN_KEY } from "@/defaults/enum"
import { destroyAuth, verifyToken } from "@/server_actions/auth_actions"

export const revalidate = 0

export const GET = async (req: NextRequest) => {
  const token = cookies().get(AUTH_TOKEN_KEY)?.value
  const redirect =
    req.nextUrl.searchParams.get("redirect") ??
    cookies().get(AUTH_REDIRECT_KEY)?.value
  if (redirect) {
    cookies().set(AUTH_REDIRECT_KEY, redirect)
  }
  if (!token) {
    return NextResponse.redirect(req.nextUrl.origin + "/auth/login")
  }

  const user = verifyToken(token)
  if (!user) {
    destroyAuth()
    return NextResponse.redirect(req.nextUrl.origin + "/auth/login")
  }
  if (redirect) {
    const redirectUrl = new URL(redirect)
    redirectUrl.searchParams.set("token", token)
    cookies().delete(AUTH_REDIRECT_KEY)
    return NextResponse.redirect(redirectUrl)
  }
  return NextResponse.redirect(req.nextUrl.origin)
}
