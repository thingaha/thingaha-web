import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AddressesList from './AddressesList'
import HomeIcon from '@material-ui/icons/Home'
import { Grid } from '@material-ui/core'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import SchoolIcon from '@material-ui/icons/School'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import * as actions from '../../store/actions'
import ThingahaTabbedNav from '../common/ThingahaTabbedNav'

//TODO: Search,
//TODO: Pagination,
//TODO: call request from tab catagories

//TODO: localize
const labelAddresses = 'Addresses'
const labelStudents = 'Students'
const labelSchools = 'Schools'
const labelDonators = 'Donators'
const labelTotal = 'Total'

const useStyles = makeStyles((theme) => ({
  total: {
    'background-color': theme.palette.primary.main,
    padding: '0.4rem',
    'padding-bottom': '0.1rem',
    'border-radius': '0.3rem 0 0 0.3rem',
    color: theme.palette.common.white,
  },
  amount: {
    padding: '0.4rem',
    'padding-bottom': '0.1rem',
    border: '1px solid',
    'border-color': theme.palette.primary.main,
    'border-radius': '0 0.3rem 0.3rem 0',
    color: theme.palette.primary.main,
  },
  bgColorPrimary: {
    color: theme.palette.primary.main,
  },
}))

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
  const classes = useStyles()

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
          <div style={{ display: 'flex' }}>
            <div className={classes.total}>{labelTotal}</div>
            <div className={classes.amount}>{count}</div>
          </div>
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
            <AddressesList
              addresses={studentsAddress}
              icon={<SchoolIcon className={classes.bgColorPrimary} />}
              type={'student'}
            />,
            <AddressesList
              addresses={schoolsAddress}
              icon={<LocationCityIcon className={classes.bgColorPrimary} />}
              type={'school'}
            />,
            <AddressesList
              addresses={donatorsAddress}
              icon={<MonetizationOnIcon className={classes.bgColorPrimary} />}
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
