import React from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import ThingahaSelect from '../common/ThingahaSelect'
import MenuItem from '@material-ui/core/MenuItem'
import ThingahaFormModal from '../common/ThingahaFormModal'
import InputLabel from '@material-ui/core/InputLabel'
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
const AddressContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0.8rem;
`

const Divisions = [
  'Yangon',
  'Mandalay',
  'Bago',
  'Sagaing',
  'Magwe',
  'Ayeyarwaddy',
  'Thaninthayi',
  'Kachin',
  'Kayah',
  'Kayin',
  'Chin',
  'Mon',
  'Rakhine',
  'Shan',
]

const StudentForm = ({
  visible,
  setVisible,
  editingStudent,
  values,
  handleChange,
  submitNewStudentForm,
  submitEditStudentForm,
}) => {
  return (
    <ThingahaFormModal
      title={editingStudent ? 'Edit Student' : 'Add New Student'}
      open={visible}
      onClose={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      onSubmit={() => {
        if (editingStudent) {
          submitEditStudentForm(values)
        } else {
          submitNewStudentForm(values)
        }
        setVisible(false)
      }}
    >
      <form>
        <FormContainer>
          <StyledFormControl>
            <TextField
              id="name"
              name="name"
              placeholder="Please enter student name..."
              label="Name"
              onChange={handleChange}
              value={values.name}
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
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="parents_occupation"
              name="parents_occupation"
              placeholder="Please enter parents occupation..."
              label="Parents Occupation"
              onChange={handleChange}
              value={values.parents_occupation}
            />
          </StyledFormControl>
          <AddressContainer>
            <span className="address">Address </span>
          </AddressContainer>
          <StyledFormControl>
            <InputLabel id="division">Division</InputLabel>
            <ThingahaSelect
              onChange={handleChange}
              value={values.division}
              id="division"
              name="division"
              label="Division"
            >
              {Divisions.map((value, index) => (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              ))}
            </ThingahaSelect>
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              onChange={handleChange}
              value={values.district}
              id="district"
              name="district"
              label="District"
              placeholder="enter district address..."
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="township"
              name="township"
              placeholder="enter street address..."
              label="Township"
              onChange={handleChange}
              value={values.township}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="street_address"
              name="street_address"
              placeholder="enter street address..."
              label="Street Address"
              onChange={handleChange}
              value={values.street_address}
            />
          </StyledFormControl>
          <StyledFormControl>
            <div className="icon">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.isActivate}
                    onChange={handleChange}
                    name="isActivate"
                    id="isActivate"
                    value={values.isActivate}
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

const transformStudentSchemaFlat = (student) => {
  return {
    id: student.id,
    name: student.name,
    deactivated_at: student.deactivated_at,
    birth_date: student.birth_date,
    father_name: student.father_name,
    mother_name: student.mother_name,
    parents_occupation: student.parents_occupation,
    division: student.address.division,
    district: student.address.district,
    township: student.address.township,
    street_address: student.address.street_address,
    isActivate: student.isActivate,
  }
}

const transformStudentSchema = (student) => {
  return {
    id: student.id,
    name: student.name,
    deactivated_at: student.deactivated_at,
    birth_date: student.birth_date,
    father_name: student.father_name,
    mother_name: student.mother_name,
    parents_occupation: student.parents_occupation,
    address: {
      division: student.division,
      district: student.district,
      township: student.township,
      street_address: student.street_address,
    },
    isActivate: student.isActivate,
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
        id: '',
        name: '',
        deactivated_at: '',
        birth_date: '',
        father_name: '',
        mother_name: '',
        parents_occupation: '',
        address: {
          division: '',
          district: '',
          township: '',
          street_address: '',
        },
        isActivate: true,
      }
    )
  },

  // Custom sync validation
  validate: (values) => {
    const errors = {}

    if (!values.name) {
      errors.name = 'Required'
    }

    return errors
  },

  displayName: 'StudentForm',
  enableReinitialize: true,
})(StudentForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikStudentForm)
