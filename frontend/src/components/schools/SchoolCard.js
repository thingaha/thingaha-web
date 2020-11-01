import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import EditIcon from '@material-ui/icons/EditRounded'
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg'

const SchoolCardWrapper = styled(Paper)`
  display: flex;
  justify-content: flex-start;
  height: auto;
  padding: 1rem 0;
  margin-bottom: 1rem;

  & .col2 {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }

  & .col3 {
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

  & .address {
    font-size: 1rem;
  }

  & .edit {
    cursor: pointer;
    margin-bottom: 0.25rem;
  }

  & .phone {
    color: ${(props) => props.theme.palette.text.tertiary};
    margin-left: 0;
  }

  & .contact {
    color: ${(props) => props.theme.palette.text.primary};
  }
`

const SchoolCard = ({ school, onEdit }) => {
  return (
    <SchoolCardWrapper>
      <div className="col2">
        <div className="name">{school.name}</div>
        <div className="address">
          {school.address.street_address}, {school.address.township},
          {school.address.district}, {school.address.division}
        </div>
      </div>
      <div className="col3">
        <EditIcon
          color="primary"
          className="edit"
          variant="rounded"
          onClick={() => {
            onEdit(school)
          }}
        />
        <Chip
          icon={<PermPhoneMsgIcon variant="rounded" />}
          label={school.contact_info}
          variant="default"
          size="small"
          className="contact"
        />
      </div>
    </SchoolCardWrapper>
  )
}

export default SchoolCard
