export const GET_ALL_SCHOOLS = 'SCHOOLS/GET_ALL'
export const GET_ALL_SCHOOLS_SUCCESS = 'SCHOOLS/GET_ALL_SUCCESS'
export const GET_ALL_SCHOOLS_FAILURE = 'SCHOOLS/GET_ALL_FAILURE'
export const SUBMIT_NEW_SCHOOL_FORM = 'SCHOOLS/SUBMIT_NEW_SCHOOL_FORM'
export const SUBMIT_NEW_SCHOOL_FORM_SUCCESS =
  'SCHOOLS/SUBMIT_NEW_SCHOOL_FORM_SUCCESS'
export const SUBMIT_NEW_SCHOOL_FORM_FAILURE =
  'SCHOOLS/SUBMIT_NEW_SCHOOL_FORM_FAILURE'
export const SUBMIT_EDIT_SCHOOL_FORM = 'SCHOOLS/SUBMIT_EDIT_SCHOOL_FORM'
export const SUBMIT_EDIT_SCHOOL_FORM_SUCCESS =
  'SCHOOLS/SUBMIT_EDIT_SCHOOL_FORM_SUCCESS'
export const SUBMIT_EDIT_SCHOOL_FORM_FAILURE =
  'SCHOOLS/SUBMIT_EDIT_SCHOOL_FORM_FAILURE'

export const fetchSchools = ({ page }) => {
  return {
    type: GET_ALL_SCHOOLS,
    page: page,
  }
}

export const submitNewSchoolForm = (formValues) => {
  return {
    type: SUBMIT_NEW_SCHOOL_FORM,
    school: formValues,
  }
}

export const submitEditSchoolForm = (formValues) => {
  return {
    type: SUBMIT_EDIT_SCHOOL_FORM,
    school: formValues,
  }
}
