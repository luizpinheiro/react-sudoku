import { GameStatus } from '../../enums'
import {
  Action,
  Actions,
  Coordinate,
  ErrorsMatrix,
  NumbersMatrix,
} from '../../types'
import {
  clearCells,
  cloneMatrix,
  generateMatrix,
  generateprefilledCells,
} from '../../utils/miscellaneous'
import * as Configs from '../../config'

type State = {
  gameStatus: GameStatus
  seconds: number
  resultMatrix: NumbersMatrix
  prefilledMatrix: NumbersMatrix
  fillMatrix: NumbersMatrix
  errorsMatrix: ErrorsMatrix
  mistakesCounter: number
  selectedPosition: Coordinate | null
  filledPositions: number
}

const generateInitialState = (): State => {
  const completeResultMatrix = generateprefilledCells()
  return {
    gameStatus: GameStatus.IDLE,
    seconds: 0,
    resultMatrix: completeResultMatrix,
    prefilledMatrix: clearCells(completeResultMatrix, Configs.EMPTY_CELLS),
    fillMatrix: generateMatrix<number | null>(null),
    selectedPosition: null,
    mistakesCounter: 0,
    errorsMatrix: generateMatrix<boolean>(false),
    filledPositions: 0,
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
    case Actions.ERASE: {
      if (!action.position) return state
      if (state.prefilledMatrix[action.position.y][action.position.x] !== null)
        return state
      if (state.fillMatrix[action.position.y][action.position.x] === null)
        return state

      const fillMatrix = cloneMatrix<number | null>(state.fillMatrix)
      const errorsMatrix = cloneMatrix<boolean>(state.errorsMatrix)

      fillMatrix[action.position.y][action.position.x] = null
      errorsMatrix[action.position.y][action.position.x] = false

      return {
        ...state,
        fillMatrix,
        errorsMatrix,
      }
    }
    case Actions.INPUT: {
      if (!action.position) return state
      if (!action.value) return state
      if (
        state.prefilledMatrix[action.position.y][action.position.x] !== null
      ) {
        return state
      }
      if (
        state.fillMatrix[action.position.y][action.position.x] === action.value
      ) {
        return state
      }

      const fillMatrix = cloneMatrix<number | null>(state.fillMatrix)
      const errorsMatrix = cloneMatrix<boolean>(state.errorsMatrix)

      fillMatrix[action.position.y][action.position.x] = action.value
      errorsMatrix[action.position.y][action.position.x] =
        state.resultMatrix[action.position.y][action.position.x] !==
        action.value

      const mistake = errorsMatrix[action.position.y][action.position.x]
      const win = !mistake && state.filledPositions + 1 === Configs.EMPTY_CELLS

      let gameStatus = win ? GameStatus.WIN : GameStatus.ONGOING
      if (mistake && state.mistakesCounter + 1 === Configs.MISTAKES_ALLOWED)
        gameStatus = GameStatus.LOST

      return {
        ...state,
        fillMatrix,
        errorsMatrix,
        mistakesCounter: mistake
          ? state.mistakesCounter + 1
          : state.mistakesCounter,
        gameStatus,
        filledPositions: mistake
          ? state.filledPositions
          : state.filledPositions + 1,
      }
    }
    default:
      throw new Error(`Invalid action: ${action.type}`)
  }
}

export default reducerFunction
