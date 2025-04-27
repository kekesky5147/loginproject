"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createAccount, login } from "./auth"
import { ZodFormattedError } from "zod"

export type CreateAccountFormState = {
  errors?:
    | ZodFormattedError<{ email: string; password: string; name: string }>
    | {
        email?: { _errors: string[] }
        password?: { _errors: string[] }
        name?: { _errors: string[] }
      }
} | null

export async function handleCreateAccount(
  state: CreateAccountFormState,
  formData: FormData
): Promise<CreateAccountFormState> {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
  }
  const result = await createAccount(data)
  if (result && "errors" in result) {
    return { errors: result.errors }
  }
  if (result && "session" in result) {
    cookies().set("session", result.session, { httpOnly: true })
    redirect("/profile")
  }
  return null
}

export type LoginFormState = {
  errors?:
    | ZodFormattedError<{ email: string; password: string }>
    | { email?: { _errors: string[] }; password?: { _errors: string[] } }
} | null

export async function handleLogin(
  state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }
  const result = await login(data)
  if (result && "errors" in result) {
    return { errors: result.errors }
  }
  if (result && "session" in result) {
    cookies().set("session", result.session, { httpOnly: true })
    redirect("/profile")
  }
  return null
}
