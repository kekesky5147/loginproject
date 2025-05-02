import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

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

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")?.value
  const user = await getSession(sessionCookie)

  if (!user) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    )
  }

  try {
    const { content, userId } = await req.json()

    if (!content || !userId) {
      return NextResponse.json(
        { error: "내용 또는 사용자 ID가 비어있습니다." },
        { status: 400 }
      )
    }

    if (user.userId !== parseInt(userId)) {
      return NextResponse.json(
        { error: "권한이 없는 사용자입니다." },
        { status: 403 }
      )
    }

    const tweet = await prisma.tweet.create({
      data: {
        content,
        userId: parseInt(userId),
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
