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
import ThingahaAddressFields from '../common/ThingahaAddressFields'
import ThingahaFileUpload from '../common/ThingahaFileUpload'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

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
const AddressContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.8rem;
`

const StudentForm = ({
  visible,
  setVisible,
  editingStudent,
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
      title={editingStudent ? 'Edit Student' : 'Add New Student'}
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
              id="name"
              name="name"
              placeholder="Please enter student name..."
              label="Name"
              onChange={handleChange}
              value={values.name}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="birth_date"
              name="birth_date"
              placeholder="Please enter birthdate..."
              label="BirthDate"
              onChange={handleChange}
              value={values.birth_date}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors.birth_date)}
              helperText={errors.birth_date}
            />
          </StyledFormControl>

          <StyledFormControl>
            <TextField
              id="father_name"
              name="father_name"
              placeholder="Please enter father's name..."
              label="Father's Name"
              onChange={handleChange}
              value={values.father_name}
              error={Boolean(errors.father_name)}
              helperText={errors.father_name}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="mother_name"
              name="mother_name"
              placeholder="Please enter mother's name..."
              label="Mother's Name"
              onChange={handleChange}
              value={values.mother_name}
              error={Boolean(errors.mother_name)}
              helperText={errors.mother_name}
            />
          </StyledFormControl>
          <StyledFormControl>
            <label for="gender">Gender</label>
            <RadioGroup
              aria-label="gender"
              name="gender"
              row
              value={values.gender}
              onChange={handleChange}
              helperText={errors.parents_occupation}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Non-Binary"
                control={<Radio />}
                label="Non-Binary"
              />
            </RadioGroup>
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="parents_occupation"
              name="parents_occupation"
              placeholder="Please enter parents occupation..."
              label="Parents Occupation"
              onChange={handleChange}
              value={values.parents_occupation}
              error={Boolean(errors.parents_occupation)}
              helperText={errors.parents_occupation}
            />
          </StyledFormControl>
          <AddressContainer>
            <span className="address">Address</span>
          </AddressContainer>
          <ThingahaAddressFields
            values={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            setValues={setValues}
            errors={errors}
            validateForm={validateForm}
          />
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
          <StyledFormControl>
            <ThingahaFileUpload
              onChange={(event) => {
                setFieldValue('photoUpload', event.currentTarget.files[0])
              }}
              name="photo"
              id="photo"
              color="primary"
              type="file"
              file={values.photoUpload}
            />
          </StyledFormControl>
        </FormContainer>
      </form>
    </ThingahaFormModal>
  )
}

const transformStudentSchemaFlat = (student) => {
  return {
    id: student.id,
    name: student.name,
    birth_date: student.birth_date,
    father_name: student.father_name,
    mother_name: student.mother_name,
    gender: student.gender,
    parents_occupation: student.parents_occupation,
    division: student.address.division,
    district: student.address.district,
    township: student.address.township,
    street_address: student.address.street_address,
    active: !Boolean(student.deactivated_at),
    photo: student.photo,
    photo: student.photoUpload,
  }
}

const transformStudentSchema = (student) => {
  return {
    id: student.id,
    name: student.name,
    active: student.active,
    birth_date: student.birth_date,
    father_name: student.father_name,
    mother_name: student.mother_name,
    gender: student.gender,
    parents_occupation: student.parents_occupation,
    photo: student.photo,
    photoUpload: student.photoUpload,
    address: {
      division: student.division,
      district: student.district,
      township: student.township,
      street_address: student.street_address,
    },
  }
}

const mapStateToProps = (state) => ({
  students: state.students,
  error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewStudentForm: (values) => {
      dispatch(actions.submitNewStudentForm(transformStudentSchema(values)))
    },
    submitEditStudentForm: (values) => {
      dispatch(actions.submitEditStudentForm(transformStudentSchema(values)))
    },
  }
}

const FormikStudentForm = withFormik({
  mapPropsToValues: (props) => {
    return transformStudentSchemaFlat(
      props.editingStudent || {
        name: '',
        birth_date: '',
        father_name: '',
        mother_name: '',
        parents_occupation: '',
        gender: '',
        address: {
          division: '',
          district: '',
          township: '',
          street_address: '',
        },
        active: true,
        photo: '',
        photoUpload: null,
      }
    )
  },

  handleSubmit: (values, { props }) => {
    if (props.editingStudent) {
      props.submitEditStudentForm(values)
    } else {
      props.submitNewStudentForm(values)
    }

    props.setVisible(false)
  },

  validationSchema: yup.object().shape({
    name: yup.string().label('Name').required(),
    birth_date: yup.string().label('Birth Date').required(),
    gender: yup.string().label('Gender').required(),
    father_name: yup.string().label('Father Name').required(),
    mother_name: yup.string().label('Mother Name').required(),
    parents_occupation: yup.string().label('Parents Occupation').required(),
    division: yup.string().label('Division').required(),
    district: yup.string().label('District').required(),
    township: yup.string().label('Township').required(),
    street_address: yup.string().label('Street Address').required(),
  }),

  displayName: 'StudentForm',
  enableReinitialize: true,
})(StudentForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikStudentForm)
