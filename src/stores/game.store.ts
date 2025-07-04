import { create } from 'zustand'

import { EMPTY_BOARD } from '@/constants'
import { copyBoard } from '@/utils/board'

type GameStore = {
  id: number
  initialBoard: number[][]
  gameBoard: number[][]
  movements: number
  playAgain: boolean
  actions: {
    reset: () => void
    clearGameBoard: () => void
    initGame: (id: number, board: number[][]) => void
    loadGame: (
      id: number,
      initialBoard: number[][],
      gameBoard: number[][],
      movements: number
    ) => void
    setField: (row: number, col: number, val: number) => void
    setPlayAgain: (playAgain: boolean) => void
  }
}

const useGameStore = create<GameStore>()(set => ({
  id: -1,
  initialBoard: copyBoard(EMPTY_BOARD),
  gameBoard: copyBoard(EMPTY_BOARD),
  movements: 0,
  playAgain: false,
  actions: {
    reset: () =>
      set(() => ({
        id: -1,
        initialBoard: copyBoard(EMPTY_BOARD),
        gameBoard: copyBoard(EMPTY_BOARD),
        movements: 0,
        playAgain: false,
      })),
    clearGameBoard: () =>
      set(state => ({
        gameBoard: copyBoard(state.initialBoard),
        movements: 0,
      })),
    initGame: (id, board) =>
      set(() => ({
        id,
        initialBoard: copyBoard(board),
        gameBoard: copyBoard(board),
        movements: 0,
      })),
    loadGame: (id, initialBoard, gameBoard, movements) =>
      set(() => ({
        id,
        initialBoard: copyBoard(initialBoard),
        gameBoard: copyBoard(gameBoard),
        movements,
      })),
    setField: (row, col, val) =>
      set(state => {
        state.gameBoard[row][col] = val
        return { gameBoard: state.gameBoard, movements: state.movements + 1 }
      }),
    setPlayAgain: playAgain =>
      set(() => {
        return { playAgain }
      }),
  },
}))

export default useGameStore
