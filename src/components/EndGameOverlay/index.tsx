import React from 'react'

import * as S from './styles'
import winImage from './win.png'
import lostImage from './lose.png'
import { GameStatus } from '../../enums'
import { secondsToClock } from '../../utils/miscellaneous'

type Props = {
  gameStatus: GameStatus
  onPlayAgain: () => void
  seconds: number
}
const EndGameOverlay = ({ gameStatus, onPlayAgain, seconds }: Props) => {
  if (gameStatus !== GameStatus.WIN && gameStatus !== GameStatus.LOST)
    return null

  const image = gameStatus === GameStatus.WIN ? winImage : lostImage
  return (
    <S.MainContainer>
      <img src={image} width={128} height={128} alt="You won" />
      Your time: {secondsToClock(seconds)}
      <S.Button type="button" onClick={onPlayAgain}>
        Play Again
      </S.Button>
    </S.MainContainer>
  )
}

export default React.memo(EndGameOverlay)
