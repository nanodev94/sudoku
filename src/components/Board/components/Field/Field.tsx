import clsx from 'clsx'

import { EMPTY_FIELD, FIELD_VALID_NUMBERS } from '@/constants'
import useGameStore from '@/stores/game.store'
import { isValidField } from '@/utils/board'

interface Props {
  row: number
  col: number
  value: number
  className?: string
}

const Field = ({ row, col, value, className }: Props) => {
  const {
    initialBoard,
    gameBoard,
    actions: { setField },
  } = useGameStore()

  const isInitialField = initialBoard[row][col] !== EMPTY_FIELD

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || EMPTY_FIELD
    const isValid =
      FIELD_VALID_NUMBERS.includes(newValue) &&
      isValidField({ row, col, value: newValue }, gameBoard)

    if (newValue === EMPTY_FIELD || isValid) {
      setField(row, col, newValue)
    }
  }

  return (
    <input
      className={clsx(
        'border-2 size-20 text-center font-bold text-2xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
        isInitialField ? 'bg-field-block' : 'bg-field',
        value === EMPTY_FIELD && 'hover:bg-field-hover duration-300',
        className
      )}
      disabled={isInitialField}
      onChange={handleChange}
      type='number'
      value={value === EMPTY_FIELD ? '' : value}
    />
  )
}

export default Field
