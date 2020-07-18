import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { GET_ALL_USERS } from '../../store/actions/users'

const Users = ({ users: { users }, getAllUsers }) => {
  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <ul>
      {users.map((user) => {
        return <li>{user.id}</li>
      })}
    </ul>
  )
}

const mapStateToProps = ({ users }) => ({
  users,
})

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    getAllUsers: () => dispatch({ type: GET_ALL_USERS }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
