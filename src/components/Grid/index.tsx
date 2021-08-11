import React, { useMemo } from 'react'

import * as S from './styles'
import { AnnotationsMatrix, Coordinate, ErrorsMatrix, NumbersMatrix } from '../../types'
import {
  sameBlockCoordinates,
  sameColumnCoordinates,
  sameLineCoordinates,
} from '../../utils/miscellaneous'
import { createMatrix } from '../../utils/matrix'

type Props = {
  selectedCell: Coordinate | null
  onSelect: (position: Coordinate) => void
  initialCellValues: NumbersMatrix
  filledCellValues: NumbersMatrix
  errorsMatrix: ErrorsMatrix
  annotationsMatrix: AnnotationsMatrix
}

const Grid = ({
  selectedCell,
  onSelect,
  initialCellValues,
  filledCellValues,
  errorsMatrix,
  annotationsMatrix,
}: Props) => {
  const highlightedCells: boolean[][] = useMemo(() => {
    const cells = createMatrix<boolean>(9, false)
    if (!selectedCell) return cells

    sameBlockCoordinates(selectedCell).forEach((coordinate) => {
      cells[coordinate.y][coordinate.x] = true
    })
    sameLineCoordinates(selectedCell).forEach((coordinate) => {
      cells[coordinate.y][coordinate.x] = true
    })
    sameColumnCoordinates(selectedCell).forEach((coordinate) => {
      cells[coordinate.y][coordinate.x] = true
    })
    return cells
  }, [selectedCell])

  const cells = useMemo(() => {
    const result = []
    for (let x = 0; x < 9; x += 1) {
      for (let y = 0; y < 9; y += 1) {
        result.push(
          <S.Cell
            key={`${x},${y}`}
            onClick={() => onSelect({ x, y })}
            selected={selectedCell !== null && selectedCell.x === x && selectedCell.y === y}
            initialValue={!!initialCellValues[y][x]}
            highlighted={highlightedCells[y][x]}
            error={errorsMatrix[y][x]}
          >
            {filledCellValues[y][x] || initialCellValues[y][x]}
            {annotationsMatrix[y][x].map((value) => (
              <S.Annotation key={value}>{value}</S.Annotation>
            ))}
          </S.Cell>,
        )
      }
    }
    return result
  }, [
    filledCellValues,
    initialCellValues,
    errorsMatrix,
    selectedCell,
    highlightedCells,
    onSelect,
    annotationsMatrix,
  ])

  return <S.MainContainer>{cells}</S.MainContainer>
}

export default React.memo(Grid)
