import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import UserForm from './UserForm'
import { Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
`

const HeadingContainer = styled.div`
  margin-bottom: 1rem;
`

const StyledUserTable = styled(Table)`
  & td {
    color: ${(props) => props.theme.palette.text.primary};
  }
`

const StyledTableRow = styled(TableRow)`
  border-bottom: 1px solid ${(props) => props.theme.palette.common.grey};

  &.disabled {
    background: ${(props) => props.theme.palette.text.disabled};
    opacity: 0.5;
  }
`

const Users = ({ users: { users }, getAllUsers }) => {
  const [userFormVisible, setUserFormVisible] = useState(false)

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  return (
    <Wrapper component={Paper}>
      <HeadingContainer>
        <h1>Users</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={() => {
            setUserFormVisible(true)
          }}
        >
          Add User
        </Button>
      </HeadingContainer>
      <UserForm visible={userFormVisible} setVisible={setUserFormVisible} />
      <StyledUserTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <StyledTableRow
              key={user.id}
              className={Boolean(user.deactivated_at) ? 'disabled' : 'asdfs'}
            >
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="right">{user.username}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.address}</TableCell>
              <TableCell align="right">{user.role}</TableCell>
              <TableCell align="right">{user.country}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledUserTable>
    </Wrapper>
  )
}

const mapStateToProps = (state) => ({
  users: state.users,
})

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    getAllUsers: () => dispatch(actions.fetchUsers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
