import {
  GET_ALL_DONATIONS_SUCCESS,
  GET_ALL_DONATIONS_FAILURE,
  GET_DONATIONS_FOR_MONTH_SUCCESS,
  GET_DONATIONS_FOR_MONTH_FAILURE,
  GET_DONATION_INFO_SUCCESS,
  GET_DONATION_INFO_FAILURE,
  UPDATE_DONATION_STATUS_SUCCESS,
  UPDATE_DONATION_STATUS_FAILURE,
  SUBMIT_NEW_DONATION_FORM_SUCCESS,
  SUBMIT_NEW_DONATION_FORM_FAILURE,
  SUBMIT_EDIT_DONATION_FORM_SUCCESS,
  SUBMIT_EDIT_DONATION_FORM_FAILURE,
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

    case GET_DONATION_INFO_SUCCESS:
      return {
        ...state,
        donations: immutableAppendOrUpdate(state.donations, action.donation),
      }

    case GET_DONATION_INFO_FAILURE:
      return {
        ...state,
        error: action.error,
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

    case SUBMIT_NEW_DONATION_FORM_SUCCESS:
      return {
        ...state,
        donations: immutableAppendOrUpdate(state.donations, action.donation),
      }

    case SUBMIT_NEW_DONATION_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }

    case SUBMIT_EDIT_DONATION_FORM_SUCCESS:
      return {
        ...state,
        donations: immutableAppendOrUpdate(state.donations, action.donation),
      }

    case SUBMIT_EDIT_DONATION_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }

    default:
      return state
  }
}
