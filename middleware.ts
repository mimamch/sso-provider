import { NextRequest, NextResponse } from "next/server"

import { AUTH_TOKEN_KEY } from "./defaults/enum"

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get(AUTH_TOKEN_KEY)?.value

  if (req.nextUrl.pathname.includes("/auth")) {
    return NextResponse.next()
  }
  if (!token) {
    return NextResponse.redirect(req.nextUrl.origin + "/auth/login")
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon).*)",
  ],
}
