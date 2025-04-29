// src/lib/prisma.ts
// lib/prisma.ts (또는 해당 함수가 있는 파일)

export const createTweet = async (content: string) => {
  return prisma.tweet.create({
    data: {
      content,
      user: {
        connect: { id: 1 }, // 사용자 ID (테스트용)
      },
    },
  })
}
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export { prisma }

export const getAllTweets = async () => {
  try {
    const tweets = await prisma.tweet.findMany({
      include: {
        user: true,
        likes: true,
      },
    })
    console.log("Fetched tweets from database:", tweets) // 여기서 데이터가 올바르게 나오는지 확인
    return tweets || [] // 빈 배열 반환을 보장
  } catch (error) {
    console.error("Error fetching tweets:", error)
    throw new Error("트윗을 가져오는 도중 오류가 발생했습니다.")
  }
}

export const getTweetById = async (id: number) => {
  return await prisma.tweet.findUnique({
    where: { id },
    include: {
      user: true,
      likes: true,
    },
  })
}
