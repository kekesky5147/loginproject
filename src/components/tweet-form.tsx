// src/components/tweet-form.tsx

import { useState } from 'react'

type TweetFormProps = {
  onTweetCreated: (tweet: { id: number; content: string }) => void
}

export default function TweetForm ({ onTweetCreated }: TweetFormProps) {
  const [content, setContent] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch('/api/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })

    if (response.ok) {
      const newTweet = await response.json()
      onTweetCreated(newTweet)
      setContent('')
    } else {
      console.error('Failed to create tweet')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='p-4'>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        className='w-full p-2 border border-gray-300 rounded'
        placeholder='트윗을 작성하세요...'
      />
      <button
        type='submit'
        className='mt-2 p-2 bg-blue-500 text-white rounded'
        disabled={!content}
      >
        트윗 작성
      </button>
    </form>
  )
}
