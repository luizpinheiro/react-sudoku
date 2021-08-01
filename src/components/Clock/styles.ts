import styled from 'styled-components'

import { gray } from '../../styles/colors'

export const MainContainer = styled.div`
  font-size: 12px;
  color: ${gray[300]};
  display: flex;
  align-items: center;

  img {
    filter: grayscale(50);
    margin-right: 5px;
  }
`
