import React from 'react'
import styled from 'styled-components'
import Chip from '@material-ui/core/Chip'
import PeopleIcon from '@material-ui/icons/People'
import ThingahaPanel from '../common/ThingahaPanel'

const StyledPropertyPair = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;

  & .property {
    flex: 50%;
    display: flex;
    align-items: center;
  }

  & .property .label {
    font-size: 1rem;
  }

  & .value {
    flex: 50%;
    display: flex;
    justify-content: flex-end;
    font-weight: bold;
    font-size: 1.25rem;
  }

  & .value .chip.success {
    background-color: ${({ theme }) => theme.palette.success.light};
  }

  & .value .chip.default {
    background-color: ${({ theme }) => theme.palette.common.lightgrey};
  }

  & .value .chip.warning {
    background-color: ${({ theme }) => theme.palette.warning.light};
  }
`

const PropertyPair = ({ description, value, emphasis }) => {
  return (
    <StyledPropertyPair>
      <div className="property">{description}</div>
      <div className="value">
        <Chip label={`${value}`} className={`chip ${emphasis}`} />
      </div>
    </StyledPropertyPair>
  )
}

const MonthlyDonationStats = ({
  totalCount,
  paidCount,
  pendingAmount,
  paidAmount,
  countryEmoji,
}) => {
  return (
    <ThingahaPanel heading={`${countryEmoji} Totals`}>
      <PropertyPair
        description={<PeopleIcon />}
        value={`${paidCount}/${totalCount}`}
        emphasis="default"
      />
      <PropertyPair
        description={<label className="label">Paid</label>}
        value={`${paidAmount}`}
        emphasis="success"
      />
      <PropertyPair
        description={<label className="label">Pending</label>}
        value={`${pendingAmount}`}
        emphasis="warning"
      />
    </ThingahaPanel>
  )
}

export default MonthlyDonationStats
