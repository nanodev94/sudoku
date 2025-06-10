'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'

import { FIELD_VALID_NUMBERS } from '@/constants'

interface Props {
  top: number
  left: number
  validNumbers: number[]
  onClose?: () => void
  onNumberClick?: (value: number) => void
}

const FieldSelectorModal = ({
  top,
  left,
  validNumbers,
  onClose,
  onNumberClick,
}: Props) => {
  const [hide, setHide] = useState(false)

  const handleHideClick = () => {
    onClose?.()
    onNumberClick?.(-1)
    setHide(true)
  }

  if (hide) return null

  return createPortal(
    <div className='bg-gray-500/50 fixed size-full' onClick={handleHideClick}>
      <div
        className='bg-white size-26 grid grid-cols-3 gap-0.5 relative animate-scale'
        style={{ top: top - 52, left: left - 52 }}
      >
        {FIELD_VALID_NUMBERS.map(num => {
          const disabled = !validNumbers.includes(num)
          return (
            <button
              key={num}
              disabled={disabled}
              className={
                disabled
                  ? 'bg-red-400 cursor-default'
                  : 'bg-gray-800 cursor-pointer'
              }
              onClick={() => onNumberClick?.(num)}
            >
              {num}
            </button>
          )
        })}
      </div>
    </div>,
    document.body
  )
}

export default FieldSelectorModal
