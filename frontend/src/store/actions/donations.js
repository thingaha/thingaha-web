// Fetching all donations from server
export const GET_DONATIONS_FOR_MONTH = 'DONATIONS/GET_DONATIONS_FOR_MONTH'
export const GET_DONATIONS_FOR_MONTH_SUCCESS =
  'DONATIONS/GET_DONATIONS_FOR_MONTH_SUCCESS'
export const GET_DONATIONS_FOR_MONTH_FAILURE =
  'DONATIONS/GET_DONATIONS_FOR_MONTH_FAILURE'

// Updating a donation status to server
export const UPDATE_DONATION_STATUS = 'DONATIONS/UPDATE_DONATION_STATUS'
export const UPDATE_DONATION_STATUS_SUCCESS =
  'DONATIONS/UPDATE_DONATION_STATUS_SUCCESS'
export const UPDATE_DONATION_STATUS_FAILURE =
  'DONATIONS/UPDATE_DONATION_STATUS_FAILURE'

export const getDonationsForMonth = (year, month) => {
  return {
    type: GET_DONATIONS_FOR_MONTH,
    year: year,
    month: month,
  }
}

export const updateDonationStatus = (id, status) => {
  return {
    type: UPDATE_DONATION_STATUS,
    id: id,
    status: status,
  }
}
