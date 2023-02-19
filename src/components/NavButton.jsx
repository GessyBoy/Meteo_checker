import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledNavBarLink = styled(NavLink)`
    color: black;
    text-decoration: none;
    padding: 1em 1.5em;
    color: var(--grey);
    &.active {
        background-color: var(--main-blue);
        color: #000;
    }
    &:hover {
        color: #000;
    }
    `;

function NavButton({children, dest}) {
  return (
    <StyledNavBarLink to={dest}>{children}</StyledNavBarLink>
  )
}

export default NavButton