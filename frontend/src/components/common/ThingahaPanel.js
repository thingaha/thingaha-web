import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

const StyledPanelContainer = styled(Paper)`
  background: ${({ theme }) => theme.palette.background.paper};
  color: ${({ theme }) => theme.palette.text.tertiary};
  border-radius: 4px 4px 0 0;
  padding-bottom: 1rem;
  margin-bottom: 0.5rem;

  & .heading-container {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    border-radius: 4px 4px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    font-size: 1.25rem;
  }
`

const ThingahaPanel = ({ heading, children }) => {
  return (
    <StyledPanelContainer>
      <div className="heading-container">{heading}</div>
      {children}
    </StyledPanelContainer>
  )
}

export default ThingahaPanel
