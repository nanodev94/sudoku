'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import BackLink from '@/components/BackLink'
import Board from '@/components/Board'
import Button from '@/components/Button'
import { EMPTY_FIELD, PAGE } from '@/constants'
import useGameStore from '@/stores/game.store'
import useHistoryStore from '@/stores/history.store'
import {
  checkBoardCompleted,
  getRandomBoard,
  isValidField,
} from '@/utils/board'

import CompletedModal from './components/CompletedModal'

const GameView = () => {
  const t = useTranslations('game')
  const [gameCompleted, setGameCompleted] = useState(false)

  const {
    id,
    movements,
    gameBoard,
    initialBoard,
    actions: { clearGameBoard, initGame, setField },
  } = useGameStore()

  const {
    games,
    actions: { addGame, addMovementToGame, clearGame, completeGame },
  } = useHistoryStore()

  // Init game
  useEffect(() => {
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

  return (
    <div className='bg-gray-700 m-auto p-12 rounded-2xl'>
      <BackLink href={PAGE.HOME}>{t('back')}</BackLink>
      <div className='flex items-center justify-between py-5 px-2 text-xl font-bold'>
        <span>#{id}</span>
        <span>
          {t('movements')} {movements}
        </span>
      </div>
      <Board
        gameBoard={gameBoard}
        initialBoard={initialBoard}
        onFieldChange={handleFieldChange}
      />
      <div className='p-8 flex items-center justify-center gap-4'>
        {!gameCompleted ? (
          <Button onClick={handleClearClick} rounded hoverEffect>
            {t('clear')}
          </Button>
        ) : null}
      </div>
      {gameCompleted && <CompletedModal />}
    </div>
  )
}

export default GameView
