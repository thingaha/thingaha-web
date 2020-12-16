import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded'
import { Link } from 'react-router-dom'
import EventRoundedIcon from '@material-ui/icons/EventRounded'
import SchoolIcon from '@material-ui/icons/School'
import Paper from '@material-ui/core/Paper'
import StudentForm from './StudentForm'

import EditIcon from '@material-ui/icons/EditRounded'
import HouseRoundedIcon from '@material-ui/icons/HouseRounded'
import WorkOutlineRoundedIcon from '@material-ui/icons/WorkOutlineRounded'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import PeopleIcon from '@material-ui/icons/People'

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  min-width: 40rem;
`

const DonationTitle = styled.div`
  margin: 4rem 0rem 2rem;
  font-weight: bold;
  font-size: 1.25rem;
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

const StudentDetailWrapper = styled(Paper)`
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
  & .name {
    font-size: 1.25rem;
    line-height: 2rem;
  }

  & .smallText {
    padding-left: 0.5rem;
    font-size: 1rem;
    line-height: 1.25rem;
  }
`

const DonationHistoryWrapper = styled(Paper)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1rem 1rem;
  border-radius: 0px;
  justify-content: space-between;

  & .donator {
    flex: 0.3;
  }
  & .attendee {
    flex: 0.3;
  }
  & .date {
    flex: 0.2;
  }
`
const StudentDetails = ({
  match,
  students: { students, studentdonator },
  getStudentInfo,
  getAllStudents,
}) => {
  const { params } = match
  const studentId = params.id

  useEffect(() => {
    getStudentInfo(studentId)
  }, [getStudentInfo, studentId])

  useEffect(
    (state) => {
      getAllStudents()
    },
    [getAllStudents]
  )

  const StudentDetail = ({ student }) => {
    const Address =
      student.address.division +
      (student.address.district ? ', ' + student.address.district : '') +
      (student.address.township ? ', ' + student.address.township : '') +
      (student.address.street_address
        ? ', ' + student.address.street_address
        : '')

    const ParentName = student.father_name + ' +  ' + student.mother_name

    return (
      <StudentDetailWrapper>
        <div className="infoText">
          <div className="name">{student.name}</div>
          <div className="iconTextWrapper">
            <EventRoundedIcon variant="rounded" />
            <div className="smallText">{student.birth_date}</div>
          </div>
          <div className="iconTextWrapper">
            <CheckCircleRoundedIcon />
            <div className="smallText">
              {student.isActivate
                ? 'လက်ရှိလှူဒါန်းနေသော ကျောင်းသားဖြစ်ပါသည်'
                : 'လှူဒါန်းမှူရပ်တန့်ထားသော ကျောင်းသားဖြစ်ပါသည်'}
            </div>
          </div>

          <div className="iconTextWrapper">
            <SchoolIcon />
            <div className="smallText">Grade 11 - (2020-2021)</div>
          </div>
          <div className="iconTextWrapper">
            <PeopleIcon variant="rounded" />
            <div className="smallText">{ParentName}</div>
          </div>
          <div className="iconTextWrapper">
            <WorkOutlineRoundedIcon variant="rounded" />
            <div className="smallText"> {student.parents_occupation}</div>
          </div>
          <div className="iconTextWrapper">
            <HouseRoundedIcon variant="rounded" />
            <div className="smallText">{Address}</div>
          </div>
        </div>
        <img src={student.photo} className="photo" alt={student.name} />
      </StudentDetailWrapper>
    )
  }

  const DonationHistoryCard = ({ donationHistory }) => {
    return (
      <DonationHistoryWrapper>
        <div className="attendee">{donationHistory.attendeeInfo}</div>
        <div className="donator">{donationHistory.donator}</div>
        <div className="date">{donationHistory.dateFrom}</div>
        <div className="date">{donationHistory.dateTo}</div>
      </DonationHistoryWrapper>
    )
  }

  const [editingStudent, setEditingStudent] = useState(null)
  const [studentFormVisible, setStudentFormVisible] = useState(false)

  const studentDetail = students.find((student) => {
    return student.id === studentId
  })

  if (!studentDetail) return null

  return (
    <Wrapper>
      <TopIconContainer>
        <Link to={'/students'}>
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
            setStudentFormVisible(true)
            setEditingStudent(studentDetail)
          }}
        />
      </TopIconContainer>

      <StudentDetail student={studentDetail} />

      <DonationTitle>Donation History</DonationTitle>
      <div>
        {studentdonator.map((donationHistory) => {
          return (
            <DonationHistoryCard
              donationHistory={donationHistory}
              className="donation"
            />
          )
        })}
      </div>

      <StudentForm
        visible={studentFormVisible}
        setVisible={setStudentFormVisible}
        editingStudent={editingStudent}
      />
    </Wrapper>
  )
}

const mapStateToProps = (state) => ({
  // studentdonator: state.students.studentdonator,
  students: state.students,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentInfo: (studentId) => dispatch(actions.fetchStudent(studentId)),
    getAllStudents: () => dispatch(actions.fetchStudents()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetails)
