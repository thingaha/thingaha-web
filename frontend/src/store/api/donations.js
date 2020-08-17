import axios from 'axios'
import config from './config'

export const getDonationsForMonth = async (year, month) => {
  return axios.get(`${config.apiBaseUrl}/donations`)
}

export const updateDonationStatus = async (id, status) => {
  // don thing for now
  return null
}
