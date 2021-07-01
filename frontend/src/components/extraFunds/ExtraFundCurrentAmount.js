import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import values from 'lodash/values'

const ExtraFundCurrentAmount = ({ extraFunds, getAllExtraFunds }) => {
  useEffect(() => {
    getAllExtraFunds()
  }, [getAllExtraFunds])

  const currentExtrafunds =
    extraFunds.length > 0 ? extraFunds[extraFunds.length - 1].mmk_amount : ''

  return <div>{currentExtrafunds}</div>
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
)(ExtraFundCurrentAmount)
