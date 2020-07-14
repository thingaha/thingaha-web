import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

const StyledHeading = styled.h1`
  color: red;
`;

const Home = () => {

  return (
    <Grid container direction="column">
      <StyledHeading>Hello World</StyledHeading>
    </Grid>
  )
}

export default Home
