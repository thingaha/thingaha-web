
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


export default TokenStorage
