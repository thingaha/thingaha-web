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

const UserDetailForm = ({
  visible,
  setVisible,
  editingUserDetail,
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
      title={editingUserDetail ? 'Edit User Details' : null }
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
              id="display_name"
              name="display_name"
              placeholder="Please enter your display name..."
              label="Display Name"
              onChange={handleChange}
              value={values.display_name}
              error={Boolean(errors.display_name)}
              helpertext={errors.display_name}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="username"
              name="username"
              placeholder="Please enter your user name..."
              label="UserName"
              onChange={handleChange}
              value={values.username}
              error={Boolean(errors.username)}
              helpertext={errors.username}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="email"
              name="email"
              placeholder="Please enter email..."
              label="Email"
              onChange={handleChange}
              value={values.email}
              error={Boolean(errors.email)}
              helpertext={errors.email}
            />
          </StyledFormControl>
          <StyledFormControl>
            <ThingahaSelect
              id="role"
              name="role"
              placeholder="Please enter your role"
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
              placeholder="Please enter your country"
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
          <AddressContainer>
            <span className="address">Address</span>
          </AddressContainer>
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

const transformUserDetailSchemaFlat = (user) => {
  return {
    id: user.id,
    username: user.username,
    display_name: user.display_name,
    email: user.email,
    country: user.country,
    role: user.role,
    division: user.address.division,
    district: user.address.district,
    township: user.address.township,
    street_address: user.address.street_address,
  }
}

const transformUserDetailSchema = (user) => {
  return {
    id: user.id,
    username: user.username,
    display_name: user.display_name,
    email: user.email,
    country: user.country,
    role: user.role,
    address: {
      division: user.division,
      district: user.district,
      township: user.township,
      street_address: user.street_address,
    },
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitEditUserDetailForm: (values) => {
      dispatch(actions.submitEditUserDetailForm(transformUserDetailSchema(values)))
    },
  }
}

const FormikUserDetailForm = withFormik({
  mapPropsToValues: (props) => {
    return transformUserDetailSchemaFlat(
      props.editingUserDetail || {
        username: '',
        display_name: '',
        email: '',
        country: '',
        role: '',
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
    if (props.editingUserDetail) {
      props.submitEditUserDetailForm(values)
    } else {}

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

  displayName: 'UserDetailForm',
  enableReinitialize: true,
})(UserDetailForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikUserDetailForm)
