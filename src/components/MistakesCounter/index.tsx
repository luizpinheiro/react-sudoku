import React from 'react'

import * as S from './styles'

type Props = {
  mistakes: number
  maximumMistakes: number
}
const MistakesCounter = ({ mistakes, maximumMistakes }: Props) => (
  <S.MainContainer>
    {mistakes}/{maximumMistakes} mistakes
  </S.MainContainer>
)

export default MistakesCounter
