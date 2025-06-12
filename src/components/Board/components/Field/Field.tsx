'use client'

import { useRef } from 'react'
import clsx from 'clsx'

import { EMPTY_FIELD } from '@/constants'

interface Props {
  row: number
  col: number
  value: number
  isInitial: boolean
  className?: string
  editable?: boolean
  onFieldClick?: (row: number, col: number, top: number, left: number) => void
}

const Field = ({
  row,
  col,
  value,
  isInitial,
  className,
  editable,
  onFieldClick,
}: Props) => {
  const ref = useRef<HTMLButtonElement | null>(null)

  const handleFieldClick = () => {
    if (ref.current) {
      const { top, left, width, height } = ref.current.getBoundingClientRect()
      const centerTop = top + height / 2
      const centerLeft = left + width / 2
      onFieldClick?.(row, col, centerTop, centerLeft)
    }
  }

  return (
    <button
      className={clsx(
        'border-2 size-8 text-center font-bold text-xl sm:size-12 sm:text-2xl md:size-18 md:text-3xl',
        isInitial ? 'bg-field-block' : 'bg-field',
        !isInitial &&
          editable &&
          'hover:bg-field-hover duration-300 cursor-pointer',
        className
      )}
      onClick={handleFieldClick}
      ref={ref}
    >
      {value === EMPTY_FIELD ? '' : value}
    </button>
  )
}

export default Field
