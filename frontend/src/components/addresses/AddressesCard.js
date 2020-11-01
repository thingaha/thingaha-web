import React from 'react'
import styled from 'styled-components'
import { Grid, Paper } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { NavLink } from 'react-router-dom'
import { media } from '../../styles/variables'

const AddressCardContainer = styled(Paper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
  margin: 0.5rem 0rem;
  align-items: center;
  transition: all 0.3s;
  ${media.tabletPortraitUp} {
    padding-right: 2rem;
  }
  ${media.mobileOnly} {
    padding-right: 0.5rem;
  }

  & .cardName {
    padding-top: 0.5rem;
    ${media.mobileOnly} {
      padding-right: 2rem;
    }
  }

  & .cardNameFont {
    font-size: 1.2rem;
  }

  & .cardTitle {
    font-size: 0.7rem;
    color: ${(props) => props.theme.palette.text.disabled};
  }
`

const IconDiv = styled.div`
  color: ${({ theme }) => theme.palette.primary.main};
`

//TODO: localize
const labelDivision = 'Division'
const labelDistrict = 'District'
const labelTownship = 'Township'
const labelStreetAddress = 'Street Address'

const AddressCard = ({ address, icon, link }) => {
  return (
    <AddressCardContainer elevation={2}>
      <Grid container spacing={1}>
        <Grid item sm={3} xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} className="cardName">
              <NavLink to={link}>
                <Typography variant="subtitle1" className="cardNameFont">
                  {address.addressable.name}
                </Typography>
              </NavLink>
            </Grid>
            <Box
              display={{ xs: 'block', sm: 'none' }}
              style={{ marginLeft: '-2rem' }}
            >
              <IconDiv>{icon}</IconDiv>
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
        </Grid>
        <Box
          display={{ xs: 'none', sm: 'block' }}
          style={{ marginRight: '-2rem' }}
        >
          <IconDiv>{icon}</IconDiv>
        </Box>
      </Grid>
    </AddressCardContainer>
  )
}

export default AddressCard
