// Fetching monthly donations from server
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

export const GET_ALL_DONATIONS = 'DONATIONS/GET_ALL_DONATIONS'
export const GET_ALL_DONATIONS_SUCCESS = 'DONATIONS/GET_ALL_DONATIONS_SUCCESS'
export const GET_ALL_DONATIONS_FAILURE = 'DONATIONS/GET_ALL_DONATIONS_FAILURE'

export const SUBMIT_NEW_DONATION_FORM = 'DONATIONS/SUBMIT_NEW_DONATION_FORM'
export const SUBMIT_NEW_DONATION_FORM_SUCCESS =
  'DONATIONS/SUBMIT_NEW_DONATION_FORM_SUCCESS'
export const SUBMIT_NEW_DONATION_FORM_FAILURE =
  'DONATIONS/SUBMIT_NEW_DONATION_FORM_FAILURE'
export const SUBMIT_EDIT_DONATION_FORM = 'DONATIONS/SUBMIT_EDIT_DONATION_FORM'
export const SUBMIT_EDIT_DONATION_FORM_SUCCESS =
  'DONATIONS/SUBMIT_EDIT_DONATION_FORM_SUCCESS'
export const SUBMIT_EDIT_DONATION_FORM_FAILURE =
  'DONATIONS/SUBMIT_EDIT_DONATION_FORM_FAILURE'

export const GET_DONATION_INFO = 'DONATIONS/GET_DONATION_INFO'
export const GET_DONATION_INFO_SUCCESS = 'DONATIONS/GET_DONATION_INFO_SUCCESS'
export const GET_DONATION_INFO_FAILURE = 'DONATIONS/GET_DONATION_INFO_FAILURE'

export const fetchDonations = ({ page } = { page: 1 }) => {
  return {
    type: GET_ALL_DONATIONS,
    page,
  }
}

export const getDonationsForMonth = ({ year, month }) => {
  return {
    type: GET_DONATIONS_FOR_MONTH,
    year: year,
    month: month,
  }
}

export const fetchDonation = (donationId) => {
  return {
    type: GET_DONATION_INFO,
    donationId: donationId,
  }
}

export const updateDonationStatus = (id, status) => {
  return {
    type: UPDATE_DONATION_STATUS,
    id: id,
    status: status,
  }
}

export const submitNewDonationForm = (formValues) => {
  return {
    type: SUBMIT_NEW_DONATION_FORM,
    donation: formValues,
  }
}
export const submitEditDonationForm = (formValues) => {
  return {
    type: SUBMIT_EDIT_DONATION_FORM,
    donation: formValues,
  }
}
