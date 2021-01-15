import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import values from 'lodash/values'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Pagination from '@material-ui/lab/Pagination'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import * as actions from '../../store/actions'
import DonationCard from './DonationCard'
import DonationForm from './DonationForm'

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;

  & .pagination-container {
    display: flex;
    justify-content: flex-end;
  }
`

const HeadingContainer = styled.div`
  margin-bottom: 1rem;
`

const DonationsContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  & .donation-row {
    margin-bottom: 1rem;
  }
`

const Donations = ({ donations, totalCount, totalPages, fetchDonations }) => {
  const [donationFormVisible, setDonationFormVisible] = useState(false)
  const [editingDonation, setEditingDonation] = useState(null)

  useEffect(() => {
    fetchDonations()
  }, [fetchDonations])

  return (
    <Wrapper component={Paper}>
      <HeadingContainer>
        <h2>Donations</h2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={() => {
            setEditingDonation(false)
            setDonationFormVisible(true)
          }}
        >
          Add Donation
        </Button>
      </HeadingContainer>

      {donationFormVisible ? (
        <DonationForm
          visible={donationFormVisible}
          setVisible={setDonationFormVisible}
          editingDonation={editingDonation}
        />
      ) : null}

      <DonationsContainer>
        {donations.map((donation) => {
          return (
            <li name="donation-row" key={donation.id}>
              <DonationCard
                donation={donation}
                onEdit={(editDonation) => {
                  setEditingDonation(editDonation)
                  setDonationFormVisible(true)
                }}
              />
            </li>
          )
        })}
      </DonationsContainer>
      <div className="pagination-container">
        <Pagination
          count={totalPages} // need to pass in total pages instead of total count
          color="primary"
          onChange={(_event, page) => {
            fetchDonations({ page })
          }}
        />
      </div>
    </Wrapper>
  )
}

//Selectors
const getDonationList = (state) => {
  return values(state.donations.donations)
}
const getTotalPage = (state) => state.donations.totalPages
const getTotalCount = (state) => state.donations.totalCount

const mapStateToProps = (state) => ({
  donations: getDonationList(state),
  totalCount: getTotalCount(state),
  totalPages: getTotalPage(state),
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDonations: ({ page } = { page: 1 }) =>
      dispatch(actions.fetchDonations({ page })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Donations)
