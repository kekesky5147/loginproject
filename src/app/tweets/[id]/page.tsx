// src/app/tweets/[id]/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation' // useParams로 변경

export default function TweetDetailPage () {
  const [tweet, setTweet] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false) // mounted 상태 추가
  const { id } = useParams() // useParams로 id를 가져옴

  // 컴포넌트가 마운트된 후에 mounted 상태를 true로 설정
  useEffect(() => {
    setMounted(true) // mounted 상태를 true로 설정
  }, [])

  // tweet 데이터를 가져오는 useEffect
  useEffect(() => {
    if (!mounted || !id) return // mounted가 false일 때는 fetch가 되지 않도록

    const fetchTweet = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/tweets/${id}`)
        if (!res.ok) {
          throw new Error('트윗을 불러오는 데 실패했습니다.')
        }
        const data = await res.json()
        setTweet(data) // tweet 데이터를 상태로 설정
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchTweet() // id가 있을 때만 데이터를 가져옴
  }, [id, mounted]) // id와 mounted 상태를 의존성 배열에 추가

  // 로딩 중 상태 처리
  if (loading) return <p className='p-4'>로딩 중...</p>
  // 오류 처리
  if (error) return <p className='p-4 text-red-500'>{error}</p>

  return (
    <div className='max-w-xl mx-auto py-6'>
      <h1 className='text-2xl font-bold mb-4 text-center'>트윗 상세 보기</h1>
      <div className='p-4 bg-white shadow rounded-lg border'>
        <p className='text-gray-800'>{tweet?.content}</p>
        <p className='text-sm text-gray-500 mt-2'>
          작성자: {tweet?.user?.name || '알 수 없음'}
        </p>
      </div>
    </div>
  )
}
