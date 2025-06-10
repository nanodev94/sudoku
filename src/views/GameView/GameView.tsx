'use client'

import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import BackLink from '@/components/BackLink'
import Board from '@/components/Board'
import Button from '@/components/Button'
import FieldSelectorModal from '@/components/FieldSelectorModal'
import { PAGE } from '@/constants'

import CompletedModal from './components/CompletedModal'
import ContinueModal from './components/ContinueModal'
import useGameView from './hooks/useGameView'

const GameView = () => {
  const t = useTranslations('game')
  const {
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
  } = useGameView()

  return (
    <div className='bg-gray-700 m-auto p-12 rounded-2xl animate-scale'>
      <BackLink href={PAGE.HOME}>{t('back')}</BackLink>
      <div className='flex items-center justify-between py-5 px-2 text-xl font-bold'>
        <span>#{id === -1 ? '' : id}</span>
        <span>
          {t('movements')} {movements}
        </span>
      </div>
      {gameCompleted ? (
        <div className='pb-5 flex items-center justify-center'>
          <span
            className={clsx(
              'self-end bg-green-600 py-1 px-8 font-bold rounded-full'
            )}
          >
            {t('completedModal.title')}
          </span>
        </div>
      ) : null}
      <Board
        gameBoard={gameBoard}
        fieldsEditable={!gameCompleted}
        initialBoard={initialBoard}
        onFieldClick={handleFieldClick}
      />
      <div className='p-8 flex items-center justify-center gap-4'>
        {!gameCompleted ? (
          <Button onClick={handleClearClick} rounded hoverEffect>
            {t('clear')}
          </Button>
        ) : null}
      </div>
      {gameCompleted ? <CompletedModal /> : null}
      {showContinueModal ? (
        <ContinueModal
          onYesClick={handleYesContinueClick}
          onNoClick={handleNoContinueClick}
        />
      ) : null}
      {selectorModal.visible ? (
        <FieldSelectorModal
          top={selectorModal.top}
          left={selectorModal.left}
          onClose={handleSelectorNumberClose}
          onNumberClick={handleSelectorNumberClick}
          validNumbers={selectorModal.validNumbers}
        />
      ) : null}
    </div>
  )
}

export default GameView
