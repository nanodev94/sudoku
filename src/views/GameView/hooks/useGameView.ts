import { useEffect, useState } from 'react'

import { EMPTY_FIELD } from '@/constants'
import useGameStore from '@/stores/game.store'
import useHistoryStore from '@/stores/history.store'
import {
  checkBoardCompleted,
  getRandomBoard,
  getValidNumbers,
  isValidField,
  movementsToBoards,
} from '@/utils/board'

const useGameView = () => {
  const [showContinueModal, setShowContinueModal] = useState(false)
  const [selectorModal, setSelectorModal] = useState({
    visible: false,
    row: -1,
    col: -1,
    top: 0,
    left: 0,
    validNumbers: [] as number[],
  })
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

  const handleSelectorNumberClose = () =>
    setSelectorModal({
      visible: false,
      row: -1,
      col: -1,
      top: 0,
      left: 0,
      validNumbers: [],
    })

  const handleSelectorNumberClick = (value: number) => {
    const { row, col } = selectorModal
    const field = { row, col, value }
    const isValid = isValidField(field, gameBoard)

    if (value === EMPTY_FIELD || isValid) {
      if (gameBoard[row][col] !== EMPTY_FIELD || value !== EMPTY_FIELD) {
        const movement = {
          movementNumber: movements + 1,
          field,
        }

        addMovementToGame(id, movement)
        setField(row, col, value)

        if (checkBoardCompleted(gameBoard)) {
          completeGame(id)
          setGameCompleted(true)
        }
      }

      setSelectorModal({
        visible: false,
        row: -1,
        col: -1,
        top: 0,
        left: 0,
        validNumbers: [],
      })
    }
  }

  const handleFieldClick = (
    row: number,
    col: number,
    top: number,
    left: number
  ) => {
    const validNumbers = getValidNumbers(row, col, gameBoard)
    setSelectorModal({ visible: true, row, col, top, left, validNumbers })
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
    selectorModal,
    gameCompleted,
    id,
    movements,
    initialBoard,
    gameBoard,
    handleFieldClick,
    handleSelectorNumberClose,
    handleSelectorNumberClick,
    handleClearClick,
    handleYesContinueClick,
    handleNoContinueClick,
  }
}

export default useGameView
