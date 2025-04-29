// src/app/api/tweets/route.ts
import { NextResponse } from "next/server"
import { getAllTweets } from "@/lib/prisma" // getAllTweets 함수 임포트

// GET 요청 시 트윗을 가져오는 함수
export async function GET() {
  try {
    const tweets = await getAllTweets() // getAllTweets 함수 호출하여 트윗 데이터를 가져옴
    return NextResponse.json(tweets) // 트윗 데이터를 JSON 형식으로 반환
  } catch (error) {
    return NextResponse.error() // 오류 발생 시 오류 응답 반환
  }
}
