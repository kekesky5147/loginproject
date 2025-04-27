import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/profile")) {
    const session = request.cookies.get("session")?.value
    const sessionData = await getSession(session)
    if (!sessionData?.userId) {
      return NextResponse.redirect(new URL("/log-in", request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/profile/:path*"],
}
