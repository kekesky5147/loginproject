'use client'

// src/app/page.tsx
import Link from 'next/link'

export default function HomePage () {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center'>
        <h1 className='text-2xl font-bold mb-6'>홈페이지</h1>
        <p className='mb-4'>환영합니다! 아래 링크로 이동하세요.</p>
        <div className='space-y-2'>
          <Link
            href='/create-account'
            className='block text-blue-600 hover:underline '
          >
            회원가입
          </Link>
          <Link href='/log-in' className='block text-blue-600 hover:underline'>
            로그인
          </Link>
          <Link href='/profile' className='block text-blue-600 hover:underline'>
            프로필
          </Link>
        </div>
      </div>
    </div>
  )
}
