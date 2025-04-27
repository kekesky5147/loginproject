'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import FormError from '@/components/FormError'
import { handleLogin, LoginFormState } from '@/lib/auth-actions'

function SubmitButton () {
  const { pending } = useFormStatus()
  return (
    <button
      type='submit'
      disabled={pending}
      className={`w-full p-3 rounded-md text-gray-700 font-semibold ${
        pending
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-red-400 hover:bg-red-500'
      }`}
    >
      {pending ? 'Logging in...' : '로그인'}
    </button>
  )
}

export default function LoginPage () {
  const [state, formAction] = useActionState<LoginFormState, FormData>(
    handleLogin,
    null
  )

  // 디버깅: formState의 실제 값 확인
  console.log('Login Page Form State:', state)

  // Zod 오류를 필드별로 분리
  const emailErrors = state?.errors?.email?._errors || []
  const passwordErrors = state?.errors?.password?._errors || []

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-white'>
      <div className='mb-8'>
        <div className='flex items-center justify-center text-black text-2xl'>
          W E L C O M E
        </div>
      </div>
      <form noValidate action={formAction} className='w-80 space-y-4'>
        <div>
          <input
            type='email'
            name='email'
            placeholder='Enter your email (user@zod.com)'
            className={`w-full p-3 border rounded-md focus:outline-none ${
              emailErrors.length > 0 ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {emailErrors.length > 0 && <FormError errors={emailErrors} />}
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='Password'
            className={`w-full p-3 border rounded-md focus:outline-none ${
              passwordErrors.length > 0 ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {passwordErrors.length > 0 && <FormError errors={passwordErrors} />}
        </div>
        <SubmitButton />
      </form>
    </div>
  )
}
