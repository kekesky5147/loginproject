'use client'

// src/app/profile/page.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-actions'

export default function ProfilePage () {
  const [user, setUser] = useState<{ email: string; nickname: string } | null>(
    null
  )
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem('currentUser')
    if (!email) {
      router.push('/log-in')
      return
    }

    const currentUser = getCurrentUser(email)
    if (currentUser) {
      setUser(currentUser)
    } else {
      localStorage.removeItem('currentUser')
      router.push('/log-in')
    }
  }, [router])

  if (!user) {
    return (
      <div className='flex justify-center items-center min-h-screen text-center'>
        로딩 중...
      </div>
    )
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md relative'>
        <button
          onClick={() => router.push('/')}
          className='absolute top-4 left-4  text-gray-700 px-3 py-1 rounded-md '
        >
          Home
        </button>
        <h1 className='text-2xl font-bold mb-6 text-center'>프로필</h1>
        <p className='text-lg mb-2'>이메일: {user.email}</p>
        <p className='text-lg mb-4'>닉네임: {user.nickname}</p>
        <button
          onClick={() => {
            localStorage.removeItem('currentUser')
            router.push('/log-in')
          }}
          className='w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600'
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}
