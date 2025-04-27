'use client'

import { FC } from 'react'

interface FormErrorProps {
  errors?: string[]
}

const FormError: FC<FormErrorProps> = ({ errors }) => {
  if (!errors || errors.length === 0) return null
  return (
    <div className='text-red-500 text-sm mt-1'>
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </div>
  )
}

export default FormError
