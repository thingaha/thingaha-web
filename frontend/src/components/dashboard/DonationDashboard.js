import React, { useEffect } from 'react'
import ThingahaTabbedNav from '../common/ThingahaTabbedNav'
import CurrentMonthDonations from './CurrentMonthDonations'
import MonthlyDonationStats from './MonthlyDonationStats'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import sumBy from 'lodash/sumBy'
import values from 'lodash/values'
import { formatMMK, formatJPY } from '../../utils/formatCurrency'

const Myanmar = ({ donations }) => (
  <CurrentMonthDonations donations={donations} />
)
const Japan = ({ donations }) => <CurrentMonthDonations donations={donations} />
const All = ({ donations }) => <CurrentMonthDonations donations={donations} />

const DonationDashboard = ({ donations, getDonationsForMonth }) => {
  useEffect(() => {
    getDonationsForMonth()
  }, [getDonationsForMonth])

  // TODO: replace these filters with selectors using reselect
  const myanmarDonations = donations.filter(
    (donation) => donation.user.country === 'mm'
  )
  const japanDonations = donations.filter(
    (donation) => donation.user.country === 'jp'
  )

  const japanPaidDonations = japanDonations.filter(
    (donation) => donation.status === 'paid'
  )
  const japanPendingDonations = japanDonations.filter(
    (donation) => donation.status === 'pending'
  )
  const myanmarPaidDonations = myanmarDonations.filter(
    (donation) => donation.status === 'paid'
  )
  const myanmarPendingDonations = myanmarDonations.filter(
    (donation) => donation.status === 'pending'
  )

  const japanPaidAmount = sumBy(japanPaidDonations, 'jpy_amount')
  const myanmarPaidAmount = sumBy(myanmarPaidDonations, 'mmk_amount')
  const japanPendingAmount = sumBy(japanPendingDonations, 'jpy_amount')
  const myanmarPendingAmount = sumBy(myanmarPendingDonations, 'mmk_amount')

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <ThingahaTabbedNav
          tabMenus={['All', 'JP', 'MM']}
          tabPanels={[
            <All donations={donations} />,
            <Japan donations={japanDonations} />,
            <Myanmar donations={myanmarDonations} />,
          ]}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <MonthlyDonationStats
          totalCount={japanDonations.length}
          paidCount={japanPaidDonations.length}
          pendingAmount={formatJPY(japanPendingAmount)}
          paidAmount={formatJPY(japanPaidAmount)}
          countryEmoji={'🇯🇵'}
        />
        <MonthlyDonationStats
          totalCount={myanmarDonations.length}
          paidCount={myanmarPaidDonations.length}
          pendingAmount={formatMMK(myanmarPendingAmount)}
          paidAmount={formatMMK(myanmarPaidAmount)}
          countryEmoji={'🇲🇲'}
        />
      </Grid>
    </Grid>
  )
}
//Selectors
const getDonationList = (state) => {
  return values(state.donations.donations)
}

const mapStateToProps = (state) => ({
  donations: getDonationList(state),
})

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    getDonationsForMonth: (year, month) =>
      dispatch(actions.getDonationsForMonth(year, month)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DonationDashboard)
