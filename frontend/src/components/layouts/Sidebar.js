import React from 'react'
import styled from 'styled-components'
import { Grid, Paper } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Avatar from '@material-ui/core/Avatar'
import SchoolIcon from '@material-ui/icons/School'
import PeopleIcon from '@material-ui/icons/People'
import WcIcon from '@material-ui/icons/Wc'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { Link } from 'react-router-dom'
import logoUrl from '../../logo.svg'

const SidebarContent = styled(Paper)`
  width: 100%;
  height: 100vh;
`

const StyledLogoContainer = styled(Grid)`
  height: 80px;
`

const StyledAvatar = styled(Avatar)`
  height: 60px;
  width: 80px;
`

export const NavMenu = () => (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MonetizationOnIcon />
      </ListItemIcon>
      <Link to={`/`} activeClassName="active">
        <ListItemText primary="Donations" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to={'/users'}>
        <ListItemText primary="Users" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <WcIcon />
      </ListItemIcon>
      <Link to={`/`}>
        <ListItemText primary="Students" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <Link to={`/`}>
        <ListItemText primary="Schools" />
      </Link>
    </ListItem>
  </div>
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
