import { z } from "zod"

export const createAccountSchema = z.object({
  email: z
    .string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .refine((email) => email.endsWith("@zod.com"), {
      message: "이메일은 @zod.com 도메인이어야 합니다.",
    }),
  password: z
    .string()
    .min(10, "비밀번호는 최소 10글자 이상이어야 합니다.")
    .regex(/\d/, "비밀번호는 최소 한 개 이상의 숫자를 포함해야 합니다."),
  name: z.string().min(5, "닉네임은 최소 5글자 이상이어야 합니다."),
})

export const loginSchema = z.object({
  email: z
    .string()
    .email("유효한 이메일 주소를 입력해주세요.")
    .refine((email) => email.endsWith("@zod.com"), {
      message: "이메일은 @zod.com 도메인이어야 합니다.",
    }),
  password: z
    .string()
    .min(10, "비밀번호는 최소 10글자 이상이어야 합니다.")
    .regex(/\d/, "비밀번호는 최소 한 개 이상의 숫자를 포함해야 합니다."),
})
