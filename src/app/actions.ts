"use server"

import { redirect } from "next/navigation"

export async function login(
  prevState: { message: string },
  formData: FormData
) {
  const email = formData.get("email") as string
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!email || !username || !password) {
    return { message: "Please fill in all fields." }
  }

  const emailRegex = /^[^\s@]+@zod\.com$/
  if (!emailRegex.test(email)) {
    return { message: "Please enter a valid email address." }
  }

  const usernameRegex = /^[a-zA-Z0-9]+$/
  if (!usernameRegex.test(username)) {
    return { message: "Username can only contain letters and numbers." }
  }
  if (username.length < 5) {
    return { message: "Username must be at least 5 characters long." }
  }

  if (password.length < 10) {
    return { message: "Password must be at least 10 characters long." }
  }
  const passwordNumberRegex = /\d/
  if (!passwordNumberRegex.test(password)) {
    return { message: "Password must contain at least one number." }
  }

  redirect("/dashboard")
}
