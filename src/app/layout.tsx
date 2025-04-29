// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css' // if globals.css is located in src/app/

export const metadata: Metadata = {
  title: {
    template: 'Login Project',
    default: 'Log-in'
  },
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
