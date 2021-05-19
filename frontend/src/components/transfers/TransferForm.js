import React from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import ThingahaFormModal from '../common/ThingahaFormModal'
import ThingahaSelect from '../common/ThingahaSelect'
import FormHelperText from '@material-ui/core/FormHelperText'
import * as yup from 'yup'
import { MONTHS, getCurrentYearAndMonth } from '../../utils/dateAndTimeHelpers'
import range from 'lodash/range'

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

const TransferForm = ({
  visible,
  setVisible,
  editingTransfer,
  values,
  setFieldValue,
  setValues,
  handleChange,
  errors,
  validateForm,
  submitForm,
  handleSubmit,
}) => {
  const { year: currentYear } = getCurrentYearAndMonth()
  const years = range(currentYear - 10, currentYear + 11, 1)

  return (
    <ThingahaFormModal
      title={editingTransfer ? 'Edit Transfer Data' : 'Add New Transfer Data'}
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
            <ThingahaSelect
              id="year"
              name="year"
              label="Year"
              onChange={handleChange}
              value={values.year}
              error={Boolean(errors.year)}
            >
              {years.map((year) => {
                return (
                  <MenuItem value={year} key={year}>
                    {year}
                  </MenuItem>
                )
              })}
            </ThingahaSelect>
            {errors.year && <FormHelperText>{errors.year}</FormHelperText>}
          </StyledFormControl>
          <StyledFormControl>
            <ThingahaSelect
              id="month"
              name="month"
              label="Year"
              onChange={handleChange}
              value={values.month}
              error={Boolean(errors.month)}
            >
              {MONTHS.map(({ name, value }) => {
                return (
                  <MenuItem value={value} key={value}>
                    {name}
                  </MenuItem>
                )
              })}
            </ThingahaSelect>
            {errors.month && <FormHelperText>{errors.month}</FormHelperText>}
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="total_mmk"
              name="total_mmk"
              placeholder="00000"
              label="Total(MMK)"
              onChange={handleChange}
              value={values.total_mmk}
              error={Boolean(errors.total_mmk)}
              helperText={errors.total_mmk}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="total_jpy"
              name="total_jpy"
              placeholder="0000"
              label="Total(JPY)"
              onChange={handleChange}
              value={values.total_jpy}
              error={Boolean(errors.total_jpy)}
              helperText={errors.total_jpy}
            />
          </StyledFormControl>
        </FormContainer>
      </form>
    </ThingahaFormModal>
  )
}

const mapStateToProps = (state) => ({
  transfers: state.transfers,
  // error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitTransferForm: (values) => {
      dispatch(actions.submitTransferForm(values))
    },
    submitEditTransferForm: (values) => {
      dispatch(actions.submitEditTransferForm(values))
    },
  }
}

const FormikTransferForm = withFormik({
  mapPropsToValues: (props) => {
    const { year: currentYear, month: currentMonth } = getCurrentYearAndMonth()

    return (
      props.editingTransfer || {
        id: '',
        year: currentYear,
        month: currentMonth,
        total_mmk: 0,
        total_jpy: 0,
      }
    )
  },

  handleSubmit: (values, { props }) => {
    console.log('Submitting values', values, props)
    if (props.editingTransfer) {
      props.submitEditTransferForm(values)
    } else {
      props.submitTransferForm(values)
    }

    props.setVisible(false)
  },

  validationSchema: yup.object().shape({
    year: yup.number().required().positive().integer(),
    month: yup.mixed().oneOf(MONTHS.map(({ value }) => value)),
    total_jpy: yup.number().label('Total JPY').positive().integer().required(),
    total_mmk: yup.number().label('Total MMK').positive().integer().required(),
  }),

  displayName: 'TransferForm',
  enableReinitialize: true,
})(TransferForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikTransferForm)
