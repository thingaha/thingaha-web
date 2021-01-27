import React from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import ThingahaSelect from '../common/ThingahaSelect'
import MenuItem from '@material-ui/core/MenuItem'
import ThingahaFormModal from '../common/ThingahaFormModal'
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
  values,
  touched,
  errors,
  handleChange,
  visible,
  setVisible,
  submitTransferForm,
  submitEditTransferForm,
  editingTransfer,
}) => {
  const currentYear = new Date().getFullYear() // 2021
  const years = range(currentYear - 10, currentYear + 11, 1)
  const months = [
    { name: 'January', value: 'january' },
    { name: 'February', value: 'february' },
    { name: 'March', value: 'march' },
    { name: 'April', value: 'april' },
    { name: 'May', value: 'may' },
    { name: 'June', value: 'june' },
    { name: 'July', value: 'july' },
    { name: 'August', value: 'august' },
    { name: 'September', value: 'september' },
    { name: 'October', value: 'october' },
    { name: 'November', value: 'november' },
    { name: 'December', value: 'december' },
  ]
  const currentMonth = months[new Date().getMonth()].value
  console.log('TransferForm', values)
  return (
    <ThingahaFormModal
      title={editingTransfer ? 'Edit Transfer Data' : 'Add New Transfer Data'}
      open={visible}
      onClose={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      onSubmit={() => {
        if (editingTransfer) {
          submitEditTransferForm(values)
        } else {
          submitTransferForm(values)
        }
        setVisible(false)
      }}
    >
      <form>
        <FormContainer>
          <StyledFormControl>
            <ThingahaSelect
              id="year"
              name="year"
              label="Year"
              onChange={handleChange}
              value={values.year}
            >
              {years.map((year) => {
                return (
                  <MenuItem value={year} key={year}>
                    {year}
                  </MenuItem>
                )
              })}
            </ThingahaSelect>
          </StyledFormControl>
          <StyledFormControl>
            <ThingahaSelect
              id="month"
              name="month"
              label="Month"
              onChange={handleChange}
              value={values.month}
            >
              {months.map(({ name, value }) => {
                return (
                  <MenuItem value={value} key={value}>
                    {name}
                  </MenuItem>
                )
              })}
            </ThingahaSelect>
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="total_mmk"
              name="total_mmk"
              placeholder="00000"
              label="Total(MMK)"
              onChange={handleChange}
              value={values.total_mmk}
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
            />
          </StyledFormControl>
        </FormContainer>
      </form>
    </ThingahaFormModal>
  )
}

const transformTransferSchemaFlat = (transfer) => {
  return {
    id: transfer.id,
    year: transfer.year,
    month: transfer.month,
    total_mmk: transfer.total_mmk,
    total_jpy: transfer.total_jpy,
  }
}
const mapStateToProps = (state) => ({
  transfers: state.transfers,
  error: state.error,
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
    return transformTransferSchemaFlat(
      props.editingTransfer || {
        id: '',
        year: '',
        month: '',
        total_mmk: '',
        total_jpy: '',
      }
    )
  },

  // Custom sync validation
  validate: (values) => {
    const errors = {}

    if (values.name == '') {
      errors.name = 'Required'
    }

    return errors
  },

  displayName: 'TransferForm',
  enableReinitialize: true,
})(TransferForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikTransferForm)
