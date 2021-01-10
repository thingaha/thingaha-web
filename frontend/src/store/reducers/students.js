import {
  GET_STUDENT_INFO_SUCCESS,
  GET_STUDENT_INFO_FAILURE,
  GET_ALL_STUDENTS_SUCCESS,
  GET_ALL_STUDENTS_FAILURE,
  SUBMIT_NEW_STUDENT_FORM_SUCCESS,
  SUBMIT_NEW_STUDENT_FORM_FAILURE,
  SUBMIT_EDIT_STUDENT_FORM_SUCCESS,
  SUBMIT_EDIT_STUDENT_FORM_FAILURE,
} from '../actions/students'
import updateObjectInArray from '../../utils/updateObjectInArray'
import {
  immutableAppendOrUpdate,
  normalizeRecordsById,
} from '../../utils/reducerHelpers'

export default (state = { students: {} }, action) => {
  switch (action.type) {
    case GET_STUDENT_INFO_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case GET_ALL_STUDENTS_SUCCESS:
      return {
        ...state,
        students: normalizeRecordsById(action.students),
      }
    case GET_ALL_STUDENTS_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case SUBMIT_NEW_STUDENT_FORM_SUCCESS:
      return {
        ...state,
        students: immutableAppendOrUpdate(state.students, action.student),
      }
    case SUBMIT_NEW_STUDENT_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case GET_STUDENT_INFO_SUCCESS:
      return {
        ...state,
        students: immutableAppendOrUpdate(state.students, action.student),
      }
    case SUBMIT_EDIT_STUDENT_FORM_SUCCESS:
      return {
        ...state,
        students: immutableAppendOrUpdate(state.students, action.student),
      }
    case SUBMIT_EDIT_STUDENT_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}
