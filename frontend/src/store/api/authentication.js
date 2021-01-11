import PersistentAuthentication from '../../utils/persistentAuthentication'
import thingahaApiClient from '../../utils/thingahaApiClient'
import config from '../../config'

// Development only - fake login method
// Just returning hardcoded values
const draftLogin = ({ email_or_username, password }) => {
  const fakeCredentials = {
    accessToken: 'faketoken',
    currentUser: {
      email_or_username,
      name: 'Fake Login',
    },
  }
  PersistentAuthentication.save(fakeCredentials)

  return fakeCredentials
}

export const login = async ({ email_or_username, password }) => {
  if (config.useDraftServer) {
    return draftLogin({ email_or_username, password })
  } else {
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
}

export const logout = () => {
  PersistentAuthentication.reset()
}

export const getLoginState = () => {
  return PersistentAuthentication.retrieve()
}
