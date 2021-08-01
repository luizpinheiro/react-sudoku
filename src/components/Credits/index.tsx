import React from 'react'

import * as S from './styles'

const Credits = () => (
  <S.MainContainer>
    <div>
      Icons made by{' '}
      <a
        href="https://www.flaticon.com/authors/good-ware"
        title="Good Ware"
        target="_blank"
        rel="noreferrer"
      >
        Good Ware
      </a>
      {' and '}
      <a
        href="https://www.freepik.com"
        title="Freepik"
        target="_blank"
        rel="noreferrer"
      >
        Freepik
      </a>
      {' from '}
      <a
        href="https://www.flaticon.com/"
        title="Flaticon"
        target="_blank"
        rel="noreferrer"
      >
        www.flaticon.com
      </a>
    </div>
  </S.MainContainer>
)

export default React.memo(Credits)
