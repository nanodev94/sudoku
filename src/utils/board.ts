import { FIELD_VALID_NUMBERS } from '@/constants'

export const copyBoard = (board: number[][]) => {
  return board.map(row => row.slice())
}

export const getRandomBoard = () => {
  // TODO: get random board
  return [
    [9, 8, 5, 4, -1, 1, -1, -1, -1],
    [-1, -1, -1, -1, 3, -1, -1, -1, -1],
    [1, -1, 6, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, 5, -1, -1, -1, -1, -1],
    [4, -1, 2, -1, -1, 9, -1, -1, 3],
    [-1, 9, -1, -1, 6, 3, 4, -1, -1],
    [-1, 6, -1, -1, 1, -1, -1, -1, -1],
    [-1, -1, -1, 3, -1, 6, -1, -1, 5],
    [2, -1, -1, -1, 8, -1, -1, -1, 1],
  ]
}

export const isValidField = (
  field: { row: number; col: number; value: number },
  board: number[][]
) => {
  const { row, col, value } = field

  // Invalid number
  if (!FIELD_VALID_NUMBERS.includes(value)) return false

  // Row contains value
  if (board[row].includes(value)) return false

  // Col contains value
  if (board.some(row => row[col] === value)) return false

  // Submatrix contains number
  const submatrixRow = row - (row % 3)
  const submatrixCol = col - (col % 3)
  for (let y = submatrixRow; y < submatrixRow + 3; y++) {
    for (let x = submatrixCol; x < submatrixCol + 3; x++) {
      if (board[y][x] === value) return false
    }
  }

  return true
}
