import React from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import * as yup from 'yup'
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
  visible,
  setVisible,
  editingUser,
  values,
  handleChange,
  errors,
  handleSubmit,
  submitUserForm,
  submitEditUserForm,
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
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <StyledFormControl>
            <TextField
              id="username"
              name="username"
              placeholder="Please input username for logging in."
              label="User Name"
              onChange={handleChange}
              value={values.username}
              error={Boolean(errors.username)}
              helpertext={errors.username}
            />
            <Typography
              variant="body2"
              display="block"
              color="textPrimary"
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
              error={Boolean(errors.email)}
              helpertext={errors.email}
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
              error={Boolean(errors.display_name)}
              helpertext={errors.display_name}
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
                error={Boolean(errors.password)}
                helpertext={errors.password}
              />
            </StyledFormControl>
          )}
          <StyledFormControl>
            <ThingahaSelect
              id="role"
              name="role"
              label="Role"
              onChange={handleChange}
              value={values.role}
              error={Boolean(errors.role)}
              helpertext={errors.role}
            >
              <MenuItem value="donator">Donator</MenuItem>
              <MenuItem value="sub_admin">Sub Admin</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </ThingahaSelect>
          </StyledFormControl>
          <StyledFormControl>
            <ThingahaSelect
              id="country"
              name="country"
              label="Country"
              onChange={handleChange}
              value={values.country}
              error={Boolean(errors.country)}
              helpertext={errors.country}
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

const transformUserSchemaFlat = (user) => {
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
    return transformUserSchemaFlat(
      props.editingUser || {
        username: '',
        display_name: '',
        email: '',
        password: '',
        role: 'donator',
        country: 'jp',
      }
    )
  },

  // Custom sync validation
  validationSchema: yup.object().shape({
    username: yup.string().label('UserName').required(),
    display_name: yup.string().label('Display Name').required(),
    email: yup.string().label('Email').required(),
    role: yup.string().label('Role').required(),
    country: yup.string().label('Country').required(),
    division: yup.string().label('Division').required(),
    district: yup.string().label('District').required(),
    township: yup.string().label('Township').required(),
    street_address: yup.string().label('Street Address').required(),
  }),

  displayName: 'UserForm',
  enableReinitialize: true,
})(UserForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikUserForm)
