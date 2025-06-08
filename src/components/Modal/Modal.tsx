import { useState } from 'react'
import { createPortal } from 'react-dom'

import Button from '../Button'

interface Props {
  children: React.ReactNode
  title?: string
}

const Modal = ({ children, title }: Props) => {
  const [hide, setHide] = useState(false)

  const handleHideClick = () => setHide(true)

  if (hide) return null

  return createPortal(
    <div className='bg-gray-500/50 fixed size-full flex items-center justify-center'>
      <div className='bg-gray-800 size-fit max-w-2xl p-8 m-8 rounded-xl flex flex-col gap-4 animate-scale delay-300'>
        <div className='flex items-center justify-between font-extrabold'>
          <span className='text-2xl underline'>{title}</span>
          <Button onClick={handleHideClick} rounded>
            X
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
