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
`

const StyledMenuContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  margin-top: 2rem;
`

const StyledLogoContainer = styled(Grid)`
  height: 80px;
`

const StyledAvatar = styled(Avatar)`
  height: 100px;
  width: 100%;
  margin: 0 auto 1rem auto;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
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

const NavMenu = () => (
  <StyledMenuContainer>
    <StyledNavLink exact to={'/'}>
      <AirplayIcon className="nav-icon" />
      Dashboard
    </StyledNavLink>
    <StyledNavLink to={'/donations'}>
      <MonetizationOnIcon className="nav-icon" />
      Donations
    </StyledNavLink>
    <StyledNavLink to={'/users'}>
      <PeopleIcon className="nav-icon" />
      Users
    </StyledNavLink>
    <StyledNavLink to={'/students'}>
      <SchoolIcon className="nav-icon" />
      Students
    </StyledNavLink>
    <StyledNavLink to={'/schools'}>
      <LocationCityIcon className="nav-icon" />
      Schools
    </StyledNavLink>
    <StyledNavLink to={'/attendances'}>
      <HowToRegIcon className="nav-icon" />
      Attendances
    </StyledNavLink>
    <StyledNavLink to={'/extrafunds'}>
      <LocalAtmIcon className="nav-icon" />
      Extra Funds
    </StyledNavLink>
    <StyledNavLink to={'/transfers'}>
      <SyncAltIcon className="nav-icon" />
      Transfers
    </StyledNavLink>
    <StyledNavLink to={'/addresses'}>
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
  margin-top: 2rem;

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

const CurrentUserInformation = ({ authentication, logOutUser }) => {
  const userEmail = get(authentication, 'currentUser.email')
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

  & .nav-icon {
    color: white;
    cursor: pointer;
  }
`

const AccountActions = ({ logOutUser }) => {
  return (
    <StyledAccountActions>
      <div className="settings-link">
        <NavLink to={'/account'}>
          <SettingsIcon className="nav-icon" />
        </NavLink>
      </div>
      <div className="logout-link">
        <ExitToAppIcon className="nav-icon" onClick={logOutUser} />
      </div>
    </StyledAccountActions>
  )
}

const Sidebar = ({ authentication, logOutUser }) => {
  return (
    <SidebarContent>
      <Grid container direction="row">
        <Grid item xs={1}></Grid>
        <Grid item xs={10} container justify="space-between">
          <StyledLogoContainer
            container
            direction="row"
            alignItems="flex-start"
            justify="center"
          >
            <Grid item container alignItems="center" justify="center" xs={12}>
              <StyledAvatar alt="Thingaha Logo" src={logoUrl} />
            </Grid>
          </StyledLogoContainer>
          <StyledLogoContainer
            container
            direction="row"
            alignItems="flex-start"
            justify="center"
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
          </StyledLogoContainer>
          <NavMenu />
          <StyledLogoContainer
            container
            direction="row"
            alignItems="flex-end"
            justify="center"
          >
            <Grid item container alignItems="center" justify="center" xs={12}>
              <AccountActions logOutUser={logOutUser} />
            </Grid>
          </StyledLogoContainer>
        </Grid>
        <Grid item xs={1} />
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
