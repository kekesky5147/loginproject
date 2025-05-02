import { getSession } from "@/lib/auth"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(req: Request) {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value

  console.log("세션 쿠키:", session)

  const user = await getSession(session)

  if (!user) {
    console.log("인증 실패, 사용자:", user)
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    )
  }

  return NextResponse.json({ userId: user.userId })
}
