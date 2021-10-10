import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import values from 'lodash/values'

import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Pagination from '@material-ui/lab/Pagination'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import MenuItem from '@material-ui/core/MenuItem'
import ThingahaSelect from '../common/ThingahaSelect'
import ThingahaSearchInput from '../common/ThingahaSearchInput'
import Typography from '@material-ui/core/Typography'
import * as actions from '../../store/actions'
import DonationCard from './DonationCard'
import DonationForm from './DonationForm'
import { MONTHS, THINGAHA_PROJECT_YEARS } from '../../utils/dateAndTimeHelpers'
import { media } from '../../styles/variables'

const Wrapper = styled.div`
  width: 100%;
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
    margin-bottom: 0.2rem;
    height: 7rem;

    ${media.mobileOnly} {
      height: auto;
      margin-bottom: 1rem;
    }
  }
`
const FilterHeading = styled(Typography)`
  display: flex;
  justify-content: flex-start;

  & .year {
    width: auto;
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 1rem;
    margin-right: 1rem;
  }

  & .month {
    width: auto;
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 1rem;
    margin-right: 1rem;
  }

  & .search {
    width: auto;
    margin-left: auto;
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 1rem;
  }
`

const YearMonthFilter = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  keyword,
  setKeyword,
}) => {
  return (
    <FilterHeading component={'span'}>
      <ThingahaSelect
        onChange={(e) => {
          setSelectedYear(e.target.value)
        }}
        value={selectedYear || ''}
        id="year"
        name="year"
        label="year"
        className="year"
        displayEmpty
      >
        <MenuItem value={''} key={0}>
          All Years
        </MenuItem>
        {THINGAHA_PROJECT_YEARS.map((year) => {
          return (
            <MenuItem value={year} key={year}>
              {year}
            </MenuItem>
          )
        })}
      </ThingahaSelect>
      <ThingahaSelect
        onChange={(e) => {
          setSelectedMonth(e.target.value)
        }}
        value={selectedMonth || ''}
        id="month"
        name="month"
        label="month"
        className="month"
        displayEmpty
      >
        <MenuItem value={''} key={0}>
          All months
        </MenuItem>
        {MONTHS.map((monthData) => {
          return (
            <MenuItem value={monthData.value} key={monthData.value}>
              {monthData.name}
            </MenuItem>
          )
        })}
      </ThingahaSelect>
      <ThingahaSearchInput
        onChange={(e) => {
          setKeyword(e.target.value)
        }}
        value={keyword}
        id="donation-search"
        className="search"
      />
    </FilterHeading>
  )
}

const Donations = ({
  donations,
  totalCount,
  totalPages,
  fetchDonations,
  getDonationsForMonth,
}) => {
  const [donationFormVisible, setDonationFormVisible] = useState(false)
  const [editingDonation, setEditingDonation] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (selectedYear || selectedMonth || keyword) {
      getDonationsForMonth({
        year: selectedYear,
        month: selectedMonth,
        keyword,
      })
    } else {
      fetchDonations()
    }
  }, [fetchDonations, selectedYear, selectedMonth, keyword])

  return (
    <Wrapper component={Paper}>
      <HeadingContainer>
        <h1>Donations</h1>
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
        <YearMonthFilter
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          setSelectedYear={setSelectedYear}
          setSelectedMonth={setSelectedMonth}
          keyword={keyword}
          setKeyword={setKeyword}
        />
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
            <li className="donation-row" key={donation.id}>
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
            if (selectedYear || selectedMonth || keyword) {
              getDonationsForMonth({
                year: selectedYear,
                month: selectedMonth,
                keyword: keyword,
              })
            } else {
              fetchDonations({ page })
            }
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
    getDonationsForMonth: ({ year, month, keyword }) =>
      dispatch(actions.getDonationsForMonth({ year, month, keyword })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Donations)
