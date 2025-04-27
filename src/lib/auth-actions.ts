// src/lib/auth-actions.ts

// 회원가입 폼 상태 타입
export type CreateAccountFormState = {
  email: string
  password: string
  nickname: string
  errors?: Record<string, string>
}

// 로그인 폼 상태 타입
export type LoginFormState = {
  email: string
  password: string
  nickname?: string
  session?: boolean
  errors?: Record<string, string>
}

// 모의 사용자 데이터 저장소 (실제로는 DB 사용)
const users: Record<
  string,
  { email: string; password: string; nickname: string }
> = {}

// 회원가입 서버 액션
export async function createAccount(
  prevState: CreateAccountFormState,
  formData: FormData
): Promise<CreateAccountFormState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const nickname = formData.get("nickname") as string

  const errors: Record<string, string> = {}

  // 이메일: @zod.com 형식
  if (!email || !/^[a-zA-Z0-9._%+-]+@zod\.com$/.test(email)) {
    errors.email = "필수: @zod.com으로 끝나는 유효한 이메일을 입력하세요."
  }
  // 비밀번호: 10글자 이상, 최소 1개 숫자
  if (!password || password.length < 10 || !/\d/.test(password)) {
    errors.password = "필수: 10글자 이상, 최소 1개의 숫자를 포함해야 합니다."
  }
  // 닉네임: 5글자 이상
  if (!nickname || nickname.length < 5) {
    errors.nickname = "필수: 닉네임은 5글자 이상이어야 합니다."
  }
  // 중복 이메일 체크
  if (users[email]) {
    errors.email = "이미 등록된 이메일입니다."
  }
  // 중복 닉네임 체크
  if (Object.values(users).some((user) => user.nickname === nickname)) {
    errors.nickname = "이미 사용 중인 닉네임입니다."
  }

  if (Object.keys(errors).length > 0) {
    return { email, password, nickname, errors }
  }

  // 사용자 등록
  users[email] = { email, password, nickname }
  console.log("User created:", { email, nickname }) // 디버깅용
  return { email, password, nickname, errors: {} }
}

// 로그인 서버 액션
export async function handleLogin(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const errors: Record<string, string> = {}
  if (!email || !/^[a-zA-Z0-9._%+-]+@zod\.com$/.test(email)) {
    errors.email = "필수: @zod.com으로 끝나는 유효한 이메일을 입력하세요."
  }
  if (!password) {
    errors.password = "비밀번호를 입력하세요."
  }
  if (!users[email]) {
    errors.email = "등록되지 않은 이메일입니다."
  } else if (users[email].password !== password) {
    errors.password = "비밀번호가 일치하지 않습니다."
  }

  if (Object.keys(errors).length > 0) {
    return { email, password, session: false, errors }
  }

  console.log("Login successful:", { email }) // 디버깅용
  return {
    email,
    password,
    nickname: users[email].nickname,
    session: true,
    errors: {},
  }
}

// 현재 로그인한 사용자 정보 가져오기 (프로필 페이지용)
export function getCurrentUser(
  email: string
): { email: string; nickname: string } | null {
  if (users[email]) {
    return { email: users[email].email, nickname: users[email].nickname }
  }
  return null
}
