import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import values from 'lodash/values'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import Paper from '@material-ui/core/Paper'
import StudentForm from './StudentForm'
import { Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import StudentCard from './StudentCard'
import Pagination from '@material-ui/lab/Pagination'
import ThingahaSearchInput from '../../components/common/ThingahaSearchInput'
import Chip from '@material-ui/core/Chip'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & .pagination-container {
    display: flex;
    justify-content: flex-end;
  }
`

const HeadingContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-start;

  & .current-page-total {
    margin-left: 1rem;
    align-self: center;
  }

  & .search {
    margin-left: auto;
  }
`

const StudentsContainer = styled.div`
  list-style: none;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: space-between;

  & .student-row {
    margin-bottom: 1rem;
    height: auto;
  }
`
const NoStudentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  align-items: center;

  & .message {
    margin-top: 2rem;
    font-size: 2rem;
  }
`

const NoStudents = () => {
  return (
    <NoStudentsWrapper>
      <p className="message">No students found.</p>
    </NoStudentsWrapper>
  )
}

const Students = ({ students, getAllStudents, totalCount, totalPages }) => {
  const [studentFormVisible, setStudentFormVisible] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    getAllStudents({ keyword })
  }, [getAllStudents, keyword])

  let studentList = null
  if (students.length === 0) {
    studentList = <NoStudents />
  } else {
    studentList = students.map((student) => {
      return (
        <StudentCard
          student={student}
          className="student"
          key={student.id}
          onEdit={(edit) => {
            setEditingStudent(edit)
            setStudentFormVisible(true)
          }}
        />
      )
    })
  }

  return (
    <Wrapper component={Paper}>
      <h1>Students</h1>
      <HeadingContainer>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={() => {
            setStudentFormVisible(true)
            setEditingStudent(null)
          }}
        >
          Add Student
        </Button>
        <Chip
          label={totalCount}
          variant="default"
          size="small"
          className="current-page-total"
        />
        <ThingahaSearchInput
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
          value={keyword}
          id="donation-search"
          className="search"
        />
      </HeadingContainer>

      <StudentsContainer>{studentList}</StudentsContainer>
      {totalPages > 1 && (
        <div className="pagination-container">
          <Pagination
            count={totalPages} // need to pass in total pages instead of total count
            color="primary"
            onChange={(_event, page) => {
              getAllStudents({ page })
            }}
          />
        </div>
      )}

      {studentFormVisible ? (
        <StudentForm
          visible={studentFormVisible}
          setVisible={setStudentFormVisible}
          editingStudent={editingStudent}
        />
      ) : null}
    </Wrapper>
  )
}

const getStudentList = (state) => {
  return values(state.students.students)
}

const getTotalPage = (state) => state.students.totalPages
const getTotalCount = (state) => state.students.totalCount

const mapStateToProps = (state) => ({
  totalPages: getTotalPage(state),
  totalCount: getTotalCount(state),
  students: getStudentList(state),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllStudents: ({ page, keyword } = { page: 1, keyword: '' }) =>
      dispatch(actions.fetchStudents({ page, keyword })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students)
