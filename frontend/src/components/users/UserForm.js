import React from 'react'
import { Formik, Field, Form, withFormik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import ThingahaFormModal from '../common/ThingahaFormModal'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 12rem;
`

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin-bottom: 1rem;
`

const UserForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  visible,
  setVisible,
  submitUserForm,
}) => {
  return (
    <ThingahaFormModal
      title="Add New User"
      open={visible}
      onClose={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      onSubmit={() => {
        console.log('Submitting', values)
        submitUserForm(values)
        setVisible(false)
      }}
    >
      <form>
        <FormContainer>
          <StyledFormControl>
            <TextField
              id="username"
              name="username"
              placeholder="Jane"
              label="User Name"
              onChange={handleChange}
              value={values.username}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="email"
              name="email"
              placeholder="jane@acme.com"
              label="Email"
              type="email"
              onChange={handleChange}
              value={values.email}
            />
          </StyledFormControl>
          <StyledFormControl>
            <Select
              onChange={handleChange}
              value={values.role}
              id="role"
              name="role"
              label="Role"
            >
              <MenuItem value="donator">Donator</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="superadmin">Super Admin</MenuItem>
            </Select>
          </StyledFormControl>
          <StyledFormControl>
            <Select
              onChange={handleChange}
              value={values.country}
              id="country"
              name="country"
              label="Country"
            >
              <MenuItem value="jp">Japan</MenuItem>
              <MenuItem value="mm">Myanmar</MenuItem>
              <MenuItem value="sg">Singapore</MenuItem>
            </Select>
          </StyledFormControl>
        </FormContainer>
      </form>
    </ThingahaFormModal>
  )
}

const mapStateToProps = (state) => ({
  users: state.users,
  error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitUserForm: (newUserValues) =>
      dispatch(actions.submitUserForm(newUserValues)),
  }
}

const FormikUserForm = withFormik({
  mapPropsToValues: () => ({
    username: '',
    email: '',
    role: 'donator',
    country: 'jp',
  }),

  // Custom sync validation
  validate: (values) => {
    const errors = {}

    if (!values.username) {
      errors.username = 'Required'
    }

    return errors
  },

  handleSubmit: (values, { submitUserForm }) => {
    console.log('Submitting', values)
    submitUserForm(values)
  },

  displayName: 'UserForm',
})(UserForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikUserForm)
