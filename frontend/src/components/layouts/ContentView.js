import React from 'react'
import styled from 'styled-components'
import { Grid, Paper } from '@material-ui/core'
import { media } from '../../styles/variables'

const View = styled(Paper)`
  height: auto;
  min-height: 100vh;
  overflow: auto;
  padding: 1rem;
`

const Wrapper = styled.div`
  width: 100%;
  margin: 1rem auto;

  ${media.tabletPortraitUp} {
    width: 100%;
  }
`

const ContentView = (props) => {
  return (
    <>
      <Grid container item xs={12} direction="column">
        <View>
          <Wrapper>{props.children}</Wrapper>
        </View>
      </Grid>
    </>
  )
}

export default ContentView
