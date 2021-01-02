import React from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as yup from 'yup'
import * as actions from '../../store/actions'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import ThingahaFormModal from '../common/ThingahaFormModal'
import ThingahaAddressFields from '../common/ThingahaAddressFields'

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

const SchoolForm = ({
  values,
  handleChange,
  setFieldValue,
  setValues,
  errors,
  touched,
  setFieldTouched,
  setTouched,
  visible,
  setVisible,
  submitForm,
  handleSubmit,
  validateForm,
  submitNewSchoolForm,
  submitEditSchoolForm,
  editingSchool,
}) => {
  return (
    <ThingahaFormModal
      title={editingSchool ? 'Edit School' : 'Add New School'}
      open={visible}
      onClose={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      onSubmit={(e) => {
        console.log('Trying to submit')
        submitForm(e)
      }}
    >
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <StyledFormControl>
            <TextField
              id="name"
              name="name"
              placeholder="Please enter school name..."
              label="School Name"
              onChange={handleChange}
              value={values.name}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="contact_info"
              name="contact_info"
              placeholder="street, "
              label="Contact Info"
              onChange={handleChange}
              value={values.contact_info}
              error={Boolean(errors.contact_info)}
              helperText={errors.contact_info}
            />
          </StyledFormControl>
          <ThingahaAddressFields
            values={values}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            setValues={setValues}
            errors={errors}
            validateForm={validateForm}
          />
        </FormContainer>
      </form>
    </ThingahaFormModal>
  )
}

const transformSchoolSchemaFlat = (school) => {
  return {
    id: school.id,
    name: school.name,
    contact_info: school.contact_info,
    division: school.address.division,
    district: school.address.district,
    township: school.address.township,
    street_address: school.address.street_address,
  }
}

const transformSchoolSchemaNested = (school) => {
  return {
    id: school.id,
    name: school.name,
    contact_info: school.contact_info,
    address: {
      division: school.division,
      district: school.district,
      township: school.township,
      street_address: school.street_address,
    },
  }
}

const mapStateToProps = (state) => ({
  schools: state.schools,
  error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewSchoolForm: (values) => {
      dispatch(actions.submitNewSchoolForm(transformSchoolSchemaNested(values)))
    },
    submitEditSchoolForm: (values) => {
      dispatch(
        actions.submitEditSchoolForm(transformSchoolSchemaNested(values))
      )
    },
  }
}

const FormikSchoolForm = withFormik({
  mapPropsToValues: (props) => {
    return transformSchoolSchemaFlat(
      props.editingSchool || {
        id: '',
        name: '',
        contact_info: '',
        address: {
          division: '',
          district: '',
          township: '',
          street_address: '',
        },
      }
    )
  },

  handleSubmit: (values, { props }) => {
    console.log('Handling submit')
    if (props.editingSchool) {
      props.submitEditSchoolForm(values)
    } else {
      props.submitNewSchoolForm(values)
    }

    props.setVisible(false)
  },

  validationSchema: yup.object().shape({
    name: yup.string().label('Name').required(),
    contact_info: yup.string().label('Contact Info').required(),
    division: yup.string().label('Division').required(),
    district: yup.string().label('District').required(),
    township: yup.string().label('Township').required(),
    street_address: yup.string().label('Street Address').required(),
  }),

  displayName: 'SchoolForm',
  enableReinitialize: true,
})(SchoolForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikSchoolForm)
