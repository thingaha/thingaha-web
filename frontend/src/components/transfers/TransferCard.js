import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import EditIcon from '@material-ui/icons/EditRounded'

const TransferCardWrapper = styled(Paper)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
  padding: 1rem;

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
`
const TransferCard = ({ transfer, onEdit }) => {
  return (
    <TransferCardWrapper>
      <div className="col2">
        <div className="month">{transfer.month}</div>
        <div className="total_jpy">{'jpy ' + transfer.total_jpy}</div>
      </div>
      <div className="col2">
        <div className="year">{transfer.year}</div>
        <div className="col2">
          <div className="total_mmk">{'mmk ' + transfer.total_mmk}</div>
        </div>
      </div>
      <div className="col4">
        <EditIcon
          color="primary"
          className="edit"
          variant="rounded"
          onClick={() => {
            onEdit(transfer)
          }}
        />
      </div>
    </TransferCardWrapper>
  )
}

export default TransferCard
