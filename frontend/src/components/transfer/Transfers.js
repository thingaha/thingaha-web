import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import Paper from '@material-ui/core/Paper'
import TransferForm from './TransferForm'
import { Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import TransferCard from './TransferCard'

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

const TransferDataContainer = styled.ul`
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
const Transfers = ({ transfers: { transfers }, getAllTranfers }) => {
  const [transferFormVisible, setTransferFormVisible] = useState(false)
  const [editingTransfer, setEditingTransfer] = useState(transfers[0])

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

      <TransferForm
        visible={transferFormVisible}
        setVisible={setTransferFormVisible}
        editingTransfer={editingTransfer}
      />

      <TransferDataContainer>
        {transfers.map((transfer) => {
          return (
            <li className="transfer-row">
              <TransferCard
                transfer={transfer}
                className="transfer"
                onEdit={(edit) => {
                  setEditingTransfer(edit)
                  setTransferFormVisible(true)
                }}
              />
            </li>
          )
        })}
      </TransferDataContainer>
    </Wrapper>
  )
}

const mapStateToProps = (state) => ({
  transfers: state.transfers,
})

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    getAllTranfers: () => dispatch(actions.fetchTransfer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transfers)
