import React from 'react'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import * as yup from 'yup'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import ThingahaFormModal from '../common/ThingahaFormModal'
import InputLabel from '@material-ui/core/InputLabel'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 14rem;

  & .textDisabled {
    color: ${(props) => props.theme.palette.text.disabled};
  }
`

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin-bottom: 1rem;
`

const labelAddExtraFunds = 'Add Extra Funds'
const labelEditExtraFunds = 'Edit Extra Funds'
const labelTransferItem = 'Transfer Item'
const labelExtraFundsAmount = 'Extra Funds Amount'

const ExtraFundForm = ({
  values,
  handleChange,
  visible,
  setVisible,
  submitNewExtraFundForm,
  submitEditExtraFundForm,
  editExtraFundValue,
  newTransfers,
}) => {
  return (
    <ThingahaFormModal
      title={editExtraFundValue ? labelEditExtraFunds : labelAddExtraFunds}
      open={visible}
      onClose={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      onSubmit={() => {
        if (editExtraFundValue) {
          submitEditExtraFundForm(values)
        } else {
          submitNewExtraFundForm(values)
        }
        setVisible(false)
      }}
    >
      <form>
        <FormContainer>
          <StyledFormControl>
            <InputLabel id="transfer_id">{labelTransferItem}</InputLabel>
            <Select
              onChange={handleChange}
              value={values.transfer_id}
              id="transfer_id"
              name="transfer_id"
              label="Transfer Item"
            >
              {newTransfers && !editExtraFundValue
                ? newTransfers.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item.year} {item.month}{' '}
                        <span className="textDisabled">({item.id})</span>{' '}
                      </MenuItem>
                    )
                  })
                : null}
              {editExtraFundValue ? (
                <MenuItem value={values.transfer_id}>
                  {values.year} {values.month}{' '}
                  <span className="textDisabled">({values.transfer_id})</span>{' '}
                </MenuItem>
              ) : null}
            </Select>
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="mmk_amount"
              name="mmk_amount"
              placeholder="enter Extra Funds Amount..."
              label={labelExtraFundsAmount}
              onChange={handleChange}
              value={values.mmk_amount}
            />
          </StyledFormControl>
        </FormContainer>
      </form>
    </ThingahaFormModal>
  )
}

const transformExtraFundSchemaFlat = (extrafund) => {
  return {
    id: extrafund.id,
    mmk_amount: extrafund.mmk_amount,
    transfer_id: extrafund.transfer.id,
    year: extrafund.transfer.year,
    month: extrafund.transfer.month,
    total_mmk: extrafund.transfer.total_mmk,
    total_jpy: extrafund.transfer.total_jpy,
  }
}

const mapStateToProps = (state) => ({
  extraFunds: state.extraFunds,
  error: state.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewExtraFundForm: (values) => {
      dispatch(actions.submitNewExtraFundForm(values))
    },
    submitEditExtraFundForm: (values) => {
      dispatch(actions.submitEditExtraFundForm(values))
    },
  }
}

const FormikExtrafundForm = withFormik({
  mapPropsToValues: (props) => {
    return transformExtraFundSchemaFlat(
      props.editExtraFundValue || {
        id: '',
        mmk_amount: '',
        transfer: {
          id: '',
        },
      }
    )
  },

  handleSubmit: (values, { props }) => {
    if (props.editExtraFundValue) {
      props.submitEditExtraFundForm(values)
    } else {
      props.submitNewExtraFundForm(values)
    }

    props.setVisible(false)
  },

  validationSchema: yup.object().shape({
    transfer_id: yup.string().label('transfer_id').required(),
    mmk_amount: yup
      .number()
      .label('Extra Funds')
      .required()
      .positive()
      .integer(),
  }),

  displayName: 'ExtraFundForm',
  enableReinitialize: true,
})(ExtraFundForm)

export default connect(mapStateToProps, mapDispatchToProps)(FormikExtrafundForm)
