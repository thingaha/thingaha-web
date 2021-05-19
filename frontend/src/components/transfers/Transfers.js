import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import Paper from '@material-ui/core/Paper'
import TransferForm from './TransferForm'
import { Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import TransferCard from './TransferCard'
import values from 'lodash/values'

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  & .pagination-container {
    display: flex;
    justify-content: flex-end;
  }
`

const HeadingContainer = styled.div`
  margin-bottom: 1rem;
`

const TransferContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  & .transfer-row {
    margin-bottom: 1rem;
  }
`
const Transfers = ({ transfers, getAllTranfers }) => {
  const [transferFormVisible, setTransferFormVisible] = useState(false)
  const [editingTransfer, setEditingTransfer] = useState(null)

  useEffect(() => {
    getAllTranfers()
  }, [getAllTranfers])

  return (
    <Wrapper component={Paper}>
      <HeadingContainer>
        <h1>Transfer</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={() => {
            setEditingTransfer(false)
            setTransferFormVisible(true)
          }}
        >
          Add Transfer
        </Button>
      </HeadingContainer>

      {transferFormVisible ? (
        <TransferForm
          visible={transferFormVisible}
          setVisible={setTransferFormVisible}
          editingTransfer={editingTransfer}
        />
      ) : null}

      <TransferContainer>
        {transfers.map((transfer) => {
          return (
            <li className="transfer-row" key={transfer.id}>
              <TransferCard
                transfer={transfer}
                onEdit={(editingRecord) => {
                  setEditingTransfer(editingRecord)
                  setTransferFormVisible(true)
                }}
              />
            </li>
          )
        })}
      </TransferContainer>
    </Wrapper>
  )
}

const getTransferList = (state) => {
  return values(state.transfers.transfers)
}

const getTotalPage = (state) => state.transfers.totalPages
const getTotalCount = (state) => state.transfers.totalCount

const mapStateToProps = (state) => ({
  totalPages: getTotalPage(state),
  totalCount: getTotalCount(state),
  transfers: getTransferList(state),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTranfers: ({ page } = { page: 1 }) =>
      dispatch(actions.fetchTransfers({ page })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transfers)
