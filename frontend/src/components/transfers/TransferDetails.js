import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded'
import { Link } from 'react-router-dom'
import EventRoundedIcon from '@material-ui/icons/EventRounded'
import Paper from '@material-ui/core/Paper'
import TransferForm from './TransferForm'

import EditIcon from '@material-ui/icons/EditRounded'
import HouseRoundedIcon from '@material-ui/icons/HouseRounded'
import WorkOutlineRoundedIcon from '@material-ui/icons/WorkOutlineRounded'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  min-width: 40rem;
`

const Extrafund = styled.div`
  margin: 2rem 0rem 2rem;
  font-weight: bold;
  font-size: 1rem;
`

const TopIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1rem 1rem;
  justify-content: space-between;

  & .edit {
    cursor: pointer;
  }
`

const TransferDetailWrapper = styled(Paper)`
  display: flex;
  /* justify-content: flex-start; */
  flex-direction: row;
  align-items: flex-start;
  /* margin-top:2rem; */
  padding: 1rem 1rem;
  justify-content: space-between;

  & .infoText {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
  }

  & .iconTextWrapper {
    display: flex;
    flex-direction: row;
    padding: 8px 4px;
  }
  & .id {
    font-size: 1.25rem;
    line-height: 2rem;
  }

  & .smallText {
    padding-left: 0.5rem;
    font-size: 1rem;
    line-height: 1.25rem;
  }
`
const TransferDetails = ({
  match,
  transfer,
  getTransferInfo,
  getAllTransfers,
}) => {
  const { params } = match
  const transferId = params.id

  useEffect(() => {
    getTransferInfo(transferId)
  }, [getTransferInfo, transferId])

  const TransferDetail = ({ transfer }) => {
    return (
      <TransferDetailWrapper>
        <div className="infoText">
          <div className="id">{transfer.id}</div>
          <div className="smallText">
            {transfer.month}
            {transfer.year}
          </div>
          <div className="smallText">
            {'JPY'}
            {transfer.total_jpy}
          </div>
          <div className="smallText">
            {'MMK'}
            {transfer.total_mmk}
          </div>
        </div>
      </TransferDetailWrapper>
    )
  }
  /*<div>
            <Extrafund>Extra Fund</Extrafund>
          </div>*/
  const [editingTransfer, setEditingTransfer] = useState(null)
  const [transferFormVisible, setTransferFormVisible] = useState(false)

  if (!transfer) return null

  return (
    <Wrapper>
      <TopIconContainer>
        <Link to={'/transfers'}>
          <ReplyRoundedIcon
            color="primary"
            className="back"
            variant="rounded"
          />
        </Link>
        <EditIcon
          color="primary"
          className="edit"
          variant="rounded"
          onClick={() => {
            setTransferFormVisible(true)
            setEditingTransfer(transfer)
          }}
        />
      </TopIconContainer>

      <TransferDetail transfer={transfer} />

      <TransferForm
        visible={transferFormVisible}
        setVisible={setTransferFormVisible}
        editingTransfer={editingTransfer}
      />
    </Wrapper>
  )
}

const getTransfer = (state, transferId) => state.transfers.transfers[transferId]
const mapStateToProps = (state, props) => ({
  transfer: getTransfer(state, props.match.params.id),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getTransferInfo: (transferId) =>
      dispatch(actions.fetchTransfer(transferId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferDetails)
