import { FIELD_VALID_NUMBERS } from '@/constants'
import type { GameMovement } from '@/stores/history.store'
import { SUDOKUS } from '@/sudokus'

export const copyBoard = (board: number[][]) => {
  return board.map(row => row.slice())
}

export const checkBoardCompleted = (board: number[][]) => {
  return !board.some(row => row.some(value => value === -1))
}

export const getValidNumbers = (
  row: number,
  col: number,
  board: number[][]
) => {
  return FIELD_VALID_NUMBERS.filter(value =>
    isValidField({ row, col, value }, board)
  )
}

export const getEmptyBoard = () => {
  return [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ]
}

export const getRandomBoard = () => {
  const pos = Math.ceil((SUDOKUS.length - 1) * Math.random())
  return SUDOKUS[pos]
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

export const movementsToBoards = (movements: GameMovement[]) => {
  const initialBoard = getEmptyBoard()
  const gameBoard = getEmptyBoard()

  movements.forEach(({ isInitial, field: { row, col, value } }) => {
    gameBoard[row][col] = value
    if (isInitial) {
      initialBoard[row][col] = value
    }
  })

  const movementNumber = movements[movements.length - 1].movementNumber ?? 0

  return { initialBoard, gameBoard, movementNumber }
}
