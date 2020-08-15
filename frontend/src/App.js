import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/global'
import { Normalize } from 'styled-normalize'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { StylesProvider, MuiThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'
import store from './store/configureStore'
import { Provider } from 'react-redux'

import BaseLayout from './components/layouts/BaseLayout'
import Sidebar from './components/layouts/Sidebar'
import ContentView from './components/layouts/ContentView'
import Home from './components/home'
import Users from './components/users/Users'
import Donations from './components/donations/Donations'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
              <Normalize />
              <GlobalStyles />
              <Router>
                <BaseLayout>
                  <Sidebar />
                  <ContentView>
                    <Switch>
                      <Route path="/" exact component={Donations} />
                      <Route path="/users" exact component={Users} />
                    </Switch>
                  </ContentView>
                </BaseLayout>
              </Router>
            </StylesProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
