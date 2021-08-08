export const GET_ATTENDANCE_INFO = 'ATTENDANCES/GET_ATTENDANCE_INFO'
export const GET_ATTENDANCE_INFO_SUCCESS =
  'ATTENDANCES/GET_ATTENDANCE_INFO_SUCCESS'
export const GET_ATTENDANCE_INFO_FAILURE =
  'ATTENDANCES/GET_ATTENDANCE_INFO_FAILURE'

export const GET_ALL_ATTENDANCES = 'ATTENDANCES/GET_ALL'
export const GET_ALL_ATTENDANCES_SUCCESS = 'ATTENDANCES/GET_ALL_SUCCESS'
export const GET_ALL_ATTENDANCES_FAILURE = 'ATTENDANCES/GET_ALL_FAILURE'
export const SUBMIT_NEW_ATTENDANCE_FORM =
  'ATTENDANCES/SUBMIT_NEW_ATTENDANCE_FORM'
export const SUBMIT_NEW_ATTENDANCE_FORM_SUCCESS =
  'ATTENDANCES/SUBMIT_NEW_ATTENDANCE_FORM_SUCCESS'
export const SUBMIT_NEW_ATTENDANCE_FORM_FAILURE =
  'ATTENDANCES/SUBMIT_NEW_ATTENDANCE_FORM_FAILURE'
export const SUBMIT_EDIT_ATTENDANCE_FORM =
  'ATTENDANCES/SUBMIT_EDIT_ATTENDANCE_FORM'
export const SUBMIT_EDIT_ATTENDANCE_FORM_SUCCESS =
  'ATTENDANCES/SUBMIT_EDIT_ATTENDANCE_FORM_SUCCESS'
export const SUBMIT_EDIT_ATTENDANCE_FORM_FAILURE =
  'ATTENDANCES/SUBMIT_EDIT_ATTENDANCE_FORM_FAILURE'

export const fetchAttendance = (attendanceId) => {
  return {
    type: GET_ATTENDANCE_INFO,
    attendanceId: attendanceId,
  }
}

export const fetchAllAttendances = (
  { page, perPage } = { page: 1, perPage: 200 }
) => {
  return {
    type: GET_ALL_ATTENDANCES,
    page,
    perPage,
  }
}

export const submitNewAttendanceForm = (formValues) => {
  return {
    type: SUBMIT_NEW_ATTENDANCE_FORM,
    attendance: formValues,
  }
}
export const submitEditAttendanceForm = (formValues) => {
  return {
    type: SUBMIT_EDIT_ATTENDANCE_FORM,
    attendance: formValues,
  }
}
