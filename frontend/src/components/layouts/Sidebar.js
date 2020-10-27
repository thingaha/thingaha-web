import React from 'react'
import styled from 'styled-components'
import { Grid, Paper } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
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
import HomeIcon from '@material-ui/icons/Home'

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

const Sidebar = (props) => {
  return (
    <SidebarContent>
      <Grid container direction="row">
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
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
          <NavMenu />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </SidebarContent>
  )
}

export default Sidebar
