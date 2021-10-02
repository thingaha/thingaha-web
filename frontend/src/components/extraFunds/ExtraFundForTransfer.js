import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import values from 'lodash/values'

const labelNoExtraFund = 'No record!'
const ExtraFundForTransfer = ({ extraFunds, getAllExtraFunds, transferId }) => {
  useEffect(() => {
    getAllExtraFunds()
  }, [getAllExtraFunds])

  if (!extraFunds) {
    return null
  }

  const extraFundFotTransfer = extraFunds.filter(
    (extraFund) => extraFund.transfer.id === transferId
  )

  return (
    <div>
      {extraFundFotTransfer[0]
        ? extraFundFotTransfer[0].mmk_amount
        : labelNoExtraFund}
    </div>
  )
}

const getExtraFundList = (state) => {
  return values(state.extraFunds.extraFunds)
}

const mapStateToProps = (state) => ({
  extraFunds: getExtraFundList(state),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllExtraFunds: () => dispatch(actions.fetchExtraFunds()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtraFundForTransfer)
