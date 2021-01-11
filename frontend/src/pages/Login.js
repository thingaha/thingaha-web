import React, { useState } from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import * as actions from '../store/actions'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Button from '@material-ui/core/Button'
import logoUrl from '../images/logo_transparent.png'
import { Redirect } from 'react-router-dom'
import { media } from '../styles/variables'

const CenteredContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
const LoginPanel = styled(Paper)`
  padding: 2rem;
  width: 100%;
  height: 100%;

  ${media.tabletPortraitUp} {
    max-width: 500px;
    min-width: 300px;
    height: auto;
  }
`

const StyledLogoAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin: 1rem auto;
  background-color: ${({ theme }) => theme.palette.primary.light};

  img {
    width: 100%;
  }
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 12rem;
  margin-top: 2rem;
`

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin-bottom: 1rem;
`

const Login = ({
  values,
  touched,
  errors,
  handleChange,
  handleSubmit,
  logInUser,
  error,
  authentication,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  if (authentication && authentication.accessToken) {
    return <Redirect to="/" />
  }

  return (
    <CenteredContainer>
      <LoginPanel>
        <StyledLogoAvatar alt="Thingaha Logo">
          <img src={logoUrl} alt="Thingha Logo" />
        </StyledLogoAvatar>
        <Typography variant="h1" align="center">
          Login
        </Typography>
        <form>
          <FormContainer>
            <StyledFormControl>
              <TextField
                id="email_or_username"
                name="email_or_username"
                type="email_or_username"
                placeholder="Enter Your Email Or User Name"
                label="Email Or User Name"
                onChange={handleChange}
                value={values.email_or_username}
                variant="filled"
                error={!!errors.email_or_username}
              />
            </StyledFormControl>
            <StyledFormControl>
              <TextField
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                value={values.password}
                error={!!errors.password}
                onChange={handleChange}
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </StyledFormControl>
          </FormContainer>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </form>
      </LoginPanel>
    </CenteredContainer>
  )
}

const mapStateToProps = (state) => ({
  error: state.error,
  authentication: state.authentication,
})

const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: ({ email_or_username, password }) =>
      dispatch(actions.logInUser({ email_or_username, password })),
  }
}

const FormikLoginForm = withFormik({
  mapPropsToValues: () => ({
    email_or_username: '',
    password: '',
  }),

  // Custom sync validation
  validate: ({ email_or_username, password }) => {
    const errors = {}

    if (!email_or_username) {
      errors.email_or_username = 'Required'
    }

    if (!password) {
      errors.password = 'Required'
    }

    return errors
  },

  handleSubmit: ({ email_or_username, password }, { props: { logInUser } }) => {
    logInUser({ email_or_username, password })
  },

  displayName: 'Login',
})(Login)

export default connect(mapStateToProps, mapDispatchToProps)(FormikLoginForm)
