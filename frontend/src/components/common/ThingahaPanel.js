import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'

const StyledPanelContainer = styled(Paper)`
  background: ${({ theme }) => theme.palette.background.paper};
  color: ${({ theme }) => theme.palette.text.tertiary};
  border-radius: 4px 4px 0 0;
  padding-bottom: 1rem;
  margin-bottom: 0.5rem;

  & .heading-container {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    padding: 0.25rem 1rem;
    border-radius: 4px 4px 0 0;
  }
`

const ThingahaPanel = ({ heading, children }) => {
  return (
    <StyledPanelContainer>
      <div className="heading-container">
        <Typography variant="h3" align="center" color="inherit">
          {heading}
        </Typography>
      </div>
      {children}
    </StyledPanelContainer>
  )
}

export default ThingahaPanel
