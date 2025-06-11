'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import BackLink from '@/components/BackLink'
import Board from '@/components/Board'
import Button from '@/components/Button'
import FieldSelectorModal from '@/components/FieldSelectorModal'
import { EMPTY_FIELD, PAGE } from '@/constants'
import useGameStore from '@/stores/game.store'
import {
  copyBoard,
  getEmptyBoard,
  getValidNumbers,
  isValidField,
  solveSudoku,
} from '@/utils/board'

const SolveView = () => {
  const t = useTranslations('solve')
  const [editing, setEditing] = useState(true)
  const [selectorModal, setSelectorModal] = useState({
    visible: false,
    row: -1,
    col: -1,
    top: 0,
    left: 0,
    validNumbers: [] as number[],
  })

  useEffect(() => {
    const emptyBoard = getEmptyBoard()
    initGame(-1, emptyBoard)
  }, [])

  const {
    gameBoard,
    initialBoard,
    actions: { initGame, loadGame, setField },
  } = useGameStore()

  const handleFieldClick = (
    row: number,
    col: number,
    top: number,
    left: number
  ) => {
    const validNumbers = getValidNumbers(row, col, gameBoard)
    setSelectorModal({ visible: true, row, col, top, left, validNumbers })
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
        setField(row, col, value)
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

  const handleSolveClick = () => {
    const initialBoard = copyBoard(gameBoard)
    const solvedBoard = solveSudoku(gameBoard)
    loadGame(-1, initialBoard, solvedBoard, 0)
    setEditing(false)
  }

  return (
    <div className='bg-gray-700 flex flex-col gap-4 m-auto p-12 rounded-2xl animate-scale'>
      <BackLink href={PAGE.HOME}>{t('back')}</BackLink>
      <Board
        gameBoard={gameBoard}
        fieldsEditable={editing}
        initialBoard={initialBoard}
        onFieldClick={handleFieldClick}
      />
      <div className='mt-4 flex items-center justify-center gap-4'>
        <Button onClick={handleSolveClick} rounded hoverEffect>
          {t('solve')}
        </Button>
      </div>

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

export default SolveView
