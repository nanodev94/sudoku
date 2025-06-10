import { EMPTY_FIELD } from '@/constants'

import Field from './components/Field'

interface Props {
  gameBoard: number[][]
  fieldsEditable?: boolean
  initialBoard?: number[][]
  onFieldClick?: (row: number, col: number, top: number, left: number) => void
}

const Board = ({
  gameBoard,
  fieldsEditable = true,
  initialBoard,
  onFieldClick,
}: Props) => {
  return (
    <div className='flex flex-col border-8 bg-white'>
      {gameBoard.map((row, rowIndex) => (
        <div
          className='flex [&:nth-child(3n):nth-last-child(n+2)]:mb-2'
          key={`row-${rowIndex}`}
        >
          {row.map((fieldVal, colIndex) => (
            <Field
              className='[&:nth-child(3n):nth-last-child(n+2)]:mr-2 outline-0'
              key={`field-(${rowIndex},${colIndex})`}
              row={rowIndex}
              col={colIndex}
              value={fieldVal}
              editable={fieldsEditable}
              isInitial={initialBoard?.[rowIndex][colIndex] !== EMPTY_FIELD}
              onFieldClick={onFieldClick}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
