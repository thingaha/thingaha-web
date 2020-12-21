import {
  SUBMIT_TRANSFER_FORM_SUCCESS,
  SUBMIT_TRANSFER_FORM_FAILURE,
  GET_ALL_TRANSFERS_SUCCESS,
  GET_ALL_TRANSFERS_FAILURE,
  SUBMIT_EDIT_TRANSFER_FORM_SUCCESS,
  SUBMIT_EDIT_TRANSFER_FORM_FAILURE,
} from '../actions/transfers'

export default (state = { transfers: [] }, action) => {
  switch (action.type) {
    case GET_ALL_TRANSFERS_SUCCESS:
      return {
        ...state,
        transfers: [...action.transfers],
      }
    case GET_ALL_TRANSFERS_FAILURE:
      // TODO handle error
      return {
        ...state,
        error: action.error,
      }
    case SUBMIT_TRANSFER_FORM_SUCCESS:
      const newTransfer = action.transfer

      return {
        ...state,
        transfers: [...state.transfers, newTransfer],
      }
    case SUBMIT_TRANSFER_FORM_FAILURE:
      // TODO handle error
      return {
        ...state,
        error: action.error,
      }
    case SUBMIT_EDIT_TRANSFER_FORM_SUCCESS:
      return {
        ...state,
        transfers: [...action.transfers],
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

//edittransfer
