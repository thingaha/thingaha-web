import React from 'react'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/EditRounded'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import ThingahaName from '../common/ThingahaName'
import { Grid } from '@material-ui/core'
import Box from '@material-ui/core/Box'

const AttendanceCardWrapper = styled(Paper)`
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
    align-items: center;
  }

  & .iconTextWrapper {
    display: flex;
    flex-direction: row;
  }

  & .w25 {
    width: 25%;
  }

  & .w50 {
    width: 50%;
  }

  & .name {
    font-size: 1rem;
    line-height: 2rem;
  }

  & .capName {
    font-size: 0.9rem;
    line-height: 1.25rem;
    margin: 0;
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

  & .text-right {
    text-align: right;
  }
`

//TODO: localize
const labelEnrolledDate = 'Enrolled Date　:'
const labelGrade = 'Grade　:'
const labelYear = 'Year　:'
const labelSchool = 'School　:'

const AttendanceCard = ({ attendance, onEdit }) => {
  const deactivatedClass = classnames({
    deactivated: Boolean(attendance.student.deactivated_at),
  })

  return (
    <AttendanceCardWrapper className={deactivatedClass}>
      <Grid container spacing={1}>
        <Grid item sm={12} xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <ThingahaName className="thingaha-name">
                {attendance.student.name}
              </ThingahaName>
            </Grid>
            <Box
              display={{ xs: 'block', sm: 'block' }}
              style={{ marginLeft: '-4rem' }}
            >
              <Link
                to={`/attendances/${attendance.id}`}
                params={{ attendancename: attendance.student.name }}
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
                  onEdit(attendance)
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div className="iconTextWrapper">
            <h5 className="capName">{labelEnrolledDate} </h5>
            <div className="smallText">{attendance.enrolled_date}</div>
          </div>
        </Grid>
        <Grid item sm={6} xs={6}>
          <div className="iconTextWrapper">
            <h5 className="capName">{labelGrade} </h5>
            <div className="smallText">{attendance.grade}</div>
          </div>
        </Grid>
        <Grid item sm={6} xs={6}>
          <div className="iconTextWrapper">
            <h5 className="capName">{labelYear} </h5>
            <div className="smallText">({attendance.year})</div>
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div className="iconTextWrapper">
            <h5 className="capName">{labelSchool} </h5>
            <div className="smallText">{attendance.school.name}</div>
          </div>
        </Grid>
      </Grid>
    </AttendanceCardWrapper>
  )
}

export default AttendanceCard
