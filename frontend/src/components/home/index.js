import React, { useEffect } from 'react'
import styled from 'styled-components'
import { withTheme } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

const StyledHeading = withTheme(
  styled(Typography)`
    color: ${(props) => props.theme.palette.primary.dark};
  `
)

const Home = () => {
  return (
    <Grid container direction="column">
      <StyledHeading variant="h1" component="h2">
        Hello World
      </StyledHeading>
    </Grid>
  )
}

export default Home
