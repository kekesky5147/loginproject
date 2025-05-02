import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createAccount } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = await createAccount(body)

    if (result.errors) {
      return NextResponse.json({ errors: result.errors }, { status: 400 })
    }

    const cookieStore = await cookies()
    cookieStore.set("session", result.session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    })

    return NextResponse.json({ message: "계정 생성 성공" })
  } catch (error) {
    console.error("계정 생성 오류:", error)
    return NextResponse.json({ error: "서버 오류" }, { status: 500 })
  }
}
