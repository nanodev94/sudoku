import clsx from 'clsx'

import { EMPTY_FIELD } from '@/constants'

interface Props {
  row: number
  col: number
  value: number
  isInitial: boolean
  className?: string
  onFieldChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => void
}

const Field = ({
  row,
  col,
  value,
  isInitial,
  className,
  onFieldChange,
}: Props) => {
  return (
    <input
      className={clsx(
        'border-2 size-20 text-center font-bold text-2xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
        isInitial ? 'bg-field-block' : 'bg-field',
        value === EMPTY_FIELD && 'hover:bg-field-hover duration-300',
        className
      )}
      disabled={isInitial}
      onChange={e => onFieldChange?.(e, row, col)}
      type='number'
      value={value === EMPTY_FIELD ? '' : value}
    />
  )
}

export default Field
