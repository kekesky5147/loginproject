// src/app/api/tweets/route.ts
import { prisma } from "@/lib/prisma"
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
        select: { name: true }, // 닉네임만 가져오기
      },
    },
  })

  const totalCount = await prisma.tweet.count()
  const totalPages = Math.ceil(totalCount / pageSize)

  return NextResponse.json({ tweets, totalPages })
}
