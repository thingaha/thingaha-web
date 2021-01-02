import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { ErrorMessage } from 'formik'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import ThingahaSelect from '../common/ThingahaSelect'
import * as actions from '../../store/actions'
import get from 'lodash/get'

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin-bottom: 1rem;
`

const ThingahaAddressFields = (props) => {
  const {
    configData,
    getMyanmarDivisionData,
    handleChange,
    values,
    setValues,
    setFieldValue,
    errors,
    validateForm,
  } = props

  useEffect(() => {
    if (Object.keys(configData.divisionMapping).length === 0) {
      getMyanmarDivisionData()
    }
  }, [configData, getMyanmarDivisionData])

  const divisionNames = Object.keys(configData.divisionMapping)

  let districtNames = []
  if (values.division) {
    districtNames = Object.keys(
      get(configData.divisionMapping, values.division, {})
    )
  }

  let townshipNames = []
  if (values.district) {
    townshipNames = get(
      configData.divisionMapping,
      [values.division, values.district],
      []
    )
  }

  return (
    <>
      <StyledFormControl error={Boolean(errors.division)}>
        <InputLabel id="division">Division</InputLabel>
        <ThingahaSelect
          onChange={(e) => {
            if (e.target.value !== values.division) {
              setValues({ ...values, district: '', township: '' }, true)
            }
            handleChange(e)
          }}
          value={values.division}
          id="division"
          name="division"
          label="Division"
        >
          {divisionNames.map((divisionName) => {
            return (
              <MenuItem value={divisionName} key={divisionName}>
                {divisionName}
              </MenuItem>
            )
          })}
        </ThingahaSelect>
        <FormHelperText>
          <ErrorMessage name="division" />
        </FormHelperText>
      </StyledFormControl>
      <StyledFormControl error={Boolean(errors.district)}>
        <InputLabel id="district">District</InputLabel>
        <ThingahaSelect
          onChange={(e) => {
            if (e.target.value !== values.district) {
              setFieldValue('township', '')
              validateForm()
            }
            handleChange(e)
          }}
          value={values.district}
          id="district"
          name="district"
          label="District"
        >
          {districtNames.map((districtName) => {
            return (
              <MenuItem value={districtName} key={districtName}>
                {districtName}
              </MenuItem>
            )
          })}
        </ThingahaSelect>
        <FormHelperText>
          <ErrorMessage name="district" />
        </FormHelperText>
      </StyledFormControl>
      <StyledFormControl error={Boolean(errors.township)}>
        <InputLabel id="township">Township</InputLabel>
        <ThingahaSelect
          onChange={handleChange}
          value={values.township}
          id="township"
          name="township"
          label="Township"
        >
          {townshipNames.map((townshipName) => {
            return (
              <MenuItem value={townshipName} key={townshipName}>
                {townshipName}
              </MenuItem>
            )
          })}
        </ThingahaSelect>
      </StyledFormControl>
      <StyledFormControl>
        <TextField
          error={Boolean(errors.street_address)}
          id="street_address"
          name="street_address"
          placeholder="enter street address..."
          label="Street Address"
          onChange={handleChange}
          value={values.street_address}
          helperText={errors.street_address}
        />
      </StyledFormControl>
    </>
  )
}

const mapStateToProps = (state) => ({
  configData: state.configData,
  error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getMyanmarDivisionData: () => {
      dispatch(actions.getMyanmarDivisionData())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThingahaAddressFields)
