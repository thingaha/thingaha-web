import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import Paper from '@material-ui/core/Paper'
import UserForm from './UserForm'
import { Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import UserCard from './UserCard'

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

const Users = ({ users: { users }, getAllUsers }) => {
  const [userFormVisible, setUserFormVisible] = useState(false)
  const [editingUser, setEditingUser] = useState(users[0])

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
              />
            </li>
          )
        })}
      </UsersContainer>
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
