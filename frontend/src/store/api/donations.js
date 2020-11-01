import thingahaApiClient from '../../utils/thingahaApiClient'

export const getDonationsForMonth = async (year, month) => {
  return thingahaApiClient.get('/donations')
}

export const updateDonationStatus = async (id, status) => {
  // don thing for now
  return null
}
