import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import TabbedNav from '../common/TabbedNav'
import CurrentMonthDonations from './CurrentMonthDonations'

const Myanmar = () => <div>MM</div>
const Japan = () => <div>JP</div>

const Donations = () => {
  return (
    <>
      <TabbedNav
        tabMenus={['All', 'JP', 'MM']}
        tabPanels={[CurrentMonthDonations, Myanmar, Japan]}
      />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Donations)
