import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import Paper from '@material-ui/core/Paper'
import UserForm from './UserForm'
import PasswordResetForm from './PasswordResetForm'
import { Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import UserCard from './UserCard'
import Pagination from '@material-ui/lab/Pagination'
import values from 'lodash/values'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
`

const HeadingContainer = styled.div`
  margin-bottom: 1rem;
`

const UsersContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  & .user-row {
    margin-bottom: 1rem;
  }
`

const Users = ({ users, totalPages, totalCount, getAllUsers }) => {
  const [userFormVisible, setUserFormVisible] = useState(false)
  const [PasswordResetFormVisible, setPasswordResetFormVisible] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [passwordReset, setPasswordReset] = useState(null)

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
            setEditingUser(false)
            setUserFormVisible(true)
          }}
        >
          Add User
        </Button>
      </HeadingContainer>
      <UserForm
        visible={userFormVisible}
        setVisible={setUserFormVisible}
        editingUser={editingUser}
      />
      <PasswordResetForm
        visible={PasswordResetFormVisible}
        setVisible={setPasswordResetFormVisible}
        passwordReset={passwordReset}
      />

      <UsersContainer>
        {users.map((user) => {
          return (
            <li className="user-row" key={user.id}>
              <UserCard
                user={user}
                className="user"
                onEdit={(editUser) => {
                  setEditingUser(editUser)
                  setUserFormVisible(true)
                }}
                onReset={(passwordReset) => {
                  setPasswordReset(passwordReset)
                  setPasswordResetFormVisible(true)
                }}
              />
            </li>
          )
        })}
      </UsersContainer>
      <div className="pagination-container">
        <Pagination
          count={totalPages} // need to pass in total pages instead of total count
          color="primary"
          onChange={(_event, page) => {
            getAllUsers({ page })
          }}
        />
      </div>
    </Wrapper>
  )
}

const getUserList = (state) => {
  return values(state.users.users)
}

const getTotalPage = (state) => state.users.totalPages
const getTotalCount = (state) => state.users.totalCount

const mapStateToProps = (state) => ({
  totalPages: getTotalPage(state),
  totalCount: getTotalCount(state),
  users: getUserList(state),
})

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    getAllUsers: ({ page } = { page: 1 }) =>
      dispatch(actions.fetchUsers({ page })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
