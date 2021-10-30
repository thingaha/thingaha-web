import PersistentAuthentication from '../../utils/persistentAuthentication'
import thingahaApiClient from '../../utils/thingahaApiClient'

export const login = async ({ email_or_username, password }) => {
  const { data } = await thingahaApiClient.post('/login', {
    email_or_username,
    password,
  })

  // Store the token in local storage for subsequent queries
  const { access_token, user } = data
  PersistentAuthentication.save({
    accessToken: access_token,
    currentUser: user,
  })

  return {
    accessToken: access_token,
    currentUser: user,
  }
}

export const logout = () => {
  PersistentAuthentication.reset()
}

export const getLoginState = () => {
  return PersistentAuthentication.retrieve()
}
