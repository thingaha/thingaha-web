import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
`

const Users = ({ users: { users }, getAllUsers }) => {
  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <Wrapper component={Paper}>
      <h1>Users</h1>
      <Table aria-label="simple table">
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
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="right">{user.username}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.address}</TableCell>
              <TableCell align="right">{user.role}</TableCell>
              <TableCell align="right">{user.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
