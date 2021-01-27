export const GET_ALL_ATTENDANCES = 'ATTENDANCES/GET_ALL_ATTENDANCES'
export const GET_ALL_ATTENDANCES_SUCCESS =
  'ATTENDANCES/GET_ALL_ATTENDANCES_SUCCESS'
export const GET_ALL_ATTENDANCES_FAILURE =
  'ATTENDANCES/GET_ALL_ATTENDANCES_FAILURE'

export const fetchAllAttendances = (
  { page, perPage } = { page: 1, perPage: 200 }
) => {
  return {
    type: GET_ALL_ATTENDANCES,
    page,
    perPage,
  }
}
