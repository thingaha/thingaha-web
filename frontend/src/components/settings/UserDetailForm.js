import React, { useState } from 'react'
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
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'

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

  & .collapseContainer {
    width: 100%;
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

  & .addressToggle {
    margin-left: 10px;
  }

  & .note {
    margin-left: 5px;
  }
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
  const [checked, setChecked] = useState(false)

  const toggleChecked = () => {
    setChecked((prev) => !prev)
  }

  return (
    <ThingahaFormModal
      title={editingUserDetail ? 'Edit User Details' : null}
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
            <Typography
              variant="body2"
              display="inline"
              color="textPrimary"
              className="note"
            >
              (Optional)
            </Typography>
            <FormControlLabel
              className="addressToggle"
              control={
                <Switch
                  checked={checked}
                  onChange={toggleChecked}
                  color="primary"
                />
              }
              label=""
            />
          </AddressContainer>
          <Collapse className="collapseContainer" in={checked}>
            <ThingahaAddressFields
              values={values}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              setValues={setValues}
              errors={errors}
              validateForm={validateForm}
            />
          </Collapse>
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
      dispatch(
        actions.submitEditUserDetailForm(transformUserDetailSchema(values))
      )
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
    } else {
    }

    props.setVisible(false)
  },

  // TODO : This code is need for update user address validation
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

  displayName: 'UserDetailForm',
  enableReinitialize: true,
})(UserDetailForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormikUserDetailForm)
