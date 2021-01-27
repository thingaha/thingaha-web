import {
  GET_TRANSFER_INFO_SUCCESS,
  GET_TRANSFER_INFO_FAILURE,
  SUBMIT_TRANSFER_FORM_SUCCESS,
  SUBMIT_TRANSFER_FORM_FAILURE,
  GET_ALL_TRANSFERS_SUCCESS,
  GET_ALL_TRANSFERS_FAILURE,
  SUBMIT_EDIT_TRANSFER_FORM_SUCCESS,
  SUBMIT_EDIT_TRANSFER_FORM_FAILURE,
} from '../actions/transfers'

import {
  immutableAppendOrUpdate,
  normalizeRecordsById,
} from '../../utils/reducerHelpers'
export default (state = { transfers: {} }, action) => {
  switch (action.type) {
    case GET_TRANSFER_INFO_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case GET_ALL_TRANSFERS_SUCCESS:
      return {
        ...state,
        transfers: normalizeRecordsById(action.transfers),
        totalCount: action.totalCount,
        totalPages: action.totalPages,
      }
    case GET_ALL_TRANSFERS_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case SUBMIT_TRANSFER_FORM_SUCCESS:
      console.log('reducer transfer', state, action)
      return {
        ...state,
        transfers: immutableAppendOrUpdate(state.transfers, action.transfer),
      }
    case SUBMIT_TRANSFER_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case GET_TRANSFER_INFO_SUCCESS:
      return {
        ...state,
        transfers: immutableAppendOrUpdate(state.transfers, action.transfer),
      }
    case SUBMIT_EDIT_TRANSFER_FORM_SUCCESS:
      return {
        ...state,
        transfers: immutableAppendOrUpdate(state.transfers, action.transfer),
      }
    case SUBMIT_EDIT_TRANSFER_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}
