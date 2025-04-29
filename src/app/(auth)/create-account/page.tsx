'use client'

// src/app/create-account/page.tsx
import { useState } from 'react'
import { useFormState } from 'react-dom'
import { CreateAccountFormState, createAccount } from '@/lib/auth-actions'
import { useRouter } from 'next/navigation'

const initialState: CreateAccountFormState = {
  email: '',
  password: '',
  nickname: ''
}

export default function CreateAccountPage () {
  const [state, formAction] = useFormState(createAccount, initialState)
  const [formState, setFormState] =
    useState<CreateAccountFormState>(initialState)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  // 성공 시 로그인 페이지로 이동
  if (state.errors && Object.keys(state.errors).length === 0) {
    router.push('/log-in')
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md relative'>
        <button
          onClick={() => router.push('/')}
          className='absolute top-4 left-4 text-gray-700 px-3 py-1 rounded-md'
        >
          Home
        </button>
        <h1 className='text-2xl font-bold mb-6 text-center'>계정 생성</h1>
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

          <div className='mb-4'>
            <label
              htmlFor='nickname'
              className='block text-sm font-medium text-gray-700'
            >
              닉네임
            </label>
            <input
              type='text'
              id='nickname'
              name='nickname'
              value={formState.nickname}
              onChange={handleInputChange}
              className='mt-1 w-full p-2 border rounded-md'
              placeholder='5글자 이상, 중복 불가'
            />
            {state.errors?.nickname && (
              <p className='text-red-500 text-sm mt-1'>
                {state.errors.nickname}
              </p>
            )}
          </div>

          <button
            type='submit'
            className='w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600'
          >
            계정 생성
          </button>
        </form>
      </div>
    </div>
  )
}
