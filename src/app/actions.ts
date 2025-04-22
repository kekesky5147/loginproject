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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { message: "Please enter a valid email address." }
  }

  const usernameRegex = /^[a-zA-Z0-9]+$/
  if (!usernameRegex.test(username)) {
    return { message: "Username can only contain letters and numbers." }
  }

  if (password !== "12345") {
    return { message: "Invalid password." }
  }

  redirect("/dashboard")
}
