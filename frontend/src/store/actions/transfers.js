export const GET_TRANSFER_INFO = 'TRANSFER/GET_TRANSFER_INFO'
export const GET_TRANSFER_INFO_SUCCESS = 'TRANSFER/GET_TRANSFER_INFO_SUCCESS'
export const GET_TRANSFER_INFO_FAILURE = 'TRANSFER/GET_TRANSFER_INFO_FAILURE'

export const GET_ALL_TRANSFERS = 'TRANSFER/GET_ALL'
export const GET_ALL_TRANSFERS_SUCCESS = 'TRANSFER/GET_ALL_SUCCESS'
export const GET_ALL_TRANSFERS_FAILURE = 'TRANSFER/GET_ALL_FAILURE'
export const SUBMIT_TRANSFER_FORM = 'TRANSFER/SUBMIT_TRANSFER_FORM'
export const SUBMIT_TRANSFER_FORM_SUCCESS =
  'TRANSFER/SUBMIT_TRANSFER_FORM_SUCCESS'
export const SUBMIT_TRANSFER_FORM_FAILURE =
  'TRANSFER/SUBMIT_TRANSFER_FORM_FAILURE'
export const SUBMIT_EDIT_TRANSFER_FORM = 'TRANSFER/SUBMIT_EDIT_TRANSFER_FORM'
export const SUBMIT_EDIT_TRANSFER_FORM_SUCCESS =
  'TRANSFERS/SUBMIT_EDIT_TRANSFER_FORM_SUCCESS'
export const SUBMIT_EDIT_TRANSFER_FORM_FAILURE =
  'TRANSFERS/SUBMIT_EDIT_TRANSFER_FORM_FAILURE'

export const fetchTransfer = (transferId) => {
  return {
    type: GET_TRANSFER_INFO,
    transferId: transferId,
  }
}

export const fetchTransfers = ({ page }) => {
  return {
    type: GET_ALL_TRANSFERS,
    page,
  }
}

export const submitTransferForm = (formValues) => {
  return {
    type: SUBMIT_TRANSFER_FORM,
    transfer: formValues,
  }
}

export const submitEditTransferForm = (formValues) => {
  return {
    type: SUBMIT_EDIT_TRANSFER_FORM,
    transfer: formValues,
  }
}
