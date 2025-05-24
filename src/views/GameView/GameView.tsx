'use client'

import { useTranslations } from 'next-intl'

import Board from '@/components/Board'
import Button from '@/components/Button'
import useGameStore from '@/stores/game.store'

const GameView = () => {
  const t = useTranslations('game')
  const {
    movements,
    actions: { clearGameBoard },
  } = useGameStore()

  const handleClearClick = () => clearGameBoard()

  return (
    <div className='bg-blue-500 m-auto p-12 rounded-2xl'>
      <p className='text-xl font-bold py-5'>
        {t('movements')} {movements}
      </p>
      <Board />
      <div className='p-8 flex items-center justify-center gap-4'>
        <Button onClick={handleClearClick}>{t('clear')}</Button>
      </div>
    </div>
  )
}

export default GameView
