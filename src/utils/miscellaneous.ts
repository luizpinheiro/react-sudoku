import { Coordinate, NumbersMatrix } from '../types'
import { randomNumber } from './random'

export const plainCoordinate = (position: Coordinate): string =>
  `${position.x},${position.y}`

export const generateMatrix = <T>(initialValue: T): T[][] => {
  const matrix: T[][] = []
  for (let y = 0; y < 9; y += 1) {
    if (!matrix[y]) matrix[y] = []
    for (let x = 0; x < 9; x += 1) {
      matrix[y][x] = initialValue
    }
  }
  return matrix
}

export const sameBlockCoordinates = (position: Coordinate): Coordinate[] => {
  const coordinates: Coordinate[] = []

  const xs = 3 * Math.floor(position.x / 3)
  const xe = 3 * Math.floor(1 + position.x / 3)
  const ys = 3 * Math.floor(position.y / 3)
  const ye = 3 * Math.floor(1 + position.y / 3)

  for (let y = ys; y < ye; y += 1) {
    for (let x = xs; x < xe; x += 1) {
      if (position.x === x && position.y === y) continue
      coordinates.push({ x, y })
    }
  }
  return coordinates
}

export const sameLineCoordinates = (position: Coordinate): Coordinate[] => {
  const coordinates: Coordinate[] = []
  for (let x = 0; x < position.x; x += 1) {
    coordinates.push({ x, y: position.y })
  }
  for (let x = position.x + 1; x < 9; x += 1) {
    coordinates.push({ x, y: position.y })
  }
  return coordinates
}
export const sameColumnCoordinates = (position: Coordinate): Coordinate[] => {
  const coordinates: Coordinate[] = []
  for (let y = 0; y < position.y; y += 1) {
    coordinates.push({ x: position.x, y })
  }
  for (let y = position.y + 1; y < 9; y += 1) {
    coordinates.push({ x: position.x, y })
  }
  return coordinates
}

export const validateCoordinateNumber = (
  coordinate: Coordinate,
  value: number,
  matrix: NumbersMatrix,
): boolean => {
  const lineCoordinates = sameLineCoordinates(coordinate)
  if (
    lineCoordinates.some(
      (blockCoordinate) =>
        matrix[blockCoordinate.y][blockCoordinate.x] === value,
    )
  )
    return false

  const columnCoordinates = sameColumnCoordinates(coordinate)
  if (
    columnCoordinates.some(
      (blockCoordinate) =>
        matrix[blockCoordinate.y][blockCoordinate.x] === value,
    )
  )
    return false

  const blockCoordinates = sameBlockCoordinates(coordinate)
  if (
    blockCoordinates.some(
      (blockCoordinate) =>
        matrix[blockCoordinate.y][blockCoordinate.x] === value,
    )
  )
    return false

  return true
}

export const generateprefilledCells = (): NumbersMatrix => {
  const matrix = generateMatrix<number | null>(null)
  const initialCoordinate: Coordinate = { x: 0, y: 0 }
  fillSequence(initialCoordinate, matrix)
  return matrix
}

const fillSequence = (
  coordinate: Coordinate,
  matrix: NumbersMatrix,
): boolean => {
  const nextCoordinate = getNextCoordinate(coordinate)
  const randomSequence = generateRandomSequence()
  for (let i = 0; i < 9; i += 1) {
    const sequenceValue = randomSequence[i]
    // Check if the chosen sequence value breaks sudoku rules
    if (validateCoordinateNumber(coordinate, sequenceValue, matrix)) {
      matrix[coordinate.y][coordinate.x] = sequenceValue
      if (!nextCoordinate || fillSequence(nextCoordinate, matrix)) return true
    }
  }
  // If we don't find any solution in this branch, we must clear the tried position
  matrix[coordinate.y][coordinate.x] = null
  return false
}

const getNextCoordinate = (position: Coordinate): Coordinate | null => {
  if (position.x === 8 && position.y === 8) return null

  if (position.x === 8) return { x: 0, y: position.y + 1 }

  return { x: position.x + 1, y: position.y }
}

const generateRandomSequence = (): number[] => {
  const sequence: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  for (let x = 0; x < 9; x += 1) {
    let value: number
    do {
      value = randomNumber(1, 9)
    } while (sequence.find((v) => v === value))
    sequence[x] = value
  }
  return sequence
}

export const clearCells = (
  matrix: NumbersMatrix,
  clearSize = 16,
): NumbersMatrix => {
  let clearedPositions = 0
  const resultMatrix = cloneMatrix<number | null>(matrix)
  console.log(`Clear size: ${clearSize}`)
  do {
    const position = { x: randomNumber(0, 8), y: randomNumber(0, 8) }
    if (resultMatrix[position.y][position.x] !== null) {
      resultMatrix[position.y][position.x] = null
      clearedPositions += 1
    }
    if (
      clearedPositions < clearSize &&
      resultMatrix[8 - position.y][8 - position.x] !== null
    ) {
      resultMatrix[8 - position.y][8 - position.x] = null
      clearedPositions += 1
    }
  } while (clearedPositions < clearSize)
  return resultMatrix
}

export const cloneMatrix = <T>(matrix: T[][]): T[][] => {
  const resultMatrix: T[][] = []
  for (let y = 0; y < 9; y += 1) {
    if (!resultMatrix[y]) resultMatrix[y] = []
    for (let x = 0; x < 9; x += 1) {
      resultMatrix[y][x] = matrix[y][x]
    }
  }
  return resultMatrix
}

export const secondsToClock = (seconds: number): string => {
  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const sec = (seconds % 60).toString().padStart(2, '0')
  return `${min}:${sec}`
}
