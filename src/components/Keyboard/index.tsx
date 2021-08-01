import React, { useMemo } from 'react'

import * as S from './styles'
import { Coordinate, NumbersMatrix } from '../../types'
// import {
//   sameBlockCoordinates,
//   sameColumnCoordinates,
//   sameLineCoordinates,
// } from '../../utils/miscellaneous'

type Props = {
  prefilledCells: NumbersMatrix
  filledCells: NumbersMatrix
  selectedPosition: Coordinate | null
  onClick: (position: Coordinate, value: number) => void
  onErase: (position: Coordinate) => void
}
const Keyboard = ({
  prefilledCells,
  filledCells,
  selectedPosition,
  onClick,
  onErase,
}: Props) => {
  const keys = useMemo(() => {
    const result = []
    for (let i = 1; i <= 9; i += 1) result.push(i)
    return result
  }, [selectedPosition, prefilledCells, filledCells])

  // const disabledKeys = useMemo<Record<number, boolean>>(() => {
  //   const result: Record<number, boolean> = {}
  //   if (selectedPosition) {
  //     ;[
  //       ...sameLineCoordinates(selectedPosition),
  //       ...sameColumnCoordinates(selectedPosition),
  //       ...sameBlockCoordinates(selectedPosition),
  //     ].forEach((coordinate) => {
  //       if (filledCells[coordinate.y][coordinate.x] !== null)
  //         result[filledCells[coordinate.y][coordinate.x] as number] = true
  //       else if (prefilledCells[coordinate.y][coordinate.x] !== null)
  //         result[prefilledCells[coordinate.y][coordinate.x] as number] = true
  //     })
  //   }
  //   return result
  // }, [selectedPosition, filledCells, prefilledCells])
  console.log(`selectedPosition: `, selectedPosition)

  return (
    <S.MainContainer>
      <S.ButtonsContainer>
        <S.Button
          onClick={() => selectedPosition && onErase(selectedPosition)}
          disabled={
            !selectedPosition ||
            !!prefilledCells[selectedPosition.y][selectedPosition.x] ||
            !filledCells[selectedPosition.y][selectedPosition.x]
          }
        >
          erase
        </S.Button>
      </S.ButtonsContainer>
      <S.KeysContainer>
        {keys.map((value) => (
          <S.Cell
            key={value}
            disabled={
              selectedPosition === null ||
              !!prefilledCells[selectedPosition.y][selectedPosition.x]
            }
            onClick={() =>
              selectedPosition &&
              !prefilledCells[selectedPosition.y][selectedPosition.x] &&
              onClick(selectedPosition, value)
            }
          >
            {value}
          </S.Cell>
        ))}
      </S.KeysContainer>
    </S.MainContainer>
  )
}
export default React.memo(Keyboard)
