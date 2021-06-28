import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import AddressList from './AddressList'
import HomeIcon from '@material-ui/icons/Home'
import { Grid } from '@material-ui/core'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import SchoolIcon from '@material-ui/icons/School'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import * as actions from '../../store/actions'
import ThingahaTabbedNav from '../common/ThingahaTabbedNav'
import styled from 'styled-components'
import Pagination from '@material-ui/lab/Pagination'
import values from 'lodash/values'

//TODO: Search,
//TODO: localize

const labelAddresses = 'Addresses'
const labelStudents = 'Students'
const labelSchools = 'Schools'
const labelDonators = 'Donators'
const labelTotal = 'Total'

const TotalAmountDiv = styled.div`
  display: flex;

  & .total {
    padding: 0.4rem;
    padding-bottom: 0.1rem;
    color: ${({ theme }) => theme.palette.common.white};
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-radius: 0.3rem 0 0 0.3rem;
  }

  & .amount {
    padding: 0.4rem;
    padding-bottom: 0.1rem;
    color: ${({ theme }) => theme.palette.primary.main};
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
    border-radius: 0 0.3rem 0.3rem 0;
  }
`

const SearchInput = () => {
  return (
    <Input
      placeholder="Enter name"
      id="input-with-icon-adornment"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon style={{ color: '#bdbdbd' }} />
        </InputAdornment>
      }
    />
  )
}

const Addresses = ({
  addresses,
  totalCount,
  totalPages,
  currentPage,
  getAllAddresses,
}) => {
  useEffect(() => {
    getAllAddresses()
  }, [getAllAddresses])

  const [userType, setUserType] = useState(null)

  const changeUserType = (type) => {
    setUserType(type)
    getAllAddresses({ page: 1, userType: type })
  }

  if (addresses.length === 0) {
    return null
  }

  return (
    <div>
      {/* Title */}
      <Grid
        style={{ marginBottom: '10px' }}
        container
        direction="row"
        alignItems="center"
      >
        <Grid item>
          <HomeIcon />
        </Grid>
        <Grid item>{labelAddresses}</Grid>
      </Grid>

      {/* Search and Total value */}
      <Grid
        style={{ marginBottom: '10px' }}
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          <SearchInput />
        </Grid>
        <Grid item className="MuiGrid-justify-xs-flex-end">
          <TotalAmountDiv>
            <div className="total">{labelTotal}</div>
            <div className="amount">{totalCount}</div>
          </TotalAmountDiv>
        </Grid>
      </Grid>

      {/* Tabs and Addresses list*/}
      <Grid item xs={12}>
        <ThingahaTabbedNav
          tabMenus={[
            <div
              onClick={() => {
                changeUserType('student')
              }}
            >
              <SchoolIcon style={{ verticalAlign: 'text-top' }} />
              {labelStudents}
            </div>,
            <div
              onClick={() => {
                changeUserType('school')
              }}
            >
              <LocationCityIcon style={{ verticalAlign: 'text-top' }} />
              {labelSchools}
            </div>,
            <div
              onClick={() => {
                changeUserType('user')
              }}
            >
              <MonetizationOnIcon style={{ verticalAlign: 'text-top' }} />
              {labelDonators}
            </div>,
          ]}
          tabPanels={[
            <AddressList
              addresses={addresses}
              currentPage={currentPage}
              icon={<SchoolIcon />}
              type={'students'}
            />,
            <AddressList
              addresses={addresses}
              currentPage={currentPage}
              icon={<LocationCityIcon />}
              type={'schools'}
            />,
            <AddressList
              addresses={addresses}
              currentPage={currentPage}
              icon={<MonetizationOnIcon />}
              type={'users'}
            />,
          ]}
        />
      </Grid>

      <div className="pagination-container">
        <Pagination
          count={totalPages} // need to pass in total pages instead of total count
          color="primary"
          onChange={(_event, page) => {
            getAllAddresses({ page, userType: userType })
          }}
        />
      </div>
    </div>
  )
}

const getAddressesList = (state) => {
  return values(state.addresses.addresses)
}
const getTotalPage = (state) => state.addresses.totalPages
const getTotalCount = (state) => state.addresses.totalCount
const getCurrentPage = (state) => state.addresses.currentPage

const mapStateToProps = (state) => ({
  addresses: getAddressesList(state),
  totalPages: getTotalPage(state),
  totalCount: getTotalCount(state),
  currentPage: getCurrentPage(state),
})

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    getAllAddresses: (
      { page, userType } = { page: 1, userType: 'student' }
    ) => {
      //default parameter and null problem
      if (userType === null) userType = 'student'
      dispatch(actions.fetchAddresses({ page, userType }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Addresses)
