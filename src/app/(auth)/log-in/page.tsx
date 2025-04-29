'use client'

// src/app/log-in/page.tsx
import { useState, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { LoginFormState, handleLogin } from '@/lib/auth-actions'
import { useRouter } from 'next/navigation'

const initialState: LoginFormState = {
  email: '',
  password: '',
  session: false
}

export default function LoginPage () {
  const [state, formAction] = useFormState(handleLogin, initialState)
  const [formState, setFormState] = useState<LoginFormState>(initialState)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  // 로그인 성공 시 프로필 페이지로 이동
  useEffect(() => {
    if (
      state.session &&
      state.errors &&
      Object.keys(state.errors).length === 0
    ) {
      localStorage.setItem('currentUser', formState.email)
      router.push('/profile')
    }
  }, [state.session, state.errors, formState.email, router])

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md relative'>
        <button
          onClick={() => router.push('/')}
          className='absolute top-4 left-4  text-gray-700 px-3 py-1 rounded-md '
        >
          Home
        </button>
        <h1 className='text-2xl font-bold mb-6 text-center'>로그인</h1>
        <form action={formAction}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              이메일
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formState.email}
              onChange={handleInputChange}
              className='mt-1 w-full p-2 border rounded-md'
              placeholder='example@zod.com'
            />
            {state.errors?.email && (
              <p className='text-red-500 text-sm mt-1'>{state.errors.email}</p>
            )}
          </div>

          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              비밀번호
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formState.password}
              onChange={handleInputChange}
              className='mt-1 w-full p-2 border rounded-md'
            />
            {state.errors?.password && (
              <p className='text-red-500 text-sm mt-1'>
                {state.errors.password}
              </p>
            )}
          </div>

          {state.session &&
            state.errors &&
            Object.keys(state.errors).length === 0 && (
              <p className='text-green-500 text-sm mb-4'>
                로그인 성공! 프로필로 이동합니다.
              </p>
            )}
          {state.errors && Object.keys(state.errors).length > 0 && (
            <p className='text-red-500 text-sm mb-4'>
              로그인 실패. 입력을 확인하세요.
            </p>
          )}

          <button
            type='submit'
            className='w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  )
}
