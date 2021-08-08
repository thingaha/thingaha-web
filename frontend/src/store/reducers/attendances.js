import {
  GET_ATTENDANCE_INFO_SUCCESS,
  GET_ATTENDANCE_INFO_FAILURE,
  GET_ALL_ATTENDANCES_SUCCESS,
  GET_ALL_ATTENDANCES_FAILURE,
  SUBMIT_NEW_ATTENDANCE_FORM_SUCCESS,
  SUBMIT_NEW_ATTENDANCE_FORM_FAILURE,
  SUBMIT_EDIT_ATTENDANCE_FORM_SUCCESS,
  SUBMIT_EDIT_ATTENDANCE_FORM_FAILURE,
} from '../actions/attendances'
import {
  immutableAppendOrUpdate,
  normalizeRecordsById,
} from '../../utils/reducerHelpers'

export default (state = { attendances: {}, errors: [] }, action) => {
  switch (action.type) {
    case GET_ATTENDANCE_INFO_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case GET_ALL_ATTENDANCES_SUCCESS:
      return {
        ...state,
        attendances: normalizeRecordsById(action.attendances),
        totalCount: action.totalCount,
        totalPages: action.totalPages,
      }
    case GET_ALL_ATTENDANCES_FAILURE:
      return {
        ...state,
        error: action.error,
      }

    case SUBMIT_NEW_ATTENDANCE_FORM_SUCCESS:
      return {
        ...state,
        attendances: immutableAppendOrUpdate(
          state.attendances,
          action.attendance
        ),
      }
    case SUBMIT_NEW_ATTENDANCE_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case GET_ATTENDANCE_INFO_SUCCESS:
      return {
        ...state,
        attendances: immutableAppendOrUpdate(
          state.attendances,
          action.attendance
        ),
      }
    case SUBMIT_EDIT_ATTENDANCE_FORM_SUCCESS:
      return {
        ...state,
        attendances: immutableAppendOrUpdate(
          state.attendances,
          action.attendance
        ),
      }
    case SUBMIT_EDIT_ATTENDANCE_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }

    default:
      return state
  }
}
