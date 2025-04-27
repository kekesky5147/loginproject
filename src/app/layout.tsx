// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Login Project',
  description: '회원가입 및 로그인 데모'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ko'>
      <body className='bg-gray-100'>{children}</body>
    </html>
  )
}
