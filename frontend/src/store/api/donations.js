import axios from 'axios'
import config from './config'

export const getDonationsForMonth = async (yser, month) => {
  return axios.get(`${config.apiBaseUrl}/donations`)
}
