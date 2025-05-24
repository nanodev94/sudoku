'use client'

import { useEffect } from 'react'

import useGameStore from '@/stores/game.store'
import { getRandomBoard } from '@/utils/board'

import Field from './components/Field'

const Board = () => {
  const {
    gameBoard,
    actions: { initGame },
  } = useGameStore()

  useEffect(() => {
    const board = getRandomBoard()
    initGame(board)
  }, [initGame])

  return (
    <div className='bg-green-700 flex flex-col border-8'>
      {gameBoard.map((row, rowIndex) => (
        <div
          className='flex [&:nth-child(3n):nth-last-child(n+2)]:border-b-8'
          key={`row-${rowIndex}`}
        >
          {row.map((fieldVal, colIndex) => (
            <Field
              className='[&:nth-child(3n):nth-last-child(n+2)]:border-r-8 outline-0'
              key={`field-(${rowIndex},${colIndex})`}
              row={rowIndex}
              col={colIndex}
              value={fieldVal}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
