'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import FormError from '@/components/FormError'
import { handleCreateAccount, CreateAccountFormState } from '@/lib/auth-actions'

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
      {pending ? 'Creating account...' : '계정 생성'}
    </button>
  )
}

export default function CreateAccountPage () {
  const [state, formAction] = useActionState<CreateAccountFormState, FormData>(
    handleCreateAccount,
    null
  )

  // Zod 오류를 필드별로 분리
  const emailErrors = state?.errors?.email?._errors || []
  const passwordErrors = state?.errors?.password?._errors || []
  const nameErrors = state?.errors?.name?._errors || []

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
        <div>
          <input
            type='text'
            name='name'
            placeholder='Nickname'
            className={`w-full p-3 border rounded-md focus:outline-none ${
              nameErrors.length > 0 ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {nameErrors.length > 0 && <FormError errors={nameErrors} />}
        </div>
        <SubmitButton />
      </form>
    </div>
  )
}
