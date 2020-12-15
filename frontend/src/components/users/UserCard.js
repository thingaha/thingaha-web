import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import EditIcon from '@material-ui/icons/EditRounded'

const UserCardWrapper = styled(Paper)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
  padding: 1rem;

  & .col2 {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }

  & .col4 {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: auto;
    margin-right: 1rem;
  }

  & .name {
    font-size: 1.25rem;
    line-height: 2rem;
  }

  & .email {
    font-size: 1rem;
  }

  & .edit {
    cursor: pointer;
  }

  & .role {
    color: ${(props) => props.theme.palette.text.primary};
  }
`

const UserCard = ({ user, onEdit }) => {
  return (
    <UserCardWrapper>
      <div className="col1">
        <Avatar>{user.country}</Avatar>
      </div>
      <div className="col2">
        <div className="name">{user.display_name}</div>
        <div className="email">{user.email}</div>
      </div>
      <div className="col3">
        <div className="name">{user.username}</div>
        <Chip
          label={user.role}
          variant="default"
          size="small"
          className="role"
        />
      </div>
      <div className="col4">
        <EditIcon
          color="primary"
          className="edit"
          variant="rounded"
          onClick={() => {
            onEdit(user)
          }}
        />
      </div>
    </UserCardWrapper>
  )
}

export default UserCard
