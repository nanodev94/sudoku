'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import BackLink from '@/components/BackLink'
import Board from '@/components/Board'
import { PAGE } from '@/constants'
import useGameStore from '@/stores/game.store'
import useHistoryStore from '@/stores/history.store'
import { movementsToBoards } from '@/utils/board'

interface Props {
  gameId: number
}

const HistoryGameView = ({ gameId }: Props) => {
  const t = useTranslations('game')

  const {
    id,
    movements,
    gameBoard,
    initialBoard,
    actions: { loadGame },
  } = useGameStore()

  const { games } = useHistoryStore()

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
    </div>
  )
}

export default HistoryGameView
