import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Sidebar from './Sidebar'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import { media } from '../../styles/variables'
import ContentView from './ContentView'
import logoUrl from '../../images/logo_transparent_vertical.png'

const drawerWidth = 200

const DrawerStyled = styled(Drawer)`
  width: ${drawerWidth}px;

  & .drawerPaper {
    width: ${drawerWidth}px;
  }
`

const RootDiv = styled.div`
  display: flex;

  & .drawer {
    ${media.tabletPortraitUp} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
    }
  }

  $ .drawerHeight {
    height: 100%;
  }

  & .menuButton {
    margin-right: 1rem;
    }
  }

  & .toolbar {
    min-height: 56px;
  }

  & .content{
    flex-grow: 1;
    width: ${drawerWidth}px;
  }

  & .titleToolbar{
    padding-right: 3rem;
  }

  & .imgLogo {
    width: 180px;
    margin: auto;
  }
`

const BaseLayout = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Grid className="drawerHeight" container direction="row">
      <Grid item xs={12}>
        <Sidebar />
      </Grid>
    </Grid>
  )

  return (
    <RootDiv>
      <CssBaseline />
      <Hidden smUp implementation="css">
        <AppBar position="fixed">
          <Toolbar className="titleToolbar">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className="menuButton"
            >
              <MenuIcon />
            </IconButton>
            <img alt="thingaha donation" src={logoUrl} className="imgLogo" />
          </Toolbar>
        </AppBar>
      </Hidden>
      <nav className="drawer" aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <DrawerStyled
            classes={{
              paper: 'drawerPaper',
            }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </DrawerStyled>
        </Hidden>
        <Hidden xsDown implementation="css">
          <DrawerStyled
            classes={{
              paper: 'drawerPaper',
            }}
            variant="permanent"
            open
          >
            {drawer}
          </DrawerStyled>
        </Hidden>
      </nav>
      <main className="content">
        <Hidden smUp implementation="css">
          <div className="toolbar" />
        </Hidden>
        <ContentView>{props.children}</ContentView>
      </main>
    </RootDiv>
  )
}

export default BaseLayout
