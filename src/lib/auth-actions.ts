"use server"

import { login } from "./auth"
import { cookies } from "next/headers"

export interface LoginFormState {
  email: string
  password: string
  session: boolean
  errors?: {
    email?: string
    password?: string
    _form?: string
  }
}

export async function handleLogin(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const result = await login(data)

  if (result.errors) {
    const errors: LoginFormState["errors"] = {
      email: result.errors.email?._errors[0],
      password: result.errors.password?._errors[0],
    }
    // 타입 가드로 _form 처리
    if ("_form" in result.errors && result.errors._form) {
      errors._form = result.errors._form
    } else {
      errors._form = "로그인 실패"
    }
    return {
      ...prevState,
      session: false,
      errors,
    }
  }

  const cookieStore = await cookies()
  cookieStore.set("session", result.session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1일
    path: "/",
  })

  return {
    email: data.email,
    password: "",
    session: true,
    errors: undefined,
  }
}
