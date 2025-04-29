'use client'

import { useEffect, useState } from 'react'

type Tweet = {
  id: number
  content: string
  user: {
    name: string | null
  }
  likes: { id: number; userId: number }[]
}

export default function TweetPage () {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newTweetContent, setNewTweetContent] = useState('') // 새로운 트윗 내용 상태

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch('/api/tweets')
        const allTweets = await response.json()
        if (allTweets) {
          setTweets(allTweets)
        } else {
          throw new Error('트윗이 없습니다.')
        }
      } catch (error) {
        console.error('Error fetching tweets:', error)
        setError('트윗 목록을 가져오는 도중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchTweets()
  }, [])

  // 트윗 작성 함수
  const handleTweetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newTweetContent.trim()) {
      setError('트윗 내용을 입력해주세요.')
      return
    }

    try {
      const response = await fetch('/api/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newTweetContent })
      })

      if (response.ok) {
        // 트윗을 성공적으로 작성했다면, 트윗 목록을 갱신
        const newTweet = await response.json()
        setTweets([newTweet, ...tweets]) // 가장 최근 트윗을 맨 위에 추가
        setNewTweetContent('') // 입력란 비우기
      } else {
        setError('트윗 작성에 실패했습니다.')
      }
    } catch (error) {
      console.error('Error posting tweet:', error)
      setError('트윗 작성에 오류가 발생했습니다.')
    }
  }

  if (loading) {
    return <div className='p-4'>로딩 중...</div>
  }

  if (error) {
    return <div className='p-4 text-red-500'>{error}</div>
  }

  if (tweets.length === 0) {
    return <div className='p-4'>트윗이 없습니다.</div>
  }

  return (
    <div className='p-4'>
      <h1 className='text-xl font-semibold'>트윗 목록</h1>

      {/* 트윗 작성 폼 */}
      <form onSubmit={handleTweetSubmit} className='mt-4'>
        <textarea
          className='w-full p-2 border border-gray-300 rounded-md'
          rows={3}
          placeholder='새로운 트윗을 작성하세요...'
          value={newTweetContent}
          onChange={e => setNewTweetContent(e.target.value)}
        />
        <button
          type='submit'
          className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-md'
        >
          트윗 작성
        </button>
      </form>

      {/* 트윗 목록 */}
      <div className='mt-4'>
        {tweets.map(tweet => (
          <div
            key={tweet.id}
            className='mb-4 p-4 border border-gray-300 rounded-md'
          >
            <p className='text-lg'>
              {tweet.user.name ? tweet.user.name : '익명'}의 트윗
            </p>
            <p className='mt-2'>{tweet.content}</p>
            <div className='mt-2'>
              <strong>좋아요: </strong>
              {tweet.likes.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
