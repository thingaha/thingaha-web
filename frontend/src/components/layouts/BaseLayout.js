import React from 'react'
import { Grid } from '@material-ui/core'

const BaseLayout = (props) => {
  return (
    <Grid container direction="row" spacing={0}>
      {props.children}
    </Grid>
  )
}

export default BaseLayout
