import React from 'react'
import styled from 'styled-components'
import NavButton from './NavButton';

const StyledNav = styled.nav`
    background-color: var(--light-blue);
    color: var(--grey);
    padding: 1rem;
    `;

function Navbar() {
  return (
    <StyledNav>
        <NavButton dest="/">Home</NavButton>
    </StyledNav>
  )
}

export default Navbar