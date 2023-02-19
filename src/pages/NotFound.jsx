import React from 'react'
import styled from 'styled-components'

const StyledNotFound = styled.div`
margin: auto;
`;

function NotFound() {
  return (
    <StyledNotFound>
        <h1>NotFound</h1>
        <p>It seems you are lost !</p>
    </StyledNotFound>
  )
}

export default NotFound