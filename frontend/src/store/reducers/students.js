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

export default (state = { students: [], studentdonator: [] }, action) => {
  switch (action.type) {
    case GET_STUDENT_INFO_SUCCESS:
      return {
        ...state,
        studentdonator: [...action.studentdonator],
      }
    case GET_STUDENT_INFO_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case GET_ALL_STUDENTS_SUCCESS:
      const updatedStudent = action.students.map((student) => {
        return { ...student, isActivate: !student.deactivated_at }
      })
      return {
        ...state,
        students: [...updatedStudent],
      }
    case GET_ALL_STUDENTS_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case SUBMIT_NEW_STUDENT_FORM_SUCCESS:
      const newStudent = action.student
      return {
        ...state,
        students: [...state.students, newStudent],
      }
    case SUBMIT_NEW_STUDENT_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case SUBMIT_EDIT_STUDENT_FORM_SUCCESS:
      return {
        ...state,
        students: [...action.students],
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
