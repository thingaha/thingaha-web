import React from 'react'
import styled from 'styled-components'
import { Grid, Paper } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  righticon: {
    [theme.breakpoints.up('sm')]: {
      'padding-right': '2rem !important',
    },
  },
  nameField: {
    [theme.breakpoints.down('sm')]: {
      'padding-right': '2rem !important',
    },
  },
}))

const AddressCardContainer = styled(Paper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
  margin: 0.5rem 0rem;
  align-items: center;
  transition: all 0.3s;

  & .cardName {
    font-size: 1.2rem !important;
  }

  & .cardTitle {
    font-size: 0.7rem;
    color: ${(props) => props.theme.palette.text.disabled};
  }
`

//TODO: localize
const labelDivision = 'Division'
const labelDistrict = 'District'
const labelTownship = 'Township'
const labelStreetAddress = 'Street Address'

const AddressCard = ({ address, icon, link }) => {
  const classes = useStyles()
  return (
    <AddressCardContainer className={classes.righticon} elevation={2}>
      <Grid container spacing={1}>
        <Grid item sm={3} xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} style={{ paddingTop: '0.5rem' }}>
              <NavLink to={link}>
                <Typography variant="subtitle1" className="cardName">
                  {address.addressable.name}
                </Typography>
              </NavLink>
            </Grid>
            <Box
              display={{ xs: 'block', sm: 'none' }}
              style={{ marginLeft: '-2rem' }}
            >
              {icon}
            </Box>
          </Grid>
        </Grid>
        <Grid item sm={2} xs={6}>
          <div xs={12} className="cardTitle">
            {labelDivision}
          </div>
          <Typography variant="subtitle1">{address.division}</Typography>
        </Grid>
        <Grid item sm={2} xs={6}>
          <div xs={12} className="cardTitle">
            {labelDistrict}
          </div>
          <Typography variant="subtitle1">{address.district}</Typography>
        </Grid>
        <Grid item sm={2} xs={6}>
          <div xs={12} className="cardTitle">
            {labelTownship}
          </div>
          <Typography variant="subtitle1">{address.township}</Typography>
        </Grid>
        <Grid item sm={3} xs={6}>
          <div xs={12} className="cardTitle">
            {labelStreetAddress}
          </div>
          <Typography variant="subtitle1">{address.street_address}</Typography>
          {/* <div xs={12}>{address.addressable.type}</div> */}
        </Grid>
        <Box
          display={{ xs: 'none', sm: 'block' }}
          style={{ marginRight: '-2rem' }}
        >
          {icon}
        </Box>
      </Grid>
    </AddressCardContainer>
  )
}

export default AddressCard
