import { create } from 'zustand'

import { EMPTY_BOARD } from '@/constants'
import { copyBoard } from '@/utils/board'

type GameStore = {
  initialBoard: number[][]
  gameBoard: number[][]
  actions: {
    reset: () => void
    initGame: (board: number[][]) => void
    setField: (row: number, col: number, val: number) => void
  }
}

const useGameStore = create<GameStore>()(set => ({
  initialBoard: copyBoard(EMPTY_BOARD),
  gameBoard: copyBoard(EMPTY_BOARD),
  actions: {
    reset: () =>
      set(() => ({
        initialBoard: copyBoard(EMPTY_BOARD),
        gameBoard: copyBoard(EMPTY_BOARD),
      })),
    initGame: board =>
      set(() => ({
        initialBoard: copyBoard(board),
        gameBoard: copyBoard(board),
      })),
    setField: (row, col, val) =>
      set(state => {
        state.gameBoard[row][col] = val
        return { gameBoard: state.gameBoard }
      }),
  },
}))

export default useGameStore
