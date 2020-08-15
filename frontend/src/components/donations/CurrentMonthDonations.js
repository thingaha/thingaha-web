import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DonatorCard from './DonatorCard'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const DonatorList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  & li {
    margin-bottom: 0.5rem;
  }
`

const CurrentMonthDonations = ({
  donations: { donations },
  getDonationsForMonth,
}) => {
  useEffect(() => {
    getDonationsForMonth()
  }, [getDonationsForMonth])

  const handleToggle = (id) => {
    alert(`Toggling ${id}`)
  }

  return (
    <DonatorList>
      {donations.map((donation) => {
        return (
          <li>
            <DonatorCard
              handleToggle={() => handleToggle(donation.id)}
              checked={donation.status == 'PAID'}
              description={donation.user.user_name}
              amount={donation.amount_jpy}
            />
          </li>
        )
      })}
    </DonatorList>
  )
}

const mapStateToProps = (state) => ({
  donations: state.donations,
})

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    getDonationsForMonth: (year, month) =>
      dispatch(actions.getDonationsForMonth(year, month)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentMonthDonations)
