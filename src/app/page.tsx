'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { login } from './actions'
import { useState } from 'react'

function SubmitButton ({ isFormFilled }: { isFormFilled: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button
      type='submit'
      disabled={pending}
      className={`w-full p-3 rounded-md text-gray-800 font-semibold ${
        pending
          ? 'bg-gray-400 -not-allowed'
          : isFormFilled
          ? 'bg-red-400'
          : 'bg-red-300 '
      }`}
    >
      {pending ? 'Logging in...' : 'Log in'}
    </button>
  )
}

export default function Home () {
  const [state, formAction] = useFormState(login, { message: '' })
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const isFormFilled =
    email.trim() !== '' && username.trim() !== '' && password.trim() !== ''

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-white'>
      <div className='mb-8'>
        <div className='flex items-center justify-center text-black text-2xl'>
          W E L C O M E
        </div>
      </div>
      <form action={formAction} className='w-80 space-y-4'>
        <div>
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none'
            required
          />
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
            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none'
            required
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`w-full p-3 border rounded-md focus:outline-none ${
              state.message === 'Invalid password.'
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            required
          />
        </div>
        {state.message && (
          <p className='text-center text-sm text-red-600'>{state.message}</p>
        )}
        <SubmitButton isFormFilled={isFormFilled} />
      </form>
    </div>
  )
}
