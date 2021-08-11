import React, { useCallback, useReducer } from 'react'

import * as S from './styles'
import Grid from '../Grid'
import { Actions, Coordinate } from '../../types'
import Keyboard from '../Keyboard'
import Header from '../Header'
import Clock from '../Clock'
import MistakesCounter from '../MistakesCounter'
import EndGameOverlay from '../EndGameOverlay'
import reducerFunction, { initialState } from './reducer'
import { MISTAKES_ALLOWED } from '../../config'
import Signature from '../Signature'
import Credits from '../Credits'

const MainBoard = () => {
  const [state, dispatch] = useReducer(reducerFunction, initialState)

  const handleSelect = useCallback((position: Coordinate) => {
    dispatch({
      type: Actions.SELECT,
      position,
    })
  }, [])
  const handleInput = useCallback((position: Coordinate, value: number) => {
    dispatch({
      type: Actions.INPUT,
      position,
      value,
    })
  }, [])

  const handleErase = useCallback((position: Coordinate) => {
    dispatch({
      type: Actions.ERASE,
      position,
    })
  }, [])

  const handlePlayAgain = useCallback(() => {
    dispatch({
      type: Actions.RESTART,
    })
  }, [])

  const handleClockTick = useCallback(() => {
    dispatch({
      type: Actions.CLOCK_TICK,
    })
  }, [])

  const handleAnnotation = useCallback(
    (position: Coordinate, value: number) => {
      dispatch({
        type: Actions.ANNOTATE,
        position,
        value,
      })
    },
    [dispatch],
  )

  return (
    <S.MainContainer>
      <Header />
      <S.GameStats>
        <MistakesCounter mistakes={state.mistakesCounter} maximumMistakes={MISTAKES_ALLOWED} />
        <Clock
          gameStatus={state.gameStatus}
          seconds={state.seconds}
          onClockTick={handleClockTick}
        />
      </S.GameStats>
      <Grid
        selectedCell={state.selectedPosition}
        onSelect={handleSelect}
        initialCellValues={state.prefilledMatrix}
        filledCellValues={state.fillMatrix}
        errorsMatrix={state.errorsMatrix}
        annotationsMatrix={state.annotationsMatrix}
      />
      <Keyboard
        selectedPosition={state.selectedPosition}
        prefilledCells={state.prefilledMatrix}
        filledCells={state.fillMatrix}
        onClick={handleInput}
        onErase={handleErase}
        onAnnotate={handleAnnotation}
      />
      <EndGameOverlay
        seconds={state.seconds}
        gameStatus={state.gameStatus}
        onPlayAgain={handlePlayAgain}
      />
      <Signature />
      <Credits />
    </S.MainContainer>
  )
}

export default React.memo(MainBoard)
