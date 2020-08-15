export const GET_DONATIONS_FOR_MONTH = 'DONATIONS/GET_FOR_MONTH'
export const GET_DONATIONS_FOR_MONTH_SUCCESS = 'DONATIONS/GET_FOR_MONTH_SUCCESS'
export const GET_DONATIONS_FOR_MONTH_FAILURE =
  'DONATIONS/GET_FOR_MONTH_SUCCESS_FAILURE'

export const getDonationsForMonth = (year, month) => {
  return {
    type: GET_DONATIONS_FOR_MONTH,
    year: year,
    month: month,
  }
}
