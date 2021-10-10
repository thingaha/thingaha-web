import thingahaApiClient from '../../utils/thingahaApiClient'
import omitBy from 'lodash/omitBy'

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

export const getDonationsForMonth = async ({ year, month, keyword, page }) => {
  page = page || 1
  let queryParams = omitBy(
    { year, month, keyword },
    (value) => value === '' || value === undefined || value === null
  )

  const { data } = await thingahaApiClient.get('/donations', {
    params: queryParams,
  })

  return {
    data: {
      donations: data.donations,
      total_count: data.total_count,
      total_pages: data.pages,
    },
  }
}

export const updateDonationStatus = async (id, status) => {
  const { data } = await thingahaApiClient.patch(`/donations/${id}`, {
    status,
  })

  return {
    data,
  }
}

const transformTypesForDonation = (donationFormValues) => ({
  id: Number(donationFormValues.id),
  attendance_id: Number(donationFormValues.attendance_id),
  jpy_amount: Number(donationFormValues.jpy_amount),
  mmk_amount: Number(donationFormValues.mmk_amount),
  month: String(donationFormValues.month),
  user_id: Number(donationFormValues.user_id),
  year: Number(donationFormValues.year),
})

export const fetchDonation = async (donationId) => {
  const { data } = await thingahaApiClient.get(`/donations/${donationId}`)
  return {
    data: {
      donation: data.donation,
    },
  }
}

export const createDonation = async (donationFormValues) => {
  const { data } = await thingahaApiClient.post(
    '/donations',
    transformTypesForDonation(donationFormValues)
  )

  return {
    donation: data.donation,
  }
}

export const editDonation = async (donationFormValues) => {
  const { data } = await thingahaApiClient.put(
    `/donations/${donationFormValues.id}`,
    transformTypesForDonation(donationFormValues)
  )

  return {
    donation: data.donation,
  }
}
