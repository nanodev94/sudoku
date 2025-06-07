import { create } from 'zustand'

import { addGame, updateGame } from '@/indexedDB'

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
    addGame: (game: Game) => void
    addMovementToGame: (gameId: number, movement: GameMovement) => void
    clearGame: (gameId: number) => void
  }
}

const useHistoryStore = create<HistoryStore>()(set => ({
  games: [],
  actions: {
    reset: () => set(() => ({ games: [] })),
    setGames: games => set(() => ({ games })),
    addGame: game =>
      set(state => {
        const newGames = [...state.games]
        const gameIndex = newGames.findIndex(g => g.id === game.id)

        if (gameIndex === -1) {
          newGames.push(game)
          addGame(game)
        }

        return { games: newGames }
      }),
    addMovementToGame: (gameId, movement) =>
      set(state => {
        const newGames = [...state.games]
        const gameIndex = newGames.findIndex(g => g.id === gameId)

        if (gameIndex !== -1) {
          const game = newGames[gameIndex]
          game.movements.push(movement)
          newGames[gameIndex] = game

          updateGame(game)
        }

        return { games: newGames }
      }),
    clearGame: gameId =>
      set(state => {
        const newGames = [...state.games]
        const gameIndex = newGames.findIndex(g => g.id === gameId)

        if (gameIndex !== -1) {
          const game = newGames[gameIndex]
          game.movements = game.movements.filter(movement => movement.isInitial)
          newGames[gameIndex] = game

          updateGame(game)
        }

        return { games: newGames }
      }),
  },
}))

export default useHistoryStore
