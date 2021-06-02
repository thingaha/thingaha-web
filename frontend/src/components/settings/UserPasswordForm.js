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

const UserPasswordForm = ({
  visible,
  setVisible,
  editingUserPassword,
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
      title={editingUserPassword ? 'Change Password' : null }
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
              id="currentpassword"
              name="currentpassword"
              placeholder="********"
              label="Current Password"
              type="password"
              onChange={handleChange}
              value={values.current_password}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="newpassword"
              name="newpassword"
              placeholder="********"
              label="New Password"
              type="password"
              onChange={handleChange}
              value={values.new_password}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="confirmpassword"
              name="confirmpassword"
              placeholder="********"
              label="Confirm Password"
              type="password"
              onChange={handleChange}
              value={values.new_confirm_password}
            />
          </StyledFormControl>
        </FormContainer>
      </form>
    </ThingahaFormModal>
  )
}

const transformUserDetailSchemaFlat = (user) => {
  return {
    id: user.id,
    current_password: user.current_password,
    new_password: user.new_password,
    new_confirm_password: user.new_confirm_password,
  }
}

const transformUserDetailSchema = (user) => {
  return {
    id: user.id,
    current_password: user.current_password,
    new_password: user.new_password,
    new_confirm_password: user.new_confirm_password,
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewStudentForm: (values) => {
      dispatch(actions.submitNewStudentForm(transformUserDetailSchema(values)))
    },
    submitEditStudentForm: (values) => {
      dispatch(actions.submitEditStudentForm(transformUserDetailSchema(values)))
    },
  }
}

const FormikUserPasswordForm = withFormik({
  mapPropsToValues: (props) => {
    return transformUserDetailSchemaFlat(
      props.editingUserPassword || {
        id: '',
        current_password: '',
        new_password: '',
        new_confirm_password: '',
      }
    )
  },

  handleSubmit: (values, { props }) => {
    if (props.editingUserPassword) {
      props.submitEditStudentForm(values)
    } else {
      props.submitNewStudentForm(values)
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

  displayName: 'UserPasswordForm',
  enableReinitialize: true,
})(UserPasswordForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikUserPasswordForm)
