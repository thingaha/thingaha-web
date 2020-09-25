import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/global'
import { Normalize } from 'styled-normalize'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { StylesProvider, MuiThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'
import store from './store/configureStore'
import { Provider } from 'react-redux'

import BaseLayout from './components/layouts/BaseLayout'
import Sidebar from './components/layouts/Sidebar'
import ContentView from './components/layouts/ContentView'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Users from './components/users/Users'
import Donations from './components/donations/Donations'
import Schools from './components/schools/Schools'

import { isLoggedIn } from './store/api/authentication'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <BaseLayout>
      <Sidebar />
      <ContentView>
        <Route
          {...rest}
          render={(props) => {
            if (!isLoggedIn()) {
              return (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: props.location },
                  }}
                />
              )
            }

            return <Component {...props} />
          }}
        />
      </ContentView>
    </BaseLayout>
  )
}

const AdminApp = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/" exact component={Donations} />
        <PrivateRoute path="/users" exact component={Users} />
        <PrivateRoute path="/schools" exact component={Schools} />

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
              <Normalize />
              <GlobalStyles />
              <AdminApp />
            </StylesProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
