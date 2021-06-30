import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import ThingahaName from '../common/ThingahaName'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import EventRoundedIcon from '@material-ui/icons/EventRounded'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded'
import ReceiptIcon from '@material-ui/icons/Receipt'
import EditIcon from '@material-ui/icons/EditRounded'
import TransferForm from './TransferForm'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
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
    display: inline-flex;
    flex-direction: row;
    padding: 8px 4px;
  }

  & .smallText {
    padding-left: 0.5rem;
    font-size: 1rem;
    line-height: 1.25rem;
    align-self: flex-end;
  }

  & .smallTextLabel {
    min-width: 5rem;
    color: ${(props) => props.theme.palette.text.tertiary};
    padding-left: 0.5rem;
    font-size: 1rem;
    line-height: 1.25rem;
    align-self: flex-end;
  }
`

const labelTransferTitle = 'Transfer Record'
const TransferDetailForm = ({ transfer }) => {
  return (
    <TransferDetailWrapper>
      <div className="infoText">
        <ThingahaName>{labelTransferTitle}</ThingahaName>
        <div className="iconTextWrapper">
          <ReceiptIcon variant="rounded" />
          <div className="smallTextLabel">Id: </div>
          <div className="smallText">{transfer.id}</div>
        </div>
        <div className="iconTextWrapper">
          <EventRoundedIcon />
          <div className="smallTextLabel">Year: </div>
          <div className="smallText">{transfer.year}</div>
        </div>
        <div className="iconTextWrapper">
          <EventRoundedIcon />
          <div className="smallTextLabel">Month: </div>
          <div className="smallText">{transfer.month}</div>
        </div>
        <div className="iconTextWrapper">
          <MonetizationOnIcon />
          <div className="smallTextLabel">total Yen: </div>
          <div className="smallText">{transfer.total_jpy}</div>
        </div>
        <div className="iconTextWrapper">
          <MonetizationOnIcon />
          <div className="smallTextLabel">total Kyat: </div>
          <div className="smallText">{transfer.total_mmk}</div>
        </div>
      </div>
    </TransferDetailWrapper>
  )
}

const TransferDetails = ({ match, transfer, getTransferInfo }) => {
  const { params } = match
  const transferId = params.id

  useEffect(() => {
    getTransferInfo(transferId)
  }, [getTransferInfo, transferId])

  const [transferFormVisible, setTransferFormVisible] = useState(false)
  const [editingTransfer, setEditingTransfer] = useState(null)

  if (!transfer) {
    return null
  }

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

      <TransferDetailForm transfer={transfer}></TransferDetailForm>

      {transferFormVisible ? (
        <TransferForm
          visible={transferFormVisible}
          setVisible={setTransferFormVisible}
          editingTransfer={editingTransfer}
        />
      ) : null}
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
