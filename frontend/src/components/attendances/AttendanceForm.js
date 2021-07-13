import React from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as yup from 'yup'
import * as actions from '../../store/actions'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import ThingahaFormModal from '../common/ThingahaFormModal'
import Checkbox from '@material-ui/core/Checkbox'

import FormControlLabel from '@material-ui/core/FormControlLabel'

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

const AttendanceForm = ({
  visible,
  setVisible,
  editingAttendance,
  values,
  setFieldValue,
  setValues,
  handleChange,
  errors,
  validateForm,
  submitForm,
  handleSubmit,
}) => {
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
            <TextField
              id="name1"
              name="name1"
              placeholder="Please enter student name..."
              label="Student Name"
              onChange={handleChange}
              value={values.name1}
              error={Boolean(errors.name1)}
              helperText={errors.name1}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="grade"
              name="grade"
              placeholder="Please enter grade..."
              label="Grade"
              onChange={handleChange}
              value={values.grade}
              error={Boolean(errors.grade)}
              helperText={errors.grade}
            />
          </StyledFormControl>

          <StyledFormControl>
            <TextField
              id="name2"
              name="name2"
              placeholder="Please enter school..."
              label="School"
              onChange={handleChange}
              value={values.name2}
              error={Boolean(errors.name2)}
              helperText={errors.name2}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="year"
              name="year"
              placeholder="Please enter year..."
              label="Year"
              onChange={handleChange}
              value={values.year}
              error={Boolean(errors.year)}
              helperText={errors.year}
            />
          </StyledFormControl>
          <StyledFormControl>
            <div className="icon">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.active}
                    onChange={handleChange}
                    name="active"
                    id="active"
                    value={values.active}
                    color="primary"
                  />
                }
                label="Active?"
              />
            </div>
          </StyledFormControl>
        </FormContainer>
      </form>
    </ThingahaFormModal>
  )
}

const transformAttendanceSchemaFlat = (attendance) => {
  return {
    id: attendance.id,
    name1: attendance.student.name,
    grade: attendance.grade,
    year: attendance.year,
    name2: attendance.school.name,
    active: !Boolean(attendance.student.deactivated_at),
  }
}

const transformAttendanceSchema = (attendance) => {
  return {
    id: attendance.id,
    student: {
      name: attendance.name1,
    },
    grade: attendance.grade,
    year: attendance.year,
    school: {
      name: attendance.name2,
    },
    active: {
      student: attendance.active,
    },
  }
}

const mapStateToProps = (state) => ({
  attendances: state.attendances,
  error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewAttendanceForm: (values) => {
      dispatch(
        actions.submitNewAttendanceForm(transformAttendanceSchema(values))
      )
    },
    submitEditAttendanceForm: (values) => {
      dispatch(
        actions.submitEditAttendanceForm(transformAttendanceSchema(values))
      )
    },
  }
}

const FormikAttendanceForm = withFormik({
  mapPropsToValues: (props) => {
    return transformAttendanceSchemaFlat(
      props.editingAttendance || {
        student: {
          name: '',
        },
        grade: '',
        year: '',
        school: {
          name: '',
        },
        active: true,
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

  //   validationSchema: yup.object().shape({
  //     name: yup.string().label('Name').required(),
  //     grade: yup.string().label('Grade').required(),
  //     year: yup.string().label('Year').required(),
  //     name: yup.string().label('School Name').required(),
  //   }),

  displayName: 'AttendanceForm',
  enableReinitialize: true,
})(AttendanceForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormikAttendanceForm)
