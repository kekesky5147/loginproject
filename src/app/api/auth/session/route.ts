import { getSession } from "@/lib/auth"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// GET - 세션 확인
export async function GET(req: Request) {
  const cookieStore = await cookies() // 쿠키를 비동기적으로 가져옴
  const session = cookieStore.get("session")?.value // 'session' 쿠키 값 가져오기

  console.log("쿠키 값:", session) // 쿠키 값 로그로 출력

  const user = await getSession(session)

  if (!user) {
    console.log("인증되지 않은 사용자", user) // user 값 로그로 출력
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    )
  }

  return NextResponse.json({ userId: user.userId })
}
