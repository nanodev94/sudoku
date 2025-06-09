import { FIELD_VALID_NUMBERS } from '@/constants'
import type { GameMovement } from '@/stores/history.store'

export const copyBoard = (board: number[][]) => {
  return board.map(row => row.slice())
}

export const checkBoardCompleted = (board: number[][]) => {
  return !board.some(row => row.some(value => value === -1))
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
  // TODO: get random board
  /* SOLUTION
    9 5 7 | 6 1 3 | 2 8 4
    4 8 3 | 2 5 7 | 1 9 6
    6 1 2 | 8 4 9 | 5 3 7
    ---------------------
    1 7 8 | 3 6 4 | 9 5 2
    5 2 4 | 9 7 1 | 3 6 8
    3 6 9 | 5 2 8 | 7 4 1
    ---------------------
    8 4 5 | 7 9 2 | 6 1 3
    2 9 1 | 4 3 6 | 8 7 5
    7 3 6 | 1 8 5 | 4 2 9
  */
  return [
    [9, 5, 7, 6, 1, 3, 2, -1, -1],
    [-1, 8, -1, -1, -1, 7, -1, 9, -1],
    [6, 1, 2, 8, 4, 9, 5, 3, 7],
    [-1, 7, -1, -1, 6, -1, -1, -1, -1],
    [5, 2, 4, 9, 7, 1, 3, 6, 8],
    [-1, -1, -1, -1, 2, -1, -1, 4, -1],
    [8, 4, 5, 7, 9, 2, 6, 1, 3],
    [2, 9, 1, 4, 3, 6, 8, 7, 5],
    [7, 3, 6, 1, 8, 5, 4, 2, 9],
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
