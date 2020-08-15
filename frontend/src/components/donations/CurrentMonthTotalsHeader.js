import React from 'react'
import styled from 'styled-components'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import PeopleIcon from '@material-ui/icons/People'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

const StyledHeaderContainer = styled(Paper)`
  display: flex;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.palette.primary.dark};

  & .head-count-total {
    flex: 1;
    display: flex;
    align-items: center;
  }

  & .head-count-total .ratio {
    margin-left: 0.5rem;
  }

  & .amount-total {
    flex: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  & .amount-total .chip {
    margin-left: 0.5rem;
  }

  & .amount-total .chip.success {
    background-color: ${({ theme }) => theme.palette.success.light};
  }

  & .amount-total .chip.default {
    background-color: ${({ theme }) => theme.palette.common.white};
  }
`

const CurrentMonthTotalsHeader = ({
  totalCount,
  paidCount,
  paidTotal,
  pendingTotal,
}) => {
  return (
    <>
      <StyledHeaderContainer>
        <div class="head-count-total">
          <PeopleIcon />
          <div class="ratio">
            {paidCount}/{totalCount}
          </div>
        </div>
        <div class="amount-total">
          <AttachMoneyIcon />
          <Chip label={paidTotal} className="chip success" />
          <Chip label={pendingTotal} className="chip default" />
        </div>
      </StyledHeaderContainer>
    </>
  )
}

export default CurrentMonthTotalsHeader
