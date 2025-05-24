'use client'

import Board from '@/components/Board'

const GameView = () => {
  return (
    <div className='bg-blue-500 m-auto'>
      <span>Movement: 1</span>
      <Board />
    </div>
  )
}

export default GameView
