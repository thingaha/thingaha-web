import {
  GET_ALL_DONATIONS_SUCCESS,
  GET_ALL_DONATIONS_FAILURE,
  GET_DONATIONS_FOR_MONTH_SUCCESS,
  GET_DONATIONS_FOR_MONTH_FAILURE,
  UPDATE_DONATION_STATUS_SUCCESS,
  UPDATE_DONATION_STATUS_FAILURE,
} from '../actions/donations'
import {
  immutableAppendOrUpdate,
  normalizeRecordsById,
} from '../../utils/reducerHelpers'

export default (state = { donations: {}, errors: [] }, action) => {
  switch (action.type) {
    case GET_ALL_DONATIONS_SUCCESS:
      return {
        ...state,
        donations: normalizeRecordsById(action.donations),
        totalCount: action.totalCount,
        totalPages: action.totalPages,
      }
    case GET_ALL_DONATIONS_FAILURE:
      return {
        ...state,
        error: action.error,
      }

    case GET_DONATIONS_FOR_MONTH_SUCCESS:
      return {
        ...state,
        donations: normalizeRecordsById(action.donations),
        totalCount: action.totalCount,
        totalPages: action.totalPages,
      }

    case GET_DONATIONS_FOR_MONTH_FAILURE:
      // TODO handle error
      return {
        ...state,
        errors: [...state.errors, action.error],
      }

    case UPDATE_DONATION_STATUS_SUCCESS:
      const donation = state.donations[action.id]
      const updatedDonation = { ...donation, status: action.status }

      return {
        ...state,
        donations: {
          ...state.donations,
          [updatedDonation.id]: updatedDonation,
        },
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
