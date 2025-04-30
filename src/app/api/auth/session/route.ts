import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

// GET - 트윗 리스트 조회
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get("page") || "1", 10)
  const pageSize = 5

  const tweets = await prisma.tweet.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true },
      },
    },
  })

  const totalCount = await prisma.tweet.count()
  const totalPages = Math.ceil(totalCount / pageSize)

  return NextResponse.json({ tweets, totalPages })
}

// POST - 트윗 작성
export async function POST(req: Request) {
  // 비동기적으로 쿠키를 가져오는 부분에 await 추가
  const cookieStore = cookies()
  const sessionCookie = (await cookieStore).get("session")?.value
  const user = await getSession(sessionCookie)

  if (!user) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    )
  }

  try {
    const body = await req.json()
    const { content } = body

    if (!content) {
      return NextResponse.json(
        { error: "내용이 비어있습니다." },
        { status: 400 }
      )
    }

    const tweet = await prisma.tweet.create({
      data: {
        content,
        userId: user.userId,
      },
    })

    return NextResponse.json({ tweet }, { status: 201 })
  } catch (error) {
    console.error("트윗 작성 오류:", error)
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
