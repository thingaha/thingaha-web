import React from 'react'
import styled from 'styled-components'
import { Grid, Paper } from '@material-ui/core'
import ListSubheader from '@material-ui/core/ListSubheader'
import Avatar from '@material-ui/core/Avatar'
import SchoolIcon from '@material-ui/icons/School'
import PeopleIcon from '@material-ui/icons/People'
import WcIcon from '@material-ui/icons/Wc'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { NavLink } from 'react-router-dom'
import logoUrl from '../../logo.svg'

const SidebarContent = styled(Paper)`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.palette.primary.main};
`

const StyledMenuContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
`

const StyledLogoContainer = styled(Grid)`
  height: 80px;
`

const StyledAvatar = styled(Avatar)`
  height: 60px;
  width: 80px;
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
      <MonetizationOnIcon className="nav-icon" />
      Donations
    </StyledNavLink>
    <StyledNavLink to={'/users'}>
      <PeopleIcon className="nav-icon" />
      Users
    </StyledNavLink>
    <StyledNavLink to={'/students'}>
      <WcIcon className="nav-icon" />
      Students
    </StyledNavLink>
    <StyledNavLink to={'/schools'}>
      <SchoolIcon className="nav-icon" />
      Schools
    </StyledNavLink>
  </StyledMenuContainer>
)

const Sidebar = (props) => {
  return (
    <Grid
      container
      item
      xs={2}
      direction="column"
      alignItems="center"
      justify="flex-start"
    >
      <SidebarContent>
        <Grid container row>
          <Grid item xs="2"></Grid>
          <Grid item xs="8">
            <ListSubheader>
              <StyledLogoContainer
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <Grid item alignItems="center" justify="center" xs="5">
                  <StyledAvatar alt="Logo" src={logoUrl} />
                </Grid>
                <Grid item xs="7" alignItems="center">
                  Thingaha
                </Grid>
              </StyledLogoContainer>
            </ListSubheader>
            <NavMenu />
          </Grid>
          <Grid item xs="2" />
        </Grid>
      </SidebarContent>
    </Grid>
  )
}

export default Sidebar
