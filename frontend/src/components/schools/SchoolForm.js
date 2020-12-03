import React from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import ThingahaFormModal from '../common/ThingahaFormModal'
import InputLabel from '@material-ui/core/InputLabel'

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
  visible,
  setVisible,
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
      onSubmit={() => {
        if (editingSchool) {
          submitEditSchoolForm(values)
        } else {
          submitNewSchoolForm(values)
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
              placeholder="Please enter school name..."
              label="School Name"
              onChange={handleChange}
              value={values.name}
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
            />
          </StyledFormControl>
          <StyledFormControl>
            <InputLabel id="division">Division</InputLabel>
            <Select
              onChange={handleChange}
              value={values.division}
              id="division"
              name="division"
              label="Division"
            >
              <MenuItem value="yangon">Yangon</MenuItem>
              <MenuItem value="mandalay">Mandalay</MenuItem>
              <MenuItem value="ayeyarwaddy">Ayeyarwaddy</MenuItem>
            </Select>
          </StyledFormControl>
          <StyledFormControl>
            <InputLabel id="district">District</InputLabel>
            <Select
              onChange={handleChange}
              value={values.district}
              id="district"
              name="district"
              label="District"
            >
              <MenuItem value="hlaingtharyar">Hlaing Thar yar</MenuItem>
              <MenuItem value="Maubin">Maubin</MenuItem>
              <MenuItem value="botahtaung">Bo Ta Htaung</MenuItem>
            </Select>
          </StyledFormControl>
          <StyledFormControl>
            <InputLabel id="township">Township</InputLabel>
            <Select
              onChange={handleChange}
              value={values.township}
              id="township"
              name="township"
              label="Township"
            >
              <MenuItem value="hlaingtharyar">Hlaing Thar yar</MenuItem>
              <MenuItem value="thamine">Ahlone</MenuItem>
              <MenuItem value="Nyaungdon">Nyaung Don</MenuItem>
            </Select>
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

const mapStateToProps = (state) => ({
  schools: state.schools,
  error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewSchoolForm: (values) => {
      dispatch(actions.submitNewSchoolForm(values))
    },
    submitEditSchoolForm: (values) => {
      dispatch(actions.submitEditSchoolForm(values))
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

  // Custom sync validation
  validate: (values) => {
    const errors = {}

    if (!values.name) {
      errors.name = 'Required'
    }

    return errors
  },

  displayName: 'SchoolForm',
  enableReinitialize: true,
})(SchoolForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikSchoolForm)
