import range from 'lodash/range'
import values from 'lodash/values'

export const MONTHS = [
  { name: 'January', value: 'january' },
  { name: 'February', value: 'february' },
  { name: 'March', value: 'march' },
  { name: 'April', value: 'april' },
  { name: 'May', value: 'may' },
  { name: 'June', value: 'june' },
  { name: 'July', value: 'july' },
  { name: 'August', value: 'august' },
  { name: 'September', value: 'september' },
  { name: 'October', value: 'october' },
  { name: 'November', value: 'november' },
  { name: 'December', value: 'december' },
]

export const getCurrentYearAndMonth = () => {
  const currentYear = new Date().getFullYear() // 2021
  const currentMonth = MONTHS[new Date().getMonth()].value

  return {
    year: currentYear,
    month: currentMonth,
  }
}
