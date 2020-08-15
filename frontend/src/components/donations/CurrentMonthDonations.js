import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DonatorCard from './DonatorCard'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import sumBy from 'lodash/sumBy'
import values from 'lodash/values'
import CurrentMonthTotalsHeader from './CurrentMonthTotalsHeader'

const DonatorList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  & li {
    margin-bottom: 0.5rem;
  }
`

const CurrentMonthDonations = ({
  donations,
  getDonationsForMonth,
  updateDonationStatus,
}) => {
  useEffect(() => {
    getDonationsForMonth()
  }, [getDonationsForMonth])

  const handleToggle = (donation) => {
    const newStatus = donation.status == 'pending' ? 'paid' : 'pending'
    updateDonationStatus(donation.id, newStatus)
  }

  const paidDonations = donations.filter(
    (donation) => donation.status == 'paid'
  )

  const pendingDonations = donations.filter(
    (donation) => donation.status == 'pending'
  )

  return (
    <>
      <CurrentMonthTotalsHeader
        totalCount={donations.length}
        paidCount={paidDonations.length}
        paidTotal={sumBy(paidDonations, 'amount_jpy')}
        pendingTotal={sumBy(pendingDonations, 'amount_jpy')}
      />
      <DonatorList>
        {donations.map((donation) => {
          return (
            <li>
              <DonatorCard
                handleToggle={() => handleToggle(donation)}
                checked={donation.status == 'paid'}
                description={donation.user.user_name}
                amount={donation.amount_jpy}
              />
            </li>
          )
        })}
      </DonatorList>
    </>
  )
}

const mapStateToProps = (state) => ({
  donations: values(state.donations.content),
})

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    getDonationsForMonth: (year, month) =>
      dispatch(actions.getDonationsForMonth(year, month)),

    updateDonationStatus: (id, status) =>
      dispatch(actions.updateDonationStatus(id, status)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentMonthDonations)
