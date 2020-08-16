import React from 'react'
import styled from 'styled-components'
import DonatorCard from './DonatorCard'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import { Typography } from '@material-ui/core'

const DonatorList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  & li {
    margin-bottom: 0.5rem;
  }
`

const CurrentMonthDonations = ({ donations, updateDonationStatus }) => {
  const handleToggle = (donation) => {
    const newStatus = donation.status === 'pending' ? 'paid' : 'pending'
    updateDonationStatus(donation.id, newStatus)
  }

  const SearchInput = () => {
    return (
      <Input
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    )
  }

  const MonthHeading = styled(Typography)`
    & .year {
      color: ${({ theme }) => theme.palette.text.secondary};
      font-size: 1.25rem;
    }

    & .month {
      color: ${({ theme }) => theme.palette.text.primary};
      font-size: 1.5rem;
    }
  `

  const HeadingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  `

  const Heading = () => {
    return (
      <HeadingContainer>
        <MonthHeading>
          <span class="month">JUL </span>
          <span class="year">2020</span>
        </MonthHeading>
        <SearchInput />
      </HeadingContainer>
    )
  }

  return (
    <>
      <Heading />
      <DonatorList>
        {donations.map((donation) => {
          return (
            <li>
              <DonatorCard
                handleToggle={() => handleToggle(donation)}
                checked={donation.status === 'paid'}
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

const mapStateToProps = (state) => ({})

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
