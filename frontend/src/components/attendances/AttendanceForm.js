import React from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as yup from 'yup'
import * as actions from '../../store/actions'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import ThingahaFormModal from '../common/ThingahaFormModal'
import ThingahaSelect from '../common/ThingahaSelect'
import MenuItem from '@material-ui/core/MenuItem'
import { getCurrentYearAndMonth } from '../../utils/dateAndTimeHelpers'
import range from 'lodash/range'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 24rem;

  & .address {
    font-weight: bold;
    font-size: 1rem;
  }

  & .icon {
    color: ${(props) => props.theme.palette.common.grey};
  }
`

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin-bottom: 1rem;
`
const Grade = [
  'KG',
  'G-1',
  'G-2',
  'G-3',
  'G-4',
  'G-5',
  'G-6',
  'G-7',
  'G-8',
  'G-9',
  'G-10',
  'G-11',
  'G-12',
]

const AttendanceForm = ({
  visible,
  setVisible,
  editingAttendance,
  newStudents,
  newSchools,
  values,
  handleChange,
  errors,
  handleSubmit,
  submitForm,
}) => {
  const { year: currentYear } = getCurrentYearAndMonth()
  const years = range(currentYear - 10, currentYear + 1, 1)

  return (
    <ThingahaFormModal
      title={editingAttendance ? 'Edit Student' : 'Add New Student'}
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
              onChange={handleChange}
              value={values.student_id}
              id="student_id"
              name="student_id"
              label="Student Name"
              error={Boolean(errors.student_id)}
              helperText={errors.student_id}
            >
              {newStudents.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                )
              })}
            </ThingahaSelect>
          </StyledFormControl>
          <StyledFormControl>
            <ThingahaSelect
              onChange={handleChange}
              value={values.grade}
              id="grade"
              name="grade"
              label="Grade"
              error={Boolean(errors.grade)}
              helperText={errors.grade}
            >
              {Grade.map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                )
              })}
            </ThingahaSelect>
          </StyledFormControl>
          <StyledFormControl>
            <ThingahaSelect
              onChange={handleChange}
              value={values.school_id}
              id="school_id"
              name="school_id"
              label="School Name"
              error={Boolean(errors.school_id)}
              helperText={errors.school_id}
            >
              {newSchools.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                )
              })}
            </ThingahaSelect>
          </StyledFormControl>
          <StyledFormControl>
            <ThingahaSelect
              onChange={handleChange}
              value={values.year}
              id="year"
              name="year"
              label="Year"
              error={Boolean(errors.year)}
              helperText={errors.year}
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
            <TextField
              id="enrolled_date"
              name="enrolled_date"
              label="Enrolled Date"
              onChange={handleChange}
              value={values.enrolled_date}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors.enrolled_date)}
              helperText={errors.enrolled_date}
            />
          </StyledFormControl>
        </FormContainer>
      </form>
    </ThingahaFormModal>
  )
}

const transformAttendanceSchemaFlat = (attendance) => {
  return {
    id: attendance.id,
    student_id: attendance.student.id,
    grade: attendance.grade,
    year: attendance.year,
    school_id: attendance.school.id,
    enrolled_date: attendance.enrolled_date,
  }
}

const mapStateToProps = (state) => ({
  attendances: state.attendances,
  error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewAttendanceForm: (values) => {
      dispatch(actions.submitNewAttendanceForm(values))
    },
    submitEditAttendanceForm: (values) => {
      dispatch(actions.submitEditAttendanceForm(values))
    },
  }
}

const FormikAttendanceForm = withFormik({
  mapPropsToValues: (props) => {
    return transformAttendanceSchemaFlat(
      props.editingAttendance || {
        student: {
          id: '',
        },
        grade: '',
        year: '',
        school: {
          id: '',
        },
        enrolled_date: '',
      }
    )
  },

  handleSubmit: (values, { props }) => {
    if (props.editingAttendance) {
      props.submitEditAttendanceForm(values)
    } else {
      props.submitNewAttendanceForm(values)
    }

    props.setVisible(false)
  },

  validationSchema: yup.object().shape({
    student_id: yup.number().label('Student').required(),
    grade: yup.string().label('Grade').required(),
    year: yup.number().label('Year').required(),
    school_id: yup.number().label('School').required(),
    enrolled_date: yup.date().label('School').required(),
  }),

  displayName: 'AttendanceForm',
  enableReinitialize: true,
})(AttendanceForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormikAttendanceForm)
