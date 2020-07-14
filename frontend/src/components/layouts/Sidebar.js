import React from 'react'
import styled from 'styled-components'
import { Grid, Paper } from '@material-ui/core'

const SidebarContent = styled(Paper)`
  width: 100%;
  min-height: 100vh;
  height: auto;
  overflow: auto;
`

const Sidebar = (props) => {
  return (
    <Grid container item xs={3} direction="column">
      <SidebarContent>
        <h1>Sidebar Heading</h1>
      </SidebarContent>
    </Grid>
  )
}

export default Sidebar
