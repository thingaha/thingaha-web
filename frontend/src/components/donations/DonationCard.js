import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/EditRounded'
import { formatMMK, formatJPY } from '../../utils/formatCurrency'
import { media } from '../../styles/variables'

const DonationCardWrapper = styled(Paper)`
  display: flex;
  justify-content: flex-start;
  height: auto;
  padding: 1rem 0;
  margin-bottom: 1rem;

  & .col1 {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }

  & .col2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1rem;
    margin-right: 1rem;
    width: 100%;
  }

  & .col2 .top-row {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
  }

  & .col2 .top-row .content {
    margin-left: auto;
    margin-right: 1rem;
  }

  & .col2 .top-row .action {
    margin-left: auto;
    margin-right: 1rem;
  }

  & .col2 .bottom-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  & .col2 .bottom-row .content {
    display: flex;
    justify-content: flex-start;

    ${media.mobileOnly} {
      flex-direction: column;
      justify-content: flex-start;
    }
  }

  & .year {
    color: ${({ theme }) => theme.palette.secondary.light};
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  & .month {
    color: ${({ theme }) => theme.palette.secondary.light};
    font-size: 1.25rem;
    text-transform: capitalize;
  }

  & .display-name {
    font-size: 1.5rem;
  }

  & .edit {
    cursor: pointer;
    margin-bottom: 0.25rem;
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

const DonationCard = ({ donation, onEdit }) => {
  return (
    <DonationCardWrapper>
      <div className="col1">
        <div className="year">{donation.year}</div>
        <div className="month">{donation.month}</div>
      </div>
      <div className="col2">
        <div className="top-row">
          <div className="content display-name">
            {donation.user.display_name}
          </div>
          <div className="action">
            <EditIcon
              color="primary"
              className="edit"
              variant="rounded"
              onClick={() => {
                onEdit(donation)
              }}
            />
          </div>
        </div>
        <div className="bottom-row">
          <div className="content">
            <PropertyPair name="Student:" value={donation.student.name} />
            <PropertyPair
              name="JPY Amount:"
              value={formatJPY(donation.jpy_amount)}
            />
            <PropertyPair
              name="MMK Amount:"
              value={formatMMK(donation.mmk_amount)}
            />
          </div>
        </div>
      </div>
    </DonationCardWrapper>
  )
}

export default DonationCard
