import { create } from 'zustand'

export interface GameMovement {
  isInitial?: boolean
  movementNumber?: number
  field: {
    row: number
    col: number
    value: number
  }
}

export interface Game {
  id: number
  completed: boolean
  date: string
  movements: GameMovement[]
}

type HistoryStore = {
  games: Game[]
  actions: {
    reset: () => void
    setGames: (games: Game[]) => void
  }
}

const useHistoryStore = create<HistoryStore>()(set => ({
  games: [],
  actions: {
    reset: () => set(() => ({ games: [] })),
    setGames: games => set(() => ({ games })),
  },
}))

export default useHistoryStore
