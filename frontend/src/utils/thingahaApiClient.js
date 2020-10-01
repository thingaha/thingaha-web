import axios from 'axios'
import config from '../config'
import TokenStorage from './tokenStorage'

const draftServerUrl = 'http://localhost:9000'
const thingahaServerUrl = 'http://localhost:5000/api/v1'
const apiBaseUrl = config.useDraftServer ? draftServerUrl : thingahaServerUrl

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = TokenStorage.getToken()

    console.log("Running axios interceptor", authToken)

    config.headers = {
      'Authorization': `Bearer ${authToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*',
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
);

export default axiosInstance
