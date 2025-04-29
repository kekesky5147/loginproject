// src/app/api/tweets/[id]/route.ts

import { prisma } from '@/lib/prisma' // Prisma 클라이언트를 임포트

export async function GET (
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // `id` 파라미터가 정확히 전달되었는지 확인
    const { id } = params

    if (!id) {
      return new Response('ID is required', { status: 400 })
    }

    const tweet = await prisma.tweet.findUnique({
      where: { id: Number(id) }
    })

    if (!tweet) {
      return new Response('Tweet not found', { status: 404 })
    }

    return new Response(JSON.stringify(tweet), { status: 200 })
  } catch (error) {
    console.error('Error fetching tweet:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
