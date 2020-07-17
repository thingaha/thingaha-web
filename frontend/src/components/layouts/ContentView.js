import React from 'react'
import styled from 'styled-components'
import { Grid, Paper } from '@material-ui/core'

const View = styled(Paper)`
  height: auto;
  min-height: 100vh;
  overflow: auto;
  padding: 1rem;
`

const ContentView = (props) => {
  return (
    <Grid container item xs={10} direction="column">
      <View>{props.children}</View>
    </Grid>
  )
}

export default ContentView
