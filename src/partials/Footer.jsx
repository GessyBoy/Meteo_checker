import React from 'react';
import styled from 'styled-components'

const StyledFooter = styled.footer`
padding : 1rem;
background-color: var(--light-blue);
font-size: small;
text-align: center;
color: var(--grey);
`

function Footer() {
  return (
    <StyledFooter>&copy; Wilders</StyledFooter>
  )
}

export default Footer