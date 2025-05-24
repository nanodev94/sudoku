import Board from '@/components/Board'
import MovementsDisplay from '@/components/MovementsDisplay'

const GameView = () => {
  return (
    <div className='bg-blue-500 m-auto p-12 rounded-2xl'>
      <MovementsDisplay />
      <Board />
    </div>
  )
}

export default GameView
