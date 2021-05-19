import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import EditIcon from '@material-ui/icons/EditRounded'
import Grid from '@material-ui/core/Grid'
import { media } from '../../styles/variables'

const TransferCardWrapper = styled(Paper)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
  padding: 1rem;

  & .row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    margin: 0.5rem 1rem;
    padding: 0;
  }

  & .row.left-padded {
    padding-left: 2.5rem;
  }

  & .actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  & .year {
    font-size: 1.25rem;
    line-height: 2rem;
    margin-left: 1rem;
  }

  & .month {
    font-size: 1.25rem;
    line-height: 2rem;
    margin-left: 1rem;
  }

  & .total_mmk {
    font-size: 1.25rem;
    line-height: 2rem;
    margin-left: 1rem;
  }

  & .total_jpy {
    font-size: 1.25rem;
    line-height: 2rem;
    margin-left: 2rem;
  }

  & .edit {
    cursor: pointer;
  }

  & .smallText {
    padding-left: 0.5rem;
    font-size: 1rem;
    line-height: 1rem;
  }

  & .property-pair:first-child {
    margin-left: 0;
  }

  & .property-pair {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1rem;

    ${media.mobileOnly} {
      margin-left: 0;
    }
  }

  & .property-name {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.palette.text.secondary};
    line-height: 2rem;
  }

  & .property-value {
    margin-left: 1rem;
    font-size: 1rem;
  }
`

const PropertyPair = ({ name, value }) => {
  return (
    <div className="property-pair">
      <div className="property-name">{name}</div>
      <div className="property-value">{value}</div>
    </div>
  )
}

const TransferCard = ({ transfer, onEdit }) => {
  return (
    <TransferCardWrapper>
      <Grid container spacing={3}>
        <Grid className="row" item xs={12}>
          <Grid className="row" item>
            <div className="smallText">
              <Avatar>{transfer.id}</Avatar>
            </div>
            <div className="month">
              {`${transfer.month}`.toUpperCase().slice(0, 3)}
            </div>
            <div className="year">{transfer.year}</div>
          </Grid>
          <Grid className="actions" item>
            <EditIcon
              color="primary"
              className="edit"
              variant="rounded"
              onClick={() => {
                onEdit(transfer)
              }}
            />
          </Grid>
        </Grid>
        <Grid
          className="row left-padded"
          container
          item
          xs={12}
          justify="flex-end"
        >
          <PropertyPair name="Total JPY" value={transfer.total_jpy} />
          <PropertyPair name="Total MMK" value={transfer.total_mmk} />
        </Grid>
      </Grid>
    </TransferCardWrapper>
  )
}

export default TransferCard
