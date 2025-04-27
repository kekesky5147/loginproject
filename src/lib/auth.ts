import { sealData, unsealData } from "iron-session"
import bcrypt from "bcrypt"
import prisma from "./prisma"
import { createAccountSchema, loginSchema } from "./zodSchemas"
import { ZodFormattedError } from "zod"

const SESSION_SECRET = process.env.SESSION_SECRET || "your-secret-key"
const saltRounds = 10

type CreateAccountResult =
  | { session: string; errors?: never }
  | {
      errors:
        | ZodFormattedError<{ email: string; password: string; name: string }>
        | {
            email?: { _errors: string[] }
            password?: { _errors: string[] }
            name?: { _errors: string[] }
          }
      session?: never
    }

export async function createAccount(
  data: unknown
): Promise<CreateAccountResult> {
  const parsed = createAccountSchema.safeParse(data)
  if (!parsed.success) {
    return { errors: parsed.error.format() }
  }

  const { email, password, name } = parsed.data

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return { errors: { email: { _errors: ["이미 사용 중인 이메일입니다."] } } }
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  })

  const session = await sealData(
    { userId: user.id },
    { password: SESSION_SECRET }
  )
  return { session }
}

type LoginResult =
  | { session: string; errors?: never }
  | {
      errors:
        | ZodFormattedError<{ email: string; password: string }>
        | { email?: { _errors: string[] }; password?: { _errors: string[] } }
      session?: never
    }

export async function login(data: unknown): Promise<LoginResult> {
  const parsed = loginSchema.safeParse(data)
  if (!parsed.success) {
    return { errors: parsed.error.format() }
  }

  const { email, password } = parsed.data

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { errors: { email: { _errors: ["등록되지 않은 이메일입니다."] } } }
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return {
      errors: { password: { _errors: ["비밀번호가 올바르지 않습니다."] } },
    }
  }

  const session = await sealData(
    { userId: user.id },
    { password: SESSION_SECRET }
  )
  return { session }
}

export async function getSession(
  session: string | undefined
): Promise<{ userId: number } | null> {
  if (!session) return null
  try {
    const data = await unsealData<{ userId: number }>(session, {
      password: SESSION_SECRET,
    })
    if (!data || typeof data.userId !== "number") return null
    return { userId: data.userId }
  } catch {
    return null
  }
}
