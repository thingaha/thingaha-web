import React from 'react'
import styled from 'styled-components'
import { Grid, Paper } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { NavLink } from 'react-router-dom'
import { media } from '../../styles/variables'
import EditIcon from '@material-ui/icons/EditRounded'
import { formatMMK } from '../../utils/formatCurrency'

const ExtraFundCardContainer = styled(Paper)`
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

  & .cardId {
    padding-top: 0.5rem;
    ${media.mobileOnly} {
      padding-right: 2rem;
    }
  }

  & .cardTitle {
    font-size: 0.7rem;
    color: ${(props) => props.theme.palette.text.disabled};
  }
`

const IconDiv = styled.div`
  color: ${({ theme }) => theme.palette.primary.main};
`

//TODO: localize=
const labelTransferId = 'Transfer Id'
const labelMonth = 'Month'
const labelTotalAmountMMK = 'Total Amount MMK'

const ExtrafundCard = ({ extraFund, link, onEdit }) => {
  return (
    <ExtraFundCardContainer elevation={2}>
      <Grid container spacing={1}>
        <Grid item sm={4} xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} className="cardId">
              <NavLink to={link}>
                <div xs={12} className="cardTitle">
                  {labelTransferId}
                </div>
                <Typography variant="subtitle1">
                  {extraFund.transfer.id}
                </Typography>
              </NavLink>
            </Grid>
            <Box
              display={{ xs: 'block', sm: 'none' }}
              style={{ marginLeft: '-2rem' }}
            >
              <IconDiv>
                {
                  <EditIcon
                    onClick={() => {
                      onEdit(extraFund)
                    }}
                  />
                }
              </IconDiv>
            </Box>
          </Grid>
        </Grid>
        <Grid item sm={4} xs={6}>
          <div xs={12} className="cardTitle">
            {labelMonth}
          </div>
          <Typography variant="subtitle1">
            {extraFund.transfer.month}
          </Typography>
        </Grid>
        <Grid item sm={4} xs={6}>
          <div xs={12} className="cardTitle">
            {labelTotalAmountMMK}
          </div>
          <Typography variant="subtitle1">
            {formatMMK(extraFund.mmk_amount)}
          </Typography>
        </Grid>
        <Box
          display={{ xs: 'none', sm: 'block' }}
          style={{ marginRight: '-2rem' }}
        >
          <IconDiv>
            {
              <EditIcon
                onClick={() => {
                  onEdit(extraFund)
                }}
              />
            }
          </IconDiv>
        </Box>
      </Grid>
    </ExtraFundCardContainer>
  )
}

export default ExtrafundCard
