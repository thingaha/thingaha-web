import React from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as yup from 'yup'
import * as actions from '../../store/actions'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import ThingahaFormModal from '../common/ThingahaFormModal'
import MenuItem from '@material-ui/core/MenuItem'
import ThingahaAddressFields from '../common/ThingahaAddressFields'
import ThingahaSelect from '../common/ThingahaSelect'

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
      title={passwordReset ? 'Password Reset' : null }
      open={visible}
      onClose={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      onSubmit={(e) => {
        submitForm(e)
      }}
    >
      <form onSubmit={handleSubmit}>
        <FormContainer>
          {/* <StyledFormControl>
            <TextField
              id="user_id"
              name="user_id"
              placeholder="User Id"
              label="User Id"
              type="text"
              onChange={handleChange}
              value={values.user_id}
            />
          </StyledFormControl> */}
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
      dispatch(actions.submitPasswordResetForm(transformPasswordResetSchema(values)))
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
      console.log(values)
      props.submitPasswordResetForm(values)
    } else {
    }

    props.setVisible(false)
  },

  // validationSchema: yup.object().shape({
  //   name: yup.string().label('Name').required(),
  //   birth_date: yup.string().label('Birth Date').required(),
  //   father_name: yup.string().label('Father Name').required(),
  //   mother_name: yup.string().label('Mother Name').required(),
  //   parents_occupation: yup.string().label('Parents Occupation').required(),
  //   division: yup.string().label('Division').required(),
  //   district: yup.string().label('District').required(),
  //   township: yup.string().label('Township').required(),
  //   street_address: yup.string().label('Street Address').required(),
  // }),

  displayName: 'PasswordResetForm',
  enableReinitialize: true,
})(PasswordResetForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikPasswordResetForm)
