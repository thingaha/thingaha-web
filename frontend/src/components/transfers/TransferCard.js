import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import EditIcon from '@material-ui/icons/EditRounded'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'

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
    justify-content: space-between;
    width: 100%;
    margin: 0.5rem 1rem;
  }
  & .col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    margin: 0.5rem 1rem;
  }

  & .col2 {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }

  & .col4 {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: auto;
    margin-right: 1rem;
  }
  & .year {
    font-size: 1.25rem;
    line-height: 2rem;
  }

  & .month {
    font-size: 1.25rem;
    line-height: 2rem;
  }

  & .total_mmk {
    font-size: 1.25rem;
    line-height: 2rem;
  }

  & .total_jpy {
    font-size: 1.25rem;
    line-height: 2rem;
  }

  & .edit {
    cursor: pointer;
  }

  & .smallText {
    padding-left: 0.5rem;
    font-size: 1rem;
    line-height: 1rem;
  }
`
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))
const TransferCard = ({ transfer, onEdit }) => {
  const classes = useStyles()
  return (
    <TransferCardWrapper>
      <div className="row" container spacing={3}>
        <div className="smallText">
          <Avatar>{transfer.id}</Avatar>
        </div>
        <div class="col" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="month">{transfer.month}</div>
          <div className="total_jpy">{'jpy ' + transfer.total_jpy}</div>
        </div>
        <div
          class="col"
          style={{ display: 'flexGrow', justifyContent: 'center' }}
        >
          <div className="year">{transfer.year}</div>
          <div className="total_mmk">{'mmk ' + transfer.total_mmk}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <Link
            to={`/transfers/${transfer.id}`}
            // params={{ transfermonth: transfer.month }}
            //params={{ transferyear: transfer.year }}
          >
            <VisibilityRoundedIcon
              color="primary"
              className="show"
              variant="rounded"
            />
          </Link>
          <EditIcon
            color="primary"
            className="edit"
            variant="rounded"
            onClick={() => {
              onEdit(transfer)
            }}
          />
        </div>
      </div>
    </TransferCardWrapper>
  )
}

export default TransferCard
