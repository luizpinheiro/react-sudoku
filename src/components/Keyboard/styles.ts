import styled from 'styled-components'

import { gray } from '../../styles/colors'

const CELL_SIZE = 45

export const MainContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`
export const ButtonsContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
  justify-content: flex-end;
`
export const Button = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  background: white;
  border-radius: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background: #efefef;
  }
`

export const KeysContainer = styled.div`
  display: flex;
`

export const Cell = styled.div<{ disabled: boolean }>`
  box-sizing: border-box;
  flex-shrink: 0;
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  line-height: ${CELL_SIZE}px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 26px;
  text-align: center;
  cursor: pointer;
  color: ${gray[600]};
  ${(props) =>
    props.disabled &&
    `
    color: ${gray[300]};
  `}
`
