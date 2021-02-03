import {
  GET_ALL_EXTRAFUNDS_SUCCESS,
  GET_ALL_EXTRAFUNDS_FAILURE,
  SUBMIT_NEW_EXTRAFUND_FORM_SUCCESS,
  SUBMIT_NEW_EXTRAFUND_FORM_FAILURE,
  SUBMIT_EDIT_EXTRAFUND_FORM_SUCCESS,
  SUBMIT_EDIT_EXTRAFUND_FORM_FAILURE,
} from '../actions/extraFunds'

import {
  normalizeRecordsById,
  immutableAppendOrUpdate,
} from '../../utils/reducerHelpers'

export default (state = { extraFunds: [], newTransfers: [] }, action) => {
  switch (action.type) {
    case GET_ALL_EXTRAFUNDS_SUCCESS:
      return {
        ...state,
        extraFunds: normalizeRecordsById([...action.extraFunds]),
        newTransfers: action.newTransfers,
      }
    case GET_ALL_EXTRAFUNDS_FAILURE:
      return {
        ...state,
        error: action.error,
      }

    case SUBMIT_NEW_EXTRAFUND_FORM_SUCCESS:
      return {
        ...state,
        extraFunds: immutableAppendOrUpdate(state.extraFunds, action.extraFund),
        newTransfers: state.newTransfers.filter(
          (transfer) => transfer.id !== action.extraFund.transfer.id
        ),
      }
    case SUBMIT_NEW_EXTRAFUND_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case SUBMIT_EDIT_EXTRAFUND_FORM_SUCCESS:
      return {
        ...state,
        extraFunds: immutableAppendOrUpdate(state.extraFunds, action.extraFund),
      }
    case SUBMIT_EDIT_EXTRAFUND_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}
