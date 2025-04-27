'use client'

import { getSession } from '@/lib/auth'
import { useState, useEffect } from 'react'

export default function ProfilePage () {
  const [session, setSession] = useState<{ userId: number } | null>(null)

  useEffect(() => {
    async function fetchSession () {
      const cookie = document.cookie
        ?.split('; ')
        .find(row => row.startsWith('session='))
        ?.split('=')[1]
      const result = await getSession(cookie)
      setSession(result)
    }
    fetchSession()
  }, [])

  if (!session) {
    return <div>로그인이 필요합니다.</div>
  }

  return (
    <div>
      <h1>프로필</h1>
      <p>사용자 ID: {session.userId}</p>
    </div>
  )
}
