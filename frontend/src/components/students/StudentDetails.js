import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { media } from '../../styles/variables'
import * as actions from '../../store/actions'
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded'
import { Link } from 'react-router-dom'
import EventRoundedIcon from '@material-ui/icons/EventRounded'
import SchoolIcon from '@material-ui/icons/School'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import StudentForm from './StudentForm'
import ThingahaCombinedAddress from '../common/ThingahaCombinedAddress'

import EditIcon from '@material-ui/icons/EditRounded'
import HouseRoundedIcon from '@material-ui/icons/HouseRounded'
import WorkOutlineRoundedIcon from '@material-ui/icons/WorkOutlineRounded'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import PeopleIcon from '@material-ui/icons/People'
import ThingahaName from '../common/ThingahaName'
import defaultImageUrl from '../../images/default_student.png'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
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
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  padding: 1rem 1rem;
  margin: 0 auto;
  justify-content: space-between;

  ${media.tabletLandscapeUp} {
    flex-direction: row;
  }

  & .photo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }

  & .photo-container .photo {
    margin: 1.5rem 0rem;
    width: 100%;
    height: auto;
    border-radius: 4px;

    ${media.tabletLandscapeUp} {
      width: 100%;
      min-width: 100px;
    }
  }

  & .infoText {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    flex: 2;
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

const StudentDetail = ({ student, deleteStudentPhoto }) => {
  const parentName = student.father_name + ' +  ' + student.mother_name

  return (
    <StudentDetailWrapper>
      <div className="infoText">
        <ThingahaName>{student.name}</ThingahaName>
        <div className="iconTextWrapper">
          <EventRoundedIcon variant="rounded" />
          <div className="smallText">{student.birth_date}</div>
        </div>
        <div className="iconTextWrapper">
          <CheckCircleRoundedIcon />
          <div className="smallText">
            {Boolean(student.deactivatedAt)
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
          <div className="smallText"> {student.parents_occupation}</div>
        </div>
        <div className="iconTextWrapper">
          <HouseRoundedIcon variant="rounded" />
          <div className="smallText">
            <ThingahaCombinedAddress address={student.address} />
          </div>
        </div>
      </div>
      <div className="photo-container">
        <img
          src={student.photo || defaultImageUrl}
          className="photo"
          alt={student.name}
        />
        {student.photo && (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => deleteStudentPhoto({ studentId: student.id })}
          >
            Delete
          </Button>
        )}
      </div>
    </StudentDetailWrapper>
  )
}

const StudentDetails = ({
  match,
  student,
  getStudentInfo,
  deleteStudentPhoto,
}) => {
  const { params } = match
  const studentId = params.id

  useEffect(() => {
    getStudentInfo(studentId)
  }, [getStudentInfo, studentId])

  const [editingStudent, setEditingStudent] = useState(null)
  const [studentFormVisible, setStudentFormVisible] = useState(false)

  if (!student) {
    return null
  }

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
            setEditingStudent(student)
          }}
        />
      </TopIconContainer>

      <StudentDetail
        student={student}
        deleteStudentPhoto={deleteStudentPhoto}
      />

      <StudentForm
        visible={studentFormVisible}
        setVisible={setStudentFormVisible}
        editingStudent={editingStudent}
      />
    </Wrapper>
  )
}

const getStudent = (state, studentId) => state.students.students[studentId]

const mapStateToProps = (state, props) => ({
  student: getStudent(state, props.match.params.id),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentInfo: (studentId) => dispatch(actions.fetchStudent(studentId)),
    deleteStudentPhoto: ({ studentId }) =>
      dispatch(actions.deleteStudentPhoto({ studentId })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetails)
