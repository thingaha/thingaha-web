import styled from 'styled-components'
import { Grid, Paper } from '@material-ui/core'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const InfoCard = styled(Paper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  margin: 0.5rem 0rem;
  align-items: center;
  transition: all 0.3s;
`

const ThingahaInfoCard = ({ title, message }) => {
  return (
    <InfoCard>
      <Grid container spacing={1} >
        <Grid container item xs={12} justify="center">
          <Typography variant="h3">{title}</Typography>
        </Grid>
        <Grid container item xs={12} justify="center">
          <Typography variant="subtitle1">{message}</Typography>
        </Grid>
      </Grid>
    </InfoCard>
  )
}

export default ThingahaInfoCard
