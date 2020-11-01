import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { Grid, Paper } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import SchoolIcon from '@material-ui/icons/School'
import PeopleIcon from '@material-ui/icons/People'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { NavLink } from 'react-router-dom'
import logoUrl from '../../images/logo_transparent.png'
import AirplayIcon from '@material-ui/icons/Airplay'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import HowToRegIcon from '@material-ui/icons/HowToReg'
import LocalAtmIcon from '@material-ui/icons/LocalAtm'
import SyncAltIcon from '@material-ui/icons/SyncAlt'
import SettingsIcon from '@material-ui/icons/Settings'
import HomeIcon from '@material-ui/icons/Home'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import * as actions from '../../store/actions'

const SidebarContent = styled(Paper)`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.palette.primary.main};
  border-radius: unset;

  & .vertical-layout {
    height: 100%;

    & .logo-container {
      height: auto;
    }

    & .logo-image {
      height: 100px;
      width: 100%;
    }

    & .user-profile-container {
      margin-top: 1rem;
    }

    & .account-menus-container {
      margin-top: auto;
      margin-bottom: 0.5rem;
      padding: 0 0.5rem;
    }
  }
`

const StyledMenuContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  margin-top: 1rem;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.palette.common.white};
  padding: 0.5rem 1rem;

  &:hover {
    background-color: ${(props) => props.theme.palette.primary.light};
    border-radius: 4px;
  }

  &.active {
    color: ${(props) => props.theme.palette.primary.contrastText};
    background-color: ${(props) => props.theme.palette.primary.dark};
    border-radius: 4px;
  }

  & .nav-icon {
    margin-right: 1rem;
  }
`

const NavMenu = ({ closeMobileDrawer }) => (
  <StyledMenuContainer>
    <StyledNavLink onClick={closeMobileDrawer} exact to={'/'}>
      <AirplayIcon className="nav-icon" />
      Dashboard
    </StyledNavLink>
    <StyledNavLink onClick={closeMobileDrawer} to={'/donations'}>
      <MonetizationOnIcon className="nav-icon" />
      Donations
    </StyledNavLink>
    <StyledNavLink onClick={closeMobileDrawer} to={'/users'}>
      <PeopleIcon className="nav-icon" />
      Users
    </StyledNavLink>
    <StyledNavLink onClick={closeMobileDrawer} to={'/students'}>
      <SchoolIcon className="nav-icon" />
      Students
    </StyledNavLink>
    <StyledNavLink onClick={closeMobileDrawer} to={'/schools'}>
      <LocationCityIcon className="nav-icon" />
      Schools
    </StyledNavLink>
    <StyledNavLink onClick={closeMobileDrawer} to={'/attendances'}>
      <HowToRegIcon className="nav-icon" />
      Attendances
    </StyledNavLink>
    <StyledNavLink onClick={closeMobileDrawer} to={'/extrafunds'}>
      <LocalAtmIcon className="nav-icon" />
      Extra Funds
    </StyledNavLink>
    <StyledNavLink onClick={closeMobileDrawer} to={'/transfers'}>
      <SyncAltIcon className="nav-icon" />
      Transfers
    </StyledNavLink>
    <StyledNavLink onClick={closeMobileDrawer} to={'/addresses'}>
      <HomeIcon className="nav-icon" />
      Addresses
    </StyledNavLink>
  </StyledMenuContainer>
)

const StyledUserDetailContainer = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & .user-detail {
    color: white;
    word-wrap: normal;
  }

  & .logout-link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
    cursor: pointer;

    & .icon {
      margin-left: 1rem;
    }
  }
`

const CurrentUserInformation = ({ authentication }) => {
  const userEmail = get(authentication, ['currentUser', 'email'], null)
  if (!userEmail) {
    return <StyledUserDetailContainer>Not Logged In</StyledUserDetailContainer>
  }

  return (
    <StyledUserDetailContainer>
      <Typography variant="body1" className="user-detail">
        {userEmail}
      </Typography>
    </StyledUserDetailContainer>
  )
}

const StyledAccountActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: auto;

  & .nav-icon {
    color: white;
    cursor: pointer;
  }
`

const AccountActions = ({ logOutUser, closeMobileDrawer }) => {
  return (
    <StyledAccountActions>
      <div className="settings-link">
        <NavLink to={'/account'} onClick={closeMobileDrawer}>
          <SettingsIcon className="nav-icon" />
        </NavLink>
      </div>
      <div className="logout-link">
        <ExitToAppIcon
          className="nav-icon"
          onClick={logOutUser}
          onClick={closeMobileDrawer}
        />
      </div>
    </StyledAccountActions>
  )
}

const Sidebar = ({ authentication, logOutUser, closeMobileDrawer }) => {
  return (
    <SidebarContent>
      <Grid
        item
        xs={12}
        container
        justify="flex-start"
        direction="column"
        className="vertical-layout"
      >
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="center"
          className="logo-container"
        >
          <Grid item container alignItems="center" justify="center" xs={12}>
            <Avatar alt="Thingaha Logo" src={logoUrl} className="logo-image" />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="center"
          className="user-profile-container"
        >
          <Grid
            item
            container
            alignItems="center"
            justify="center"
            xs={12}
            className="user-profile"
          >
            <CurrentUserInformation
              authentication={authentication}
              logOutUser={logOutUser}
            />
          </Grid>
        </Grid>
        <NavMenu closeMobileDrawer={closeMobileDrawer} />
        <Grid
          container
          direction="row"
          alignItems="flex-end"
          justify="center"
          className="account-menus-container"
        >
          <Grid item container alignItems="center" justify="center" xs={12}>
            <AccountActions
              logOutUser={logOutUser}
              closeMobileDrawer={closeMobileDrawer}
            />
          </Grid>
        </Grid>
      </Grid>
    </SidebarContent>
  )
}
const mapStateToProps = (state) => ({
  authentication: state.authentication,
})

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(actions.logOutUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
