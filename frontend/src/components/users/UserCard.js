import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import EditIcon from '@material-ui/icons/EditRounded'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUserRounded'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded'
import Tooltip from '@material-ui/core/Tooltip'

const UserCardWrapper = styled(Paper)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
  padding: 1rem;

  & .col2 {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-left: 1rem;
  }

  & .col4 {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: auto;
  }

  & .display-name {
    font-size: 1rem;
    line-height: 2rem;
  }

  & .username {
    font-size: 1.25rem;
    line-height: 2rem;
    display: flex;
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

  & .role-badge {
    color: ${(props) => props.theme.palette.custom.rottenyellow};
  }
`

const UserRoleIcon = ({ role }) => {
  let roleIcon = null
  const iconOptions = {
    color: 'action',
    className: 'role-badge',
    variant: 'rounded',
    fontSize: 'small',
  }

  if (role == 'admin') {
    roleIcon = (
      <Tooltip title="Administrator">
        <VerifiedUserIcon {...iconOptions} />
      </Tooltip>
    )
  } else if (role == 'sub_admin') {
    roleIcon = (
      <Tooltip title="Sub Administrator">
        <SupervisedUserCircleIcon {...iconOptions} />
      </Tooltip>
    )
  } else {
    roleIcon = (
      <Tooltip title="Donator">
        <MonetizationOnRoundedIcon {...iconOptions} />
      </Tooltip>
    )
  }

  return roleIcon
}

const UserCard = ({ user, onEdit }) => {
  return (
    <UserCardWrapper>
      <div className="col1">
        <Avatar>{user.country}</Avatar>
      </div>
      <div className="col2">
        <div className="display-name">{user.display_name}</div>
        <div className="email">{user.email}</div>
      </div>
      <div className="col4">
        <div className="username">
          <Tooltip title="User Name">
            <Chip
              label={user.username}
              variant="default"
              size="small"
              className="role"
            />
          </Tooltip>

          <EditIcon
            color="primary"
            className="edit"
            variant="rounded"
            onClick={() => {
              onEdit(user)
            }}
          />
        </div>
        <UserRoleIcon role={user.role} />
      </div>
    </UserCardWrapper>
  )
}

export default UserCard
