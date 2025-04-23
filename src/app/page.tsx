'use client'

import { useFormStatus } from 'react-dom'
import { login } from './actions'
import { useState } from 'react'

interface FormState {
  errors: string[]
}

function SubmitButton ({ isFormFilled }: { isFormFilled: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button
      type='submit'
      disabled={pending}
      className={`w-full p-3 rounded-md text-gray-700 font-semibold ${
        pending
          ? 'bg-gray-400 cursor-not-allowed'
          : isFormFilled
          ? 'bg-red-400'
          : 'bg-red-300'
      }`}
    >
      {pending ? 'Logging in...' : 'Log in'}
    </button>
  )
}

export default function Home () {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formState, setFormState] = useState<FormState>({ errors: [] })

  const isFormFilled =
    email.trim() !== '' && username.trim() !== '' && password.trim() !== ''

  const handleSubmit = async (formData: FormData) => {
    const result = await login({ errors: [] }, formData)
    console.log('Login Result:', result)
    setFormState(result)
  }

  console.log('Form State Errors:', formState.errors)

  // 에러 메시지를 각각 input 개별 필터링
  const emailErrors =
    formState.errors
      ?.filter((error: string) => error.startsWith('email:'))
      .map((error: string) => error.split(':')[1]) || []
  const usernameErrors =
    formState.errors
      ?.filter((error: string) => error.startsWith('username:'))
      .map((error: string) => error.split(':')[1]) || []
  const passwordErrors =
    formState.errors
      ?.filter((error: string) => error.startsWith('password:'))
      .map((error: string) => error.split(':')[1]) || []
  const allErrors =
    formState.errors
      ?.filter((error: string) => error.startsWith('all:'))
      .map((error: string) => error.split(':')[1]) || []

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-white'>
      <div className='mb-8'>
        <div className='flex items-center justify-center text-black text-2xl'>
          W E L C O M E
        </div>
      </div>
      <form
        action={handleSubmit}
        noValidate // ***HTML5 기본 유효성 검사 비활성화 HTML에서 띄워주는 오류 팝업 메세지 제거
        onSubmit={() =>
          console.log('Form submitted with:', { email, username, password })
        }
        className='w-80 space-y-4'
      >
        <div>
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`w-full p-3 border rounded-md focus:outline-none ${
              emailErrors.length > 0 ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {emailErrors.length > 0 &&
            emailErrors.map((error: string, index: number) => (
              <p key={index} className='text-sm text-red-600 mt-1'>
                {error}
              </p>
            ))}
        </div>
        <div>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            pattern='[a-zA-Z0-9]+'
            title='Username can only contain letters and numbers.'
            className={`w-full p-3 border rounded-md focus:outline-none ${
              usernameErrors.length > 0 ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {usernameErrors.length > 0 &&
            usernameErrors.map((error: string, index: number) => (
              <p key={index} className='text-sm text-red-600 mt-1'>
                {error}
              </p>
            ))}
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`w-full p-3 border rounded-md focus:outline-none ${
              passwordErrors.length > 0 ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {passwordErrors.length > 0 &&
            passwordErrors.map((error: string, index: number) => (
              <p key={index} className='text-sm text-red-600 mt-1'>
                {error}
              </p>
            ))}
        </div>
        {allErrors.length > 0 &&
          allErrors.map((error: string, index: number) => (
            <p key={index} className='text-center text-sm text-red-600'>
              {error}
            </p>
          ))}
        <SubmitButton isFormFilled={isFormFilled} />
      </form>
    </div>
  )
}
