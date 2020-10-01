import TokenStorage from '../../utils/tokenStorage'
import get from 'lodash/get'
import thingahaApiClient from '../../utils/thingahaApiClient'
import config from '../../config'

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
  if (config.useDraftServer) {
    return draftLogin({ email, password })
  } else {
    // TODO: add proper error handling with Redux when we implement global error and notification toasts
    // We probably don't need try catch here but let the saga handle error instead.
    // For now we're just going to show a plain old alert message.
    try {
      const response = await thingahaApiClient.post('/login', {
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
