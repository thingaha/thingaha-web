export const GET_STUDENT_INFO = 'STUDENTS/GET_STUDENT_INFO'
export const GET_STUDENT_INFO_SUCCESS = 'STUDENTS/GET_STUDENT_INFO_SUCCESS'
export const GET_STUDENT_INFO_FAILURE = 'STUDENTS/GET_STUDENT_INFO_FAILURE'

export const GET_ALL_STUDENTS = 'STUDENTS/GET_ALL'
export const GET_ALL_STUDENTS_SUCCESS = 'STUDENTS/GET_ALL_SUCCESS'
export const GET_ALL_STUDENTS_FAILURE = 'STUDENTS/GET_ALL_FAILURE'
export const SUBMIT_NEW_STUDENT_FORM = 'STUDENTS/SUBMIT_NEW_STUDENT_FORM'
export const SUBMIT_NEW_STUDENT_FORM_SUCCESS =
  'STUDENTS/SUBMIT_NEW_STUDENT_FORM_SUCCESS'
export const SUBMIT_NEW_STUDENT_FORM_FAILURE =
  'STUDENTS/SUBMIT_NEW_STUDENT_FORM_FAILURE'
export const SUBMIT_EDIT_STUDENT_FORM = 'STUDENTS/SUBMIT_EDIT_STUDENT_FORM'
export const SUBMIT_EDIT_STUDENT_FORM_SUCCESS =
  'STUDENTS/SUBMIT_EDIT_STUDENT_FORM_SUCCESS'
export const SUBMIT_EDIT_STUDENT_FORM_FAILURE =
  'STUDENTS/SUBMIT_EDIT_STUDENT_FORM_FAILURE'

export const fetchStudent = (studentId) => {
  return {
    type: GET_STUDENT_INFO,
    studentId: studentId,
  }
}

export const fetchStudents = (
  { page, perPage } = { page: 1, perPage: 200 }
) => {
  return {
    type: GET_ALL_STUDENTS,
    page,
    perPage,
  }
}

export const submitNewStudentForm = (formValues) => {
  return {
    type: SUBMIT_NEW_STUDENT_FORM,
    student: formValues,
  }
}
export const submitEditStudentForm = (formValues) => {
  return {
    type: SUBMIT_EDIT_STUDENT_FORM,
    student: formValues,
  }
}
