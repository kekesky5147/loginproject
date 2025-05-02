'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TweetForm () {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit (event: React.FormEvent) {
    event.preventDefault()
    setError('')
    setSuccess(false)

    try {
      // 세션 체크
      const sessionRes = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include'
      })

      if (!sessionRes.ok) {
        setError('로그인이 필요합니다.')
        return
      }

      const session = await sessionRes.json()
      if (!session.userId) {
        setError('사용자 정보를 가져올 수 없습니다.')
        return
      }

      // 트윗 전송
      const res = await fetch('/api/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, userId: session.userId }),
        credentials: 'include'
      })

      if (!res.ok) {
        const { error } = await res.json()
        setError(error || '트윗 작성 중 오류가 발생했습니다.')
        return
      }

      setContent('')
      setSuccess(true)
    } catch (err) {
      setError('서버 오류가 발생했습니다.')
      console.error('handleSubmit 오류:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder='무슨 일이 일어나고 있나요?'
        rows={4}
        className='w-full p-2 border rounded'
      />
      <button
        type='submit'
        className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'
      >
        트윗하기
      </button>
      {error && (
        <p className='mt-2 text-red-500'>
          {error}
          {error.includes('로그인') && (
            <span>
              {' '}
              <Link href='/log-in' className='underline text-blue-500'>
                로그인
              </Link>
            </span>
          )}
        </p>
      )}
      {success && (
        <p className='mt-2 text-green-500'>트윗이 성공적으로 작성되었습니다!</p>
      )}
    </form>
  )
}
