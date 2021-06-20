import React from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import ThingahaFormModal from '../common/ThingahaFormModal'

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

const PasswordResetForm = ({
  visible,
  setVisible,
  passwordReset,
  values,
  handleChange,
  submitForm,
  handleSubmit,
}) => {
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
              id="password"
              name="password"
              placeholder="********"
              label="New Password"
              type="password"
              onChange={handleChange}
              value={values.password}
            />
          </StyledFormControl>
        </FormContainer>
      </form>
    </ThingahaFormModal>
  )
}

const transformPasswordResetSchemaFlat = (user) => {
  return {
    user_id: user.id,
    password: user.password,
  }
}

const transformPasswordResetSchema = (user) => {
  return {
    user_id: user.id,
    password: user.password,
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitPasswordResetForm: (values) => {
      dispatch(
        actions.submitPasswordResetForm(transformPasswordResetSchema(values))
      )
    },
  }
}

const FormikPasswordResetForm = withFormik({
  mapPropsToValues: (props) => {
    return transformPasswordResetSchemaFlat(
      props.passwordReset || {
        user_id: '',
        password: '',
      }
    )
  },

  handleSubmit: (values, { props }) => {
    if (props.passwordReset) {
      props.submitPasswordResetForm({
        id: props.passwordReset.id,
        password: values.password,
      })
    } else {
    }

    props.setVisible(false)
  },

  displayName: 'PasswordResetForm',
  enableReinitialize: true,
})(PasswordResetForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormikPasswordResetForm)
