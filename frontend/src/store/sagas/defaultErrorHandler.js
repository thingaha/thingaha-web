import { toast } from 'react-toastify'
import { put } from 'redux-saga/effects'
import { AUTH_FAILURE } from '../actions/authentication'

export default function* defaultErrorHandler(error, errorActionType) {
  // Default error handler is supposed to be called with custom thingaha Api Response data structure as defined in thingahaApiClient
  const { errors: serverErrorMessages, status, httpErrorMessage } = error

  // When jwt is expired, server returns 401, when jwt is invalid server return 422
  if (status && (status === 401 || status === 422)) {
    toast.error('Login Expired. Please try logging in again.')
    return yield put({ type: AUTH_FAILURE, errorResponse: serverErrorMessages })
  }

  if (serverErrorMessages) {
    serverErrorMessages.map((error) => {
      return toast.error(error.description)
    })

    yield put({ type: errorActionType, serverErrorMessages })
  } else {
    console.error('UNIDENTIFIED ERROR OCCURED: ', error)
    toast.error(httpErrorMessage)
    yield put({ type: errorActionType, error })
  }
}
