'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import BackLink from '@/components/BackLink'
import Board from '@/components/Board'
import Button from '@/components/Button'
import { PAGE } from '@/constants'
import { useRouter } from '@/i18n/navigation'
import useGameStore from '@/stores/game.store'
import useHistoryStore from '@/stores/history.store'
import { movementsToBoards } from '@/utils/board'

interface Props {
  gameId: number
}

const HistoryGameView = ({ gameId }: Props) => {
  const t = useTranslations('historyGame')
  const { push } = useRouter()

  const {
    id,
    movements,
    gameBoard,
    initialBoard,
    actions: { initGame, loadGame, setPlayAgain },
  } = useGameStore()

  const {
    games,
    actions: { addGame },
  } = useHistoryStore()

  useEffect(() => {
    const game = games.find(g => g.id === gameId)

    if (game) {
      const boards = movementsToBoards(game.movements)

      loadGame(
        gameId,
        boards.initialBoard,
        boards.gameBoard,
        boards.movementNumber
      )
    }
  }, [])

  const handlePlayAgainClick = () => {
    const game = games.find(g => g.id === gameId)

    if (game) {
      const gameId = games[games.length - 1].id + 1
      const { initialBoard } = movementsToBoards(game.movements)

      const newGame = {
        id: gameId,
        date: new Date().toISOString(),
        completed: false,
        movements: game.movements.filter(movement => movement.isInitial),
      }

      setPlayAgain(true)
      initGame(gameId, initialBoard)
      addGame(newGame)
      push(`${PAGE.GAME}`)
    }
  }

  return (
    <div className='bg-gray-700 m-auto p-12 rounded-2xl'>
      <BackLink href={PAGE.HISTORY}>{t('back')}</BackLink>
      <div className='flex items-center justify-between py-5 px-2 text-xl font-bold'>
        <span>#{id === -1 ? '' : id}</span>
        <span>
          {t('movements')} {movements}
        </span>
      </div>
      <Board
        gameBoard={gameBoard}
        fieldsEditable={false}
        initialBoard={initialBoard}
      />
      <div className='p-8 flex items-center justify-center gap-4'>
        <Button onClick={handlePlayAgainClick} rounded hoverEffect>
          {t('playAgain')}
        </Button>
      </div>
    </div>
  )
}

export default HistoryGameView
