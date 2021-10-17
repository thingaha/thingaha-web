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

// A convenient year configuration for year pickers
// This should give us a pragmatic range of years to choose from.
// Thingaha project real data starts from 2015.
export const THINGAHA_PROJECT_YEARS = [
  2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027,
  2028, 2029, 2030,
]
