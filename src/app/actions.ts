"use server"

import { redirect } from "next/navigation"

interface FormState {
  errors: string[]
}

export async function login(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  const errors: string[] = []

  // 필수 입력 검증부분 코드
  if (!email || !username || !password) {
    errors.push("all:Please fill in all fields.")
  }

  // @zod.com 도메인만 허용 부분 코드
  const emailRegex = /^[^\s@]+@zod\.com$/
  if (email && !emailRegex.test(email)) {
    errors.push("email:Please enter a valid email address (example@zod.com).")
  }

  // 5글자 이상, 문자와 숫자만 허용 부분 코드
  const usernameRegex = /^[a-zA-Z0-9]+$/
  if (username && !usernameRegex.test(username)) {
    errors.push("username:Username can only contain letters and numbers.")
  }
  if (username && username.length < 5) {
    errors.push("username:Username must be at least 5 characters long.")
  }

  // 10글자 이상, 최소 1개의 숫자 포함 부분 코드

  const passwordNumberRegex = /\d/
  if (password && !passwordNumberRegex.test(password)) {
    errors.push("password:Password must contain at least one number.")
  }
  if (password && password.length < 10) {
    errors.push("password:Password must be at least 10 characters long and  .")
  }

  console.log("Errors from login action:", errors)

  // 에러가 있으면 반환 부분 코드
  if (errors.length > 0) {
    return { errors }
  }

  // 모든 검증 통과 시 페이지 전환
  redirect("/dashboard")
}
