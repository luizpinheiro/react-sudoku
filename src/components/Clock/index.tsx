import React, { useEffect, useState } from 'react'

import iconImage from './icon.png'
import * as S from './styles'
import { GameStatus } from '../../enums'
import { secondsToClock } from '../../utils/miscellaneous'

type Props = {
  gameStatus: GameStatus
  seconds: number
  onClockTick: () => void
}
const Clock = ({ gameStatus, seconds, onClockTick }: Props) => {
  const [intervalId, setIntervalId] = useState<number | null>(null)

  useEffect(() => {
    if (gameStatus === GameStatus.ONGOING) {
      setIntervalId(
        window.setInterval(() => {
          onClockTick()
        }, 1000),
      )
    } else if (intervalId) window.clearInterval(intervalId)
  }, [gameStatus])

  return (
    <S.MainContainer>
      <img src={iconImage} width={12} height={12} alt="" />
      {secondsToClock(seconds)}
    </S.MainContainer>
  )
}

export default Clock
