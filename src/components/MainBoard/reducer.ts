import { GameStatus } from '../../enums'
import {
  Action,
  Actions,
  AnnotationsMatrix,
  Coordinate,
  ErrorsMatrix,
  NumbersMatrix,
} from '../../types'
import {
  clearBlockAnnotations,
  clearCells,
  clearColumnAnnotations,
  clearLineAnnotations,
  generatePreFilledCells,
} from '../../utils/miscellaneous'
import * as Configs from '../../config'
import { cloneMatrix, createMatrix } from '../../utils/matrix'

type State = {
  gameStatus: GameStatus
  seconds: number
  resultMatrix: NumbersMatrix
  prefilledMatrix: NumbersMatrix
  fillMatrix: NumbersMatrix
  errorsMatrix: ErrorsMatrix
  annotationsMatrix: AnnotationsMatrix
  mistakesCounter: number
  selectedPosition: Coordinate | null
  filledPositions: number
}

/**
 * We create a new game state from a function so we can use it
 * when restarting the game.
 */
const generateInitialState = (): State => {
  const completeResultMatrix = generatePreFilledCells()
  const prefilledMatrix = clearCells(completeResultMatrix, Configs.MAX_EMPTY_CELLS)
  return {
    gameStatus: GameStatus.IDLE,
    seconds: 0,
    resultMatrix: completeResultMatrix,
    prefilledMatrix,
    fillMatrix: createMatrix<number | null>(9, null),
    selectedPosition: null,
    mistakesCounter: 0,
    errorsMatrix: createMatrix<boolean>(9, false),
    filledPositions: 0,
    annotationsMatrix: createMatrix<number[]>(9, []),
  }
}

export const initialState: State = generateInitialState()

const reducerFunction = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.CLOCK_TICK:
      return {
        ...state,
        seconds: state.seconds + 1,
      }
    case Actions.SELECT:
      if (!action.position) return state
      return {
        ...state,
        selectedPosition: action.position,
      }
    case Actions.RESTART:
      return generateInitialState()
    case Actions.ANNOTATE: {
      if (!action.position) return state
      if (!action.value) return state
      if (state.fillMatrix[action.position.y][action.position.x] !== null) return state
      const annotationsMatrix = cloneMatrix<number[]>(state.annotationsMatrix)
      const index = annotationsMatrix[action.position.y][action.position.x].indexOf(action.value)

      if (index >= 0) {
        annotationsMatrix[action.position.y][action.position.x] = annotationsMatrix[
          action.position.y
        ][action.position.x].filter((value) => value !== action.value)
      } else {
        annotationsMatrix[action.position.y][action.position.x] = [
          ...annotationsMatrix[action.position.y][action.position.x],
          action.value,
        ].sort()
      }
      return {
        ...state,
        annotationsMatrix,
      }
    }
    case Actions.ERASE: {
      if (!action.position) return state
      if (state.prefilledMatrix[action.position.y][action.position.x] !== null) return state
      if (state.fillMatrix[action.position.y][action.position.x] === null) return state

      const fillMatrix = cloneMatrix<number | null>(state.fillMatrix)
      const errorsMatrix = cloneMatrix<boolean>(state.errorsMatrix)

      fillMatrix[action.position.y][action.position.x] = null
      errorsMatrix[action.position.y][action.position.x] = false

      return {
        ...state,
        fillMatrix,
        errorsMatrix,
        filledPositions: state.errorsMatrix[action.position.y][action.position.x]
          ? state.filledPositions
          : state.filledPositions - 1,
      }
    }
    case Actions.INPUT: {
      if (!action.position) return state
      if (!action.value) return state
      if (state.prefilledMatrix[action.position.y][action.position.x]) {
        return state
      }
      if (state.fillMatrix[action.position.y][action.position.x] === action.value) {
        return state
      }

      const fillMatrix = cloneMatrix<number | null>(state.fillMatrix)
      const errorsMatrix = cloneMatrix<boolean>(state.errorsMatrix)
      const annotationsMatrix = cloneMatrix<number[]>(state.annotationsMatrix)

      fillMatrix[action.position.y][action.position.x] = action.value
      errorsMatrix[action.position.y][action.position.x] =
        state.resultMatrix[action.position.y][action.position.x] !== action.value

      const mistake = errorsMatrix[action.position.y][action.position.x]
      const win = !mistake && state.filledPositions + 1 === Configs.MAX_EMPTY_CELLS

      // Check if we need to make any game status change
      let gameStatus = win ? GameStatus.WIN : GameStatus.ONGOING
      if (mistake && state.mistakesCounter + 1 === Configs.MISTAKES_ALLOWED)
        gameStatus = GameStatus.LOST

      // Clear any annotations in the filled position
      annotationsMatrix[action.position.y][action.position.x] = []

      // Remove the annotations that holds the same value on the same line, column and block
      clearLineAnnotations(action.value, action.position, annotationsMatrix)
      clearColumnAnnotations(action.value, action.position, annotationsMatrix)
      clearBlockAnnotations(action.value, action.position, annotationsMatrix)

      return {
        ...state,
        fillMatrix,
        errorsMatrix,
        mistakesCounter: mistake ? state.mistakesCounter + 1 : state.mistakesCounter,
        gameStatus,
        filledPositions: mistake ? state.filledPositions : state.filledPositions + 1,
        annotationsMatrix,
      }
    }
    default:
      throw new Error(`Invalid action: ${action.type}`)
  }
}

export default reducerFunction
