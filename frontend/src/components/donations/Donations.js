import React, { useEffect, useState } from 'react'
import TabbedNav from '../common/TabbedNav'
import CurrentMonthDonations from './CurrentMonthDonations'

const Myanmar = () => <div>MM</div>
const Japan = () => <div>JP</div>

const Donations = (_props) => {
  return (
    <>
      <TabbedNav
        tabMenus={['All', 'JP', 'MM']}
        tabPanels={[CurrentMonthDonations, Myanmar, Japan]}
      />
    </>
  )
}
export default Donations
