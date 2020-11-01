const PersistentAuthentication = (() => {
  const localStorage = window.localStorage

  const save = ({ accessToken, currentUser }) => {
    return localStorage.setItem(
      'authToken',
      JSON.stringify({ accessToken, currentUser })
    )
  }

  const retrieve = () => {
    try {
      const { accessToken, currentUser } =
        JSON.parse(localStorage.getItem('authToken')) || {}
      return { accessToken, currentUser }
    } catch (error) {
      console.error('Error retrieving authToken', error)
      return { accessToken: null, currentUser: null }
    }
  }

  const reset = () => {
    return localStorage.removeItem('authToken')
  }

  return {
    save,
    retrieve,
    reset,
  }
})()

export default PersistentAuthentication
