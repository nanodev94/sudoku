import { useEffect, useState } from 'react'

import { EMPTY_FIELD } from '@/constants'
import useGameStore from '@/stores/game.store'
import useHistoryStore from '@/stores/history.store'
import {
  checkBoardCompleted,
  getRandomBoard,
  isValidField,
  movementsToBoards,
} from '@/utils/board'

const useGameView = () => {
  const [showContinueModal, setShowContinueModal] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)

  const {
    id,
    movements,
    gameBoard,
    initialBoard,
    playAgain,
    actions: { clearGameBoard, initGame, loadGame, setField, setPlayAgain },
  } = useGameStore()

  const {
    games,
    actions: { addGame, addMovementToGame, clearGame, completeGame },
  } = useHistoryStore()

  const createNewGame = () => {
    const gameId = games[games.length - 1].id + 1
    const board = getRandomBoard()
    const game = {
      id: gameId,
      date: new Date().toISOString(),
      completed: false,
      movements: board
        .flatMap((row, rIndex) =>
          row.map((value, cIndex) => ({
            isInitial: true,
            field: { row: rIndex, col: cIndex, value },
          }))
        )
        .filter(movement => movement.field.value !== -1),
    }

    initGame(gameId, board)
    addGame(game)
  }

  const loadLastGame = () => {
    const lastGame = games[games.length - 1]
    const lastBoards = movementsToBoards(lastGame.movements)

    loadGame(
      lastGame.id,
      lastBoards.initialBoard,
      lastBoards.gameBoard,
      lastBoards.movementNumber
    )
  }

  // Init game
  useEffect(() => {
    if (playAgain) {
      setPlayAgain(false)
    } else {
      const lastGame = games[games.length - 1]

      if (lastGame.completed) {
        createNewGame()
      } else {
        setShowContinueModal(true)
      }
    }
  }, [])

  const handleClearClick = () => {
    clearGameBoard()
    clearGame(id)
  }

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const newValue = parseInt(e.target.value) || EMPTY_FIELD
    const field = { row, col, value: newValue }
    const isValid = isValidField(field, gameBoard)

    if (newValue === EMPTY_FIELD || isValid) {
      const movement = {
        movementNumber: movements + 1,
        field,
      }

      addMovementToGame(id, movement)
      setField(row, col, newValue)

      if (checkBoardCompleted(gameBoard)) {
        completeGame(id)
        setGameCompleted(true)
      }
    }
  }

  const handleYesContinueClick = () => {
    setShowContinueModal(false)
    loadLastGame()
  }

  const handleNoContinueClick = () => {
    setShowContinueModal(false)
    createNewGame()
  }

  return {
    showContinueModal,
    gameCompleted,
    id,
    movements,
    initialBoard,
    gameBoard,
    handleFieldChange,
    handleClearClick,
    handleYesContinueClick,
    handleNoContinueClick,
  }
}

export default useGameView
