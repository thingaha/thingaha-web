import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchAllDonations = async ({ page }) => {
  const { data } = await thingahaApiClient.get('/donations', {
    params: { page },
  })

  return {
    data: {
      donations: data.donations,
      total_count: data.total_count,
      total_pages: data.pages,
    },
  }
}

export const getDonationsForMonth = async (year, month) => {
  return thingahaApiClient.get('/donations')
}

export const updateDonationStatus = async (id, status) => {
  // don thing for now
  return null
}
