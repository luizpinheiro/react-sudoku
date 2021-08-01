import styled from 'styled-components'

import { gray } from '../../styles/colors'

const CELL_SIZE = 45

export const MainContainer = styled.div`
  display: flex;
  width: ${CELL_SIZE * 9}px;
  flex-wrap: wrap;
`

export const Cell = styled.div<{
  selected: boolean
  initialValue: boolean
  highlighted: boolean
  error: boolean
}>`
  box-sizing: border-box;
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  line-height: ${CELL_SIZE}px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  flex-shrink: 0;
  font-size: 26px;
  font-weight: 500;
  text-align: center;
  color: #7192d9;
  cursor: pointer;

  ${(props) =>
    props.highlighted &&
    `
    background: rgba(0,0,0,.05);
  `}

  ${(props) =>
    props.selected &&
    `
    background-color: #e0fbff;
  `}

  ${(props) => props.initialValue && `color: ${gray[600]}; font-weight: 400;`}
  
  ${(props) => props.error && `color: red;`}

  &:nth-child(3n):not(:nth-child(9n)) {
    border-right: 1px solid #919191;
  }
  &:nth-child(n + 19):nth-child(-n + 27) {
    border-bottom: 1px solid #919191;
  }
  &:nth-child(n + 46):nth-child(-n + 54) {
    border-bottom: 1px solid #919191;
  }
`
