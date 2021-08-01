import styled from 'styled-components'

export const MainContainer = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.85);
`

export const Button = styled.button`
  margin-top: 15px;
  border-radius: 0;
  background: #f4f5f2;
  border: none;
  padding: 8px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    background: #d4d6d0;
  }
`
