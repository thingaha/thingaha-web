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
import { Provider, connect } from 'react-redux'

import BaseLayout from './components/layouts/BaseLayout'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Users from './components/users/Users'
import Donations from './components/donations/Donations'
import Schools from './components/schools/Schools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Addresses from './components/addresses/Addresses'

const PrivateRouteComponent = ({
  component: Component,
  authentication,
  ...rest
}) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <BaseLayout>
      <Route
        {...rest}
        render={(props) => {
          if (!authentication.authenticated) {
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
    </BaseLayout>
  )
}

const mapStateToProps = (state) => ({
  authentication: state.authentication,
})

const mapDispatchToProps = (dispatch) => ({})

const PrivateRoute = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRouteComponent)

const AdminApp = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/" exact component={Donations} />
        <PrivateRoute path="/users" exact component={Users} />
        <PrivateRoute path="/schools" exact component={Schools} />
        <PrivateRoute path="/addresses" exact component={Addresses} />
        <Route path="*" component={NotFound} />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
