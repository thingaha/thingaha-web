import React, { useState } from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import ThingahaFormModal from '../common/ThingahaFormModal'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import * as yup from 'yup'

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

const PasswordChangeForm = ({
  visible,
  setVisible,
  passwordReset,
  values,
  errors,
  handleChange,
  submitForm,
  handleSubmit,
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState({
    showCurrentPassword: false,
    showNewPassword: false,
    showNewPasswordConfirmation: false,
  })
  const handlePasswordVisibilityToggle = (setting) => {
    const newState = {
      ...passwordVisibility,
      [setting]: !passwordVisibility[setting],
    }

    setPasswordVisibility(newState)
  }

  return (
    <ThingahaFormModal
      title={passwordReset ? 'Password Reset' : null}
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
              id="currentPassword"
              name="currentPassword"
              type={
                passwordVisibility.showCurrentPassword ? 'text' : 'password'
              }
              label="Current Password"
              value={values.currentPassword}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword}
              onChange={handleChange}
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibilityToggle.bind(
                        null,
                        'showCurrentPassword'
                      )}
                    >
                      {passwordVisibility.showCurrentPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="newPassword"
              name="newPassword"
              type={passwordVisibility.showNewPassword ? 'text' : 'password'}
              label="New Password"
              value={values.newPassword}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              onChange={handleChange}
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibilityToggle.bind(
                        null,
                        'showNewPassword'
                      )}
                    >
                      {passwordVisibility.showNewPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="newPasswordConfirmation"
              name="newPasswordConfirmation"
              type={
                passwordVisibility.showNewPasswordConfirmation
                  ? 'text'
                  : 'password'
              }
              label="New Password Confirmation"
              value={values.newPasswordConfirmation}
              error={!!errors.newPasswordConfirmation}
              helperText={errors.newPasswordConfirmation}
              onChange={handleChange}
              variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibilityToggle.bind(
                        null,
                        'showNewPasswordConfirmation'
                      )}
                    >
                      {passwordVisibility.showNewPasswordConfirmation ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </StyledFormControl>
        </FormContainer>
      </form>
    </ThingahaFormModal>
  )
}

const mapStateToProps = (state) => ({
  error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitPasswordChangeForm: (values) => {
      dispatch(actions.submitPasswordChangeForm(values))
    },
  }
}

const FormikPasswordChangeForm = withFormik({
  mapPropsToValues: (_props) => {
    return {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    }
  },

  handleSubmit: (values, { props }) => {
    props.submitPasswordChangeForm(values)

    props.setVisible(false)
  },

  validationSchema: yup.object().shape({
    currentPassword: yup.string().label('Current Password').required(),
    newPassword: yup.string().label('New Password').required(),
    newPasswordConfirmation: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Confirmation does not match.'),
  }),

  displayName: 'PasswordChangeForm',
  enableReinitialize: true,
})(PasswordChangeForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormikPasswordChangeForm)
