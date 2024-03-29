import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import Paper from '@material-ui/core/Paper'
import UserDetailForm from '../settings/UserDetailForm'
import PasswordChangeForm from '../settings/PasswordChangeForm'
import { Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditRounded'
import ThingahaName from '../common/ThingahaName'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  min-width: 40rem;
`
const HeadingContainer = styled.div`
  margin-bottom: 1rem;
`

const UserDetailWrapper = styled(Paper)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1rem 1rem;
  justify-content: space-between;

  & .photo {
    margin: 1.5rem 1rem;
    width: 200px;
    height: 240px;
  }

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

  & .smallText {
    padding-left: 0.5rem;
    font-size: 1rem;
    line-height: 2rem;
    width: 200px;
  }
`

const UserDetail = ({ user, currentUser, getUserInfo }) => {
  const [userDetailFormVisible, setUserDetailFormVisible] = useState(false)
  const [passwordChangeFormVisible, setPasswordChangeFormVisible] =
    useState(false)
  const [editingUserDetail, setEditingUserDetail] = useState(null)
  const [editingUserPassword, setEditingUserPassword] = useState(null)

  useEffect(() => {
    getUserInfo(currentUser)
  }, [getUserInfo, currentUser])

  if (!user) {
    return null
  }

  return (
    <Wrapper component={Paper}>
      <HeadingContainer>
        <h1>User Setting</h1>
        <UserDetailWrapper>
          <div className="infoText">
            <div className="iconTextWrapper">
              <div className="smallText col4">Display Name:</div>
              <ThingahaName>{user.display_name}</ThingahaName>
            </div>
            <div className="iconTextWrapper">
              <div className="smallText">UserName:</div>
              <ThingahaName>{user.username}</ThingahaName>
            </div>
            <div className="iconTextWrapper">
              <div className="smallText">Email:</div>
              <ThingahaName>{user.email}</ThingahaName>
            </div>
            <div className="iconTextWrapper">
              <div className="smallText">Addresses:</div>
              <ThingahaName>
                {user.address.street_address}, {user.address.township},{' '}
                {user.address.district}, {user.address.division}
              </ThingahaName>
            </div>
            <div className="iconTextWrapper">
              <div className="smallText">Country:</div>
              <ThingahaName>{user.country}</ThingahaName>
            </div>
            <div className="iconTextWrapper">
              <div className="smallText">Role:</div>
              <ThingahaName>{user.role}</ThingahaName>
            </div>
            <div className="iconTextWrapper">
              <div className="smallText">Edit User Detail:</div>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => {
                  setUserDetailFormVisible(true)
                  setEditingUserDetail(user)
                }}
              >
                Edit
              </Button>
            </div>
            <div className="iconTextWrapper">
              <div className="smallText">Change User Password:</div>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => {
                  setPasswordChangeFormVisible(true)
                  setEditingUserPassword(user)
                }}
              >
                Change
              </Button>
            </div>
          </div>
          <img src={user.photo} className="photo" alt={user.name} />
        </UserDetailWrapper>
      </HeadingContainer>
      {userDetailFormVisible ? (
        <UserDetailForm
          visible={userDetailFormVisible}
          setVisible={setUserDetailFormVisible}
          editingUserDetail={editingUserDetail}
        />
      ) : null}
      {passwordChangeFormVisible ? (
        <PasswordChangeForm
          visible={passwordChangeFormVisible}
          setVisible={setPasswordChangeFormVisible}
          editingUserPassword={editingUserPassword}
        />
      ) : null}
    </Wrapper>
  )
}

const getCurrentUser = (state) => {
  return state.authentication.currentUser.id
}

const getUser = (state, userId) => {
  return state.users.users[userId]
}

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
  user: getUser(state, state.authentication.currentUser.id),
})

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    getUserInfo: (userId) => dispatch(actions.fetchUser(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
