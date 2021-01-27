import React, { useEffect } from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'
import range from 'lodash/range'
import values from 'lodash/values'
import * as yup from 'yup'
import * as actions from '../../store/actions'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import ThingahaFormModal from '../common/ThingahaFormModal'
import ThingahaSelect from '../common/ThingahaSelect'
import get from 'lodash/get'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 14rem;
`

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin-bottom: 1rem;
`

const MONTHS = [
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

const DonationForm = ({
  values,
  handleChange,
  setFieldValue,
  setValues,
  errors,
  visible,
  setVisible,
  submitForm,
  handleSubmit,
  validateForm,
  editingDonation,
  attendances,
  fetchAttendances,
  users,
  fetchUsers,
}) => {
  useEffect(() => {
    fetchAttendances()
    fetchUsers()
  }, [])

  useEffect(() => {
    // If there is no existing attendance id,
    // we set the very first value we get from the attendances array as default
    if (!values.attendance_id) {
      setFieldValue('attendance_id', get(attendances, '[0].id', ''))
    }
  }, [attendances])

  useEffect(() => {
    // If there is no existing user id,
    // we set the very first value we get from the users array as default
    if (!values.user_id) {
      setFieldValue('user_id', get(users, '[0].id', ''))
    }
  }, [users])

  const currentYear = new Date().getFullYear() // 2021
  const years = range(currentYear - 10, currentYear + 11, 1)
  const currentMonth = MONTHS[new Date().getMonth()].value

  return (
    <ThingahaFormModal
      title={editingDonation ? 'Edit Donation' : 'Add New Donation'}
      open={visible}
      onClose={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      onSubmit={(e) => {
        submitForm(e)
      }}
    >
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <StyledFormControl>
            <ThingahaSelect
              id="year"
              name="year"
              label="Year"
              onChange={handleChange}
              value={values.year || currentYear}
            >
              {years.map((year) => {
                return (
                  <MenuItem value={year} key={year}>
                    {year}
                  </MenuItem>
                )
              })}
            </ThingahaSelect>
          </StyledFormControl>
          <StyledFormControl>
            <ThingahaSelect
              id="month"
              name="month"
              label="Year"
              onChange={handleChange}
              value={values.month || currentMonth}
            >
              {MONTHS.map(({ name, value }) => {
                return (
                  <MenuItem value={value} key={value}>
                    {name}
                  </MenuItem>
                )
              })}
            </ThingahaSelect>
          </StyledFormControl>
          <StyledFormControl>
            <ThingahaSelect
              id="attendance_id"
              name="attendance_id"
              label="Attendance"
              onChange={handleChange}
              value={values.attendance_id}
            >
              {attendances.map((attendance) => {
                return (
                  <MenuItem value={attendance.id} key={attendance.id}>
                    {`${attendance.student.name} (${attendance.grade}):${attendance.year}`}
                  </MenuItem>
                )
              })}
            </ThingahaSelect>
          </StyledFormControl>
          <StyledFormControl>
            <ThingahaSelect
              id="user_id"
              name="user_id"
              label="User"
              onChange={handleChange}
              value={values.user_id}
            >
              {users.map((user) => {
                return (
                  <MenuItem value={user.id} key={user.id}>
                    {user.display_name}
                  </MenuItem>
                )
              })}
            </ThingahaSelect>
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="mmk_amount"
              name="mmk_amount"
              placeholder="Enter mmk amount..."
              label="MMK Amount"
              onChange={handleChange}
              value={values.mmk_amount}
              error={Boolean(errors.mmk_amount)}
              helperText={errors.mmk_amount}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="jpy_amount"
              name="jpy_amount"
              placeholder="Enter jpy amount..."
              label="JPY Amount"
              onChange={handleChange}
              value={values.jpy_amount}
              error={Boolean(errors.jpy_amount)}
              helperText={errors.jpy_amount}
            />
          </StyledFormControl>
        </FormContainer>
      </form>
    </ThingahaFormModal>
  )
}

const transformDonationSchemaFlat = (donation) => {
  return {
    id: donation.id,
    year: donation.year,
    month: donation.month,
    mmk_amount: donation.mmk_amount,
    jpy_amount: donation.jpy_amount,
    attendance_id: donation.attendance_id,
    user_id: donation.user.id,
  }
}

// Selectors
const getDonations = (state) => values(state.donations.donations)
const getAttendances = (state) => values(state.attendances.attendances)
const getUsers = (state) => values(state.users.users)

const mapStateToProps = (state) => ({
  schools: getDonations(state),
  attendances: getAttendances(state),
  users: getUsers(state),
  error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewDonationForm: (values) => {
      dispatch(actions.submitNewDonationForm(values))
    },

    submitEditDonationForm: (values) => {
      dispatch(actions.submitEditDonationForm(values))
    },

    fetchAttendances: () => {
      // TODO: using a 200 page entries so that we get all attendances
      // This is a hack since we don't have a custom attendance api for this dropdown list.
      // We should implement a new api endpoint that can provide all attendance list for a given month
      // For now, this approach will suffice until we have more than 200 attendances.
      dispatch(actions.fetchAllAttendances({ page: 1, perPage: 200 }))
    },

    fetchUsers: () => {
      dispatch(actions.fetchUsers({ page: 1, perPage: 200 }))
    },
  }
}

const FormikDonationForm = withFormik({
  mapPropsToValues: (props) => {
    return transformDonationSchemaFlat(
      props.editingDonation || {
        id: '',
        year: new Date().getFullYear(), // 2021
        month: MONTHS[new Date().getMonth()].value,
        jpy_amount: '',
        mmk_amount: '',
        attendance_id: '',
        user: {
          id: '',
        },
      }
    )
  },

  handleSubmit: (values, { props }) => {
    if (props.editingDonation) {
      props.submitEditDonationForm(values)
    } else {
      props.submitNewDonationForm(values)
    }

    props.setVisible(false)
  },

  validationSchema: yup.object().shape({
    year: yup.number().required().positive().integer(),
    month: yup.mixed().oneOf(MONTHS.map(({ value }) => value)),
    jpy_amount: yup.number().required().positive().integer(),
    mmk_amount: yup.number().required().positive().integer(),
    attendance_id: yup.number().required().positive().integer(),
    user_id: yup.number().required().positive().integer(),
  }),

  displayName: 'DonationForm',
  enableReinitialize: true,
})(DonationForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikDonationForm)
