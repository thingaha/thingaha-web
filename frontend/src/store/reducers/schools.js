import {
  GET_ALL_SCHOOLS_SUCCESS,
  GET_ALL_SCHOOLS_FAILURE,
  SUBMIT_NEW_SCHOOL_FORM_SUCCESS,
  SUBMIT_NEW_SCHOOL_FORM_FAILURE,
  SUBMIT_EDIT_SCHOOL_FORM_SUCCESS,
  SUBMIT_EDIT_SCHOOL_FORM_FAILURE,
} from '../actions/schools'
import updateObjectInArray from '../../utils/updateObjectInArray'

let initialState = { schools: [], totalCount: 0, totalPages: 0 }

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SCHOOLS_SUCCESS:
      return {
        ...state,
        schools: [...action.schools],
        totalCount: action.totalCount,
        totalPages: action.totalPages,
      }
    case GET_ALL_SCHOOLS_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case SUBMIT_NEW_SCHOOL_FORM_SUCCESS:
      const newSchool = action.school
      return {
        ...state,
        schools: [...state.schools, newSchool],
      }
    case SUBMIT_NEW_SCHOOL_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case SUBMIT_EDIT_SCHOOL_FORM_SUCCESS:
      const updatedSchools = updateObjectInArray(
        state.schools,
        action.school,
        (school, updatedSchool) => school.id === updatedSchool.id
      )
      return {
        ...state,
        schools: [...updatedSchools],
      }
    case SUBMIT_EDIT_SCHOOL_FORM_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}
