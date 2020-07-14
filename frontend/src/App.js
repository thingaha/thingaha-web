import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/global'
import { Normalize } from 'styled-normalize'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { StylesProvider } from '@material-ui/core/styles'
import theme from './styles/theme'

import BaseLayout from './components/layouts/BaseLayout'
import Sidebar from './components/layouts/Sidebar'
import ContentView from './components/layouts/ContentView'
import Home from './components/home'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <Normalize />
          <GlobalStyles />
          <Router>
            <BaseLayout>
              <Sidebar />
              <ContentView>
                <Switch>
                  <Route path="/" component={Home} />
                </Switch>
              </ContentView>
            </BaseLayout>
          </Router>
        </StylesProvider>
      </ThemeProvider>
    )
  }
}

export default App
