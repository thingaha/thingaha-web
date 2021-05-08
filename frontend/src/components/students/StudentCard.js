import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/EditRounded'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'
import EventRoundedIcon from '@material-ui/icons/EventRounded'
import SchoolIcon from '@material-ui/icons/School'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import ThingahaCombinedAddress from '../common/ThingahaCombinedAddress'

const StudentCardWrapper = styled(Paper)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  padding: 0.5em 1rem;
  margin: 0.5rem 0rem;

  &.deactivated {
    background-color: lightgrey;
  }

  & .row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    margin: 0.2rem 0rem;
  }

  & .iconTextWrapper {
    display: flex;
    flex-direction: row;
    width: 25%;
  }

  & .name {
    font-size: 1rem;
    line-height: 2rem;
  }

  & .smallText {
    padding-left: 0.5rem;
    font-size: 0.75rem;
    line-height: 1.25rem;
  }

  & .edit {
    cursor: pointer;
  }
  & .show {
    cursor: pointer;
  }
`

const StudentCard = ({ student, onEdit }) => {
  const deactivatedClass = classnames({
    deactivated: Boolean(student.deactivated_at),
  })

  const parentName = `${student.father_name} + ${student.mother_name}`

  return (
    <StudentCardWrapper className={deactivatedClass}>
      <div className="row">
        <div className="name">{student.name}</div>
        <div>
          <Link
            to={`/students/${student.id}`}
            params={{ studentname: student.name }}
          >
            <VisibilityRoundedIcon
              color="primary"
              className="show"
              variant="rounded"
            />
          </Link>
          <EditIcon
            color="primary"
            className="edit"
            variant="rounded"
            onClick={() => {
              onEdit(student)
            }}
          />
        </div>
      </div>

      <div className="row">
        <div className="iconTextWrapper">
          <EventRoundedIcon variant="rounded" />
          <div className="smallText">{student.birth_date}</div>
        </div>
        <div className="smallText">
          <ThingahaCombinedAddress address={student.address} />
        </div>
      </div>
      <div className="row">
        <div className="iconTextWrapper">
          <SchoolIcon />
          <div className="smallText">{parentName}</div>
        </div>
      </div>
    </StudentCardWrapper>
  )
}

export default StudentCard
