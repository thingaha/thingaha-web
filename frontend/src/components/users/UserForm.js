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
//import InputLabel from '@material-ui/core/InputLabel'

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
  submitEditUserForm,
  editingUser,
}) => {
  if (editingUser) {
    return (
      <ThingahaFormModal
        title={'Edit User'}
        open={visible}
        onClose={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        onSubmit={() => {
          submitEditUserForm(values)
          setVisible(false)
        }}
      >
        <form>
          <FormContainer>
            <StyledFormControl>
              <TextField
                id="name"
                name="name"
                placeholder="Jane"
                label="User Name"
                onChange={handleChange}
                value={values.name}
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
  } else {
    return (
      <ThingahaFormModal
        title={'Add New User'}
        open={visible}
        onClose={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        onSubmit={() => {
          submitUserForm(values)
          setVisible(false)
        }}
      >
        <form>
          <FormContainer>
            <StyledFormControl>
              <TextField
                id="name"
                name="name"
                placeholder="Jane"
                label="User Name"
                onChange={handleChange}
                value={values.name}
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
}

const transformUserSchema = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    country: user.country,
    role: user.role,
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
        name: '',
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

    if (values.name == '') {
      errors.name = 'Required'
    }

    return errors
  },

  displayName: 'UserForm',
  enableReinitialize: true,
})(UserForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikUserForm)
