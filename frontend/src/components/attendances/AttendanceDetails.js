import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded'
import { Link } from 'react-router-dom'
import EventRoundedIcon from '@material-ui/icons/EventRounded'
import SchoolIcon from '@material-ui/icons/School'
import Paper from '@material-ui/core/Paper'
import AttendanceForm from './AttendanceForm'
import ThingahaCombinedAddress from '../common/ThingahaCombinedAddress'

import EditIcon from '@material-ui/icons/EditRounded'
import HouseRoundedIcon from '@material-ui/icons/HouseRounded'
import WorkOutlineRoundedIcon from '@material-ui/icons/WorkOutlineRounded'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import PeopleIcon from '@material-ui/icons/People'
import ThingahaName from '../common/ThingahaName'
import { values } from 'lodash'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  min-width: 40rem;
`

const TopIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1rem 1rem;
  justify-content: space-between;

  & .edit {
    cursor: pointer;
  }
`

const AttendanceDetailWrapper = styled(Paper)`
  display: flex;
  /* justify-content: flex-start; */
  flex-direction: row;
  align-items: flex-start;
  /* margin-top:2rem; */
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
    line-height: 1.25rem;
  }
`

const AttendanceDetail = ({ attendance }) => {
  const parentName =
    attendance.student.father_name + ' +  ' + attendance.student.mother_name

  return (
    <AttendanceDetailWrapper>
      <div className="infoText">
        <ThingahaName>{attendance.student.name}</ThingahaName>
        <div className="iconTextWrapper">
          <EventRoundedIcon variant="rounded" />
          <div className="smallText">{attendance.student.birth_date}</div>
        </div>
        <div className="iconTextWrapper">
          <CheckCircleRoundedIcon />
          <div className="smallText">
            {Boolean(attendance.student.deactivatedAt)
              ? 'လှူဒါန်းမှူရပ်တန့်ထားသော ကျောင်းသားဖြစ်ပါသည်'
              : 'လက်ရှိလှူဒါန်းနေသော ကျောင်းသားဖြစ်ပါသည်'}
          </div>
        </div>

        <div className="iconTextWrapper">
          <SchoolIcon />
          <div className="smallText">Grade 11 - (2020-2021)</div>
        </div>
        <div className="iconTextWrapper">
          <PeopleIcon variant="rounded" />
          <div className="smallText">{parentName}</div>
        </div>
        <div className="iconTextWrapper">
          <WorkOutlineRoundedIcon variant="rounded" />
          <div className="smallText">
            {' '}
            {attendance.student.parents_occupation}
          </div>
        </div>
        <div className="iconTextWrapper">
          <HouseRoundedIcon variant="rounded" />
          <div className="smallText">
            <ThingahaCombinedAddress address={attendance.student.address} />
          </div>
        </div>
      </div>
      <img
        src={attendance.student.photo}
        className="photo"
        alt={attendance.student.name}
      />
    </AttendanceDetailWrapper>
  )
}

const AttendanceDetails = ({
  match,
  attendance,
  getAttendanceInfo,
  getAllStudents,
  fetchSchools,
  values,
  newStudents,
  newSchools,
}) => {
  const { params } = match
  const attendanceId = params.id

  useEffect(() => {
    getAttendanceInfo(attendanceId)
    getAllStudents()
    fetchSchools()
  }, [getAttendanceInfo, attendanceId, getAllStudents, fetchSchools])

  const [editingAttendance, setEditingAttendance] = useState(null)
  const [attendanceFormVisible, setAttendanceFormVisible] = useState(false)

  if (!attendance) {
    return null
  }
  if (newStudents.length === 0) {
    return null
  }
  return (
    <Wrapper>
      <TopIconContainer>
        <Link to={'/attendances'}>
          <ReplyRoundedIcon
            color="primary"
            className="back"
            variant="rounded"
          />
        </Link>
        <EditIcon
          color="primary"
          className="edit"
          variant="rounded"
          onClick={() => {
            setAttendanceFormVisible(true)
            setEditingAttendance(attendance)
          }}
        />
      </TopIconContainer>

      <AttendanceDetail attendance={attendance} />

      <AttendanceForm
        visible={attendanceFormVisible}
        setVisible={setAttendanceFormVisible}
        editingAttendance={editingAttendance}
        newStudents={newStudents}
        newSchools={newSchools}
      />
    </Wrapper>
  )
}

const getAttendance = (state, attendanceId) =>
  state.attendances.attendances[attendanceId]

const mapStateToProps = (state, props) => ({
  attendance: getAttendance(state, props.match.params.id),
  newStudents: values(state.students.students),
  newSchools: values(state.schools.schools),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAttendanceInfo: (attendanceId) =>
      dispatch(actions.fetchAttendance(attendanceId)),
    getAllStudents: ({ page, perPage } = { page: 1, perPage: 200 }) =>
      dispatch(actions.fetchStudents({ page, perPage })),
    fetchSchools: ({ page } = { page: 1 }) =>
      dispatch(actions.fetchSchools({ page })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceDetails)
