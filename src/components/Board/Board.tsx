import { EMPTY_FIELD } from '@/constants'

import Field from './components/Field'

interface Props {
  gameBoard: number[][]
  fieldsEditable?: boolean
  initialBoard?: number[][]
  onFieldChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => void
}

const Board = ({
  gameBoard,
  fieldsEditable = true,
  initialBoard,
  onFieldChange,
}: Props) => {
  return (
    <div className='flex flex-col border-8'>
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
              editable={fieldsEditable}
              isInitial={initialBoard?.[rowIndex][colIndex] !== EMPTY_FIELD}
              onFieldChange={onFieldChange}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
