import axios from 'axios'
import config from './config'
import get from 'lodash/get'

const TokenStorage = (() => {
  const localStorage = window.localStorage

  const setToken = (token) => {
    return localStorage.setItem('authToken', token)
  }

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const clearToken = () => {
    return localStorage.removeItem('authToken')
  }

  return {
    getToken,
    setToken,
    clearToken,
  }
})()

// Development only - fake login method
// Just returning hardcoded values
const draftLogin = ({ email, password }) => {
  TokenStorage.setToken(`${email}.${password}`)

  return {
    user: {
      id: 1,
      email: email,
      username: 'naruto',
    },
  }
}

export const login = async ({ email, password }) => {
  if (config.draft) {
    return draftLogin({ email, password })
  } else {
    // TODO: add proper error handling with Redux when we implement global error and notification toasts
    // We probably don't need try catch here but let the saga handle error instead.
    // For now we're just going to show a plain old alert message.
    try {
      const response = await axios.post(`${config.apiBaseUrl}/login`, {
        email,
        password,
      })

      // Store the token in local storage for subsequent queries
      const { access_token, user } = response.data
      TokenStorage.setToken(access_token)

      return { user }
    } catch (error) {
      console.error(error)
      const errorMessage = get(error, 'response.data.errors.error.description')

      if (errorMessage) {
        alert(errorMessage)
      } else {
        alert(
          'Sorry. Something went wrong during authentication. Please try again.'
        )
      }
    }
  }
}

export const logout = () => {
  TokenStorage.clearToken()
}

export const isLoggedIn = () => {
  const token = TokenStorage.getToken()

  return !!token
}
