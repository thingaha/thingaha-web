import React from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import ThingahaFormModal from '../common/ThingahaFormModal'
import ThingahaSelect from '../common/ThingahaSelect'

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

  .note {
    margin-top: 0.5rem;
    font-weight: bold;
  }

  .select {
    margin-top: 1rem;
  }
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
  submitEditUserForm,
  editingUser,
}) => {
  return (
    <ThingahaFormModal
      title={Boolean(editingUser) ? 'Edit User' : 'Add New User'}
      open={visible}
      onClose={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      onSubmit={() => {
        Boolean(editingUser)
          ? submitEditUserForm(values)
          : submitUserForm(values)
        setVisible(false)
      }}
    >
      <form>
        <FormContainer>
          <StyledFormControl>
            <TextField
              id="username"
              name="username"
              placeholder="Please input username for logging in."
              label="User Name"
              onChange={handleChange}
              value={values.username}
            />
            <Typography
              variant="body2"
              display="block"
              color="textPrimary"
              gutterTop
              className="note"
            >
              * Allowed characters: lower case alphabetical characters, numbers,
              -, _, . only.
            </Typography>
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
            <TextField
              id="display_name"
              name="display_name"
              placeholder="Chan Myae"
              label="Display Name"
              onChange={handleChange}
              value={values.display_name}
            />
          </StyledFormControl>
          {Boolean(editingUser) ? null : (
            <StyledFormControl>
              <TextField
                id="password"
                name="password"
                placeholder="********"
                label="Password"
                type="password"
                onChange={handleChange}
                value={values.password}
              />
            </StyledFormControl>
          )}
          <StyledFormControl>
            <ThingahaSelect
              onChange={handleChange}
              value={values.role}
              id="role"
              name="role"
              label="Role"
            >
              <MenuItem value="donator">Donator</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="superadmin">Super Admin</MenuItem>
            </ThingahaSelect>
          </StyledFormControl>
          <StyledFormControl>
            <ThingahaSelect
              onChange={handleChange}
              value={values.country}
              id="country"
              name="country"
              label="Country"
            >
              <MenuItem value="jp">Japan</MenuItem>
              <MenuItem value="mm">Myanmar</MenuItem>
              <MenuItem value="sg">Singapore</MenuItem>
            </ThingahaSelect>
          </StyledFormControl>
        </FormContainer>
      </form>
    </ThingahaFormModal>
  )
}

const transformUserSchema = (user) => {
  return {
    id: user.id,
    username: user.username,
    display_name: user.display_name,
    email: user.email,
    country: user.country,
    role: user.role,
    addressId: user.address_id,
  }
}
const mapStateToProps = (state) => ({
  users: state.users,
  error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitUserForm: (newUserValues) => {
      dispatch(actions.submitUserForm(newUserValues))
    },
    submitEditUserForm: (values) => {
      dispatch(actions.submitEditUserForm(transformUserSchema(values)))
    },
  }
}

const FormikUserForm = withFormik({
  mapPropsToValues: (props) => {
    if (props.editingUser) {
      return props.editingUser
    } else {
      return {
        username: '',
        display_name: '',
        email: '',
        password: '',
        role: 'donator',
        country: 'jp',
      }
    }
  },

  // Custom sync validation
  validate: (values) => {
    const errors = {}

    if (values.username === '') {
      errors.usernme = 'Required'
    }

    if (values.display_name === '') {
      errors.display_name = 'Required'
    }

    return errors
  },

  displayName: 'UserForm',
  enableReinitialize: true,
})(UserForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikUserForm)
