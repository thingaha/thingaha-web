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
export const DELETE_STUDENT_PHOTO = 'STUDENTS/DELETE_STUDENT_PHOTO'
export const DELETE_STUDENT_PHOTO_SUCCESS =
  'STUDENTS/DELETE_STUDENT_PHOTO_SUCCESS'
export const DELETE_STUDENT_PHOTO_FAILURE =
  'STUDENTS/DELETE_STUDENT_PHOTO_FAILURE'

export const fetchStudent = (studentId) => {
  return {
    type: GET_STUDENT_INFO,
    studentId: studentId,
  }
}

export const fetchStudents = (
  { page, perPage, keyword } = { page: 1, perPage: 200, keyword: '' }
) => {
  return {
    type: GET_ALL_STUDENTS,
    page,
    perPage,
    keyword,
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

export const deleteStudentPhoto = ({ studentId, url }) => {
  return {
    type: DELETE_STUDENT_PHOTO,
    studentId,
    url,
  }
}
