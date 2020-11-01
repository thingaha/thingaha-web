import TokenStorage from '../../utils/tokenStorage'
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
    const { data } = await thingahaApiClient.post('/login', {
      email,
      password,
    })

    // Store the token in local storage for subsequent queries
    const { access_token, user } = data
    TokenStorage.setToken(access_token)

    return { user }
  }
}

export const logout = () => {
  TokenStorage.clearToken()
}

export const isLoggedIn = () => {
  const token = TokenStorage.getToken()

  return !!token
}
