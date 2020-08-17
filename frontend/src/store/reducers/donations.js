import {
  GET_DONATIONS_FOR_MONTH_SUCCESS,
  GET_DONATIONS_FOR_MONTH_FAILURE,
  UPDATE_DONATION_STATUS_SUCCESS,
  UPDATE_DONATION_STATUS_FAILURE,
} from '../actions/donations'

export default (state = { content: {}, errors: [] }, action) => {
  switch (action.type) {
    case GET_DONATIONS_FOR_MONTH_SUCCESS:
      const newDonations = {}
      action.donations.map((donation) => (newDonations[donation.id] = donation))
      return { ...state, content: newDonations }
    case GET_DONATIONS_FOR_MONTH_FAILURE:
      // TODO handle error
      return {
        ...state,
        errors: [...state.errors, action.error],
      }
    case UPDATE_DONATION_STATUS_SUCCESS:
      const donation = state.content[action.id]
      const updatedDonation = { ...donation, status: action.status }

      return {
        ...state,
        content: { ...state.content, [updatedDonation.id]: updatedDonation },
      }
    case UPDATE_DONATION_STATUS_FAILURE:
      // TODO handle error
      return {
        ...state,
        errors: [...state.errors, action.error],
      }
    default:
      return state
  }
}
