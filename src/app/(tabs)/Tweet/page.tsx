'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function TweetList () {
  const [tweets, setTweets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchTweets = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/tweets?page=${currentPage}`)
        const data = await res.json()
        setTweets(data.tweets)
        setTotalPages(data.totalPages)
      } catch (err) {
        setError('트윗을 불러오는 데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchTweets()
  }, [currentPage])

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1)
  }

  if (loading) return <p className='p-4'>로딩 중...</p>
  if (error) return <p className='p-4 text-red-500'>{error}</p>

  return (
    <div className='max-w-xl mx-auto py-6'>
      <h1 className='text-2xl font-bold mb-4 text-center'>트윗 목록</h1>

      <ul className='space-y-4'>
        {tweets.map(tweet => (
          <li key={tweet.id}>
            <Link href={`/tweets/${tweet.id}`}>
              <div className='p-4 bg-white shadow rounded-lg border hover:bg-gray-50 cursor-pointer'>
                <p className='text-gray-800'>{tweet.content}</p>
                <p className='text-sm text-gray-500 mt-2'>
                  작성자: {tweet.user?.name || '알 수 없음'}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className='flex justify-center items-center gap-4 mt-6'>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
        >
          이전
        </button>
        <span className='text-gray-700'>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
        >
          다음
        </button>
      </div>
    </div>
  )
}
