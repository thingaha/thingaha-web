import React, { useEffect } from 'react'
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

//TODO: Search,
//TODO: Pagination,
//TODO: call request from tab catagories

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

const Addresses = ({ addresses: { addresses, count }, getAllAddresses }) => {
  useEffect(() => {
    getAllAddresses()
  }, [getAllAddresses])

  const studentsAddress = addresses.filter(
    (address) => address.addressable.type === 'Student'
  )
  const schoolsAddress = addresses.filter(
    (address) => address.addressable.type === 'School'
  )
  const donatorsAddress = addresses.filter(
    (address) => address.addressable.type === 'User'
  )

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
        <Grid item justify-xs-flex-end>
          <TotalAmountDiv>
            <div className="total">{labelTotal}</div>
            <div className="amount">{count}</div>
          </TotalAmountDiv>
        </Grid>
      </Grid>

      {/* Tabs and Addresses list*/}
      <Grid item xs={12}>
        <ThingahaTabbedNav
          tabMenus={[
            <div>
              <SchoolIcon style={{ verticalAlign: 'text-top' }} />
              {labelStudents}
            </div>,
            <div>
              <LocationCityIcon style={{ verticalAlign: 'text-top' }} />
              {labelSchools}
            </div>,
            <div>
              <MonetizationOnIcon style={{ verticalAlign: 'text-top' }} />
              {labelDonators}
            </div>,
          ]}
          tabPanels={[
            <AddressList
              addresses={studentsAddress}
              icon={<SchoolIcon />}
              type={'student'}
            />,
            <AddressList
              addresses={schoolsAddress}
              icon={<LocationCityIcon />}
              type={'school'}
            />,
            <AddressList
              addresses={donatorsAddress}
              icon={<MonetizationOnIcon />}
              type={'user'}
            />,
          ]}
        />
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  addresses: state.addresses,
})

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    getAllAddresses: () => dispatch(actions.fetchAddresses()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Addresses)
