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
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import Input from '@material-ui/core/Input'
import Pagination from '@material-ui/lab/Pagination'

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
  justify-content: space-between;
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
const SearchInput = () => {
  return (
    <Input
      id="input-with-icon-adornment"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  )
}

const Students = ({ students, getAllStudents, totalCount, totalPages }) => {
  const [studentFormVisible, setStudentFormVisible] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  useEffect(() => {
    getAllStudents()
  }, [getAllStudents])

  if (students.length === 0) {
    return null
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
        <SearchInput />
      </HeadingContainer>

      <StudentsContainer>
        {students.map((student) => {
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
        })}
      </StudentsContainer>
      <div className="pagination-container">
        <Pagination
          count={totalPages} // need to pass in total pages instead of total count
          color="primary"
          onChange={(_event, page) => {
            getAllStudents({ page })
          }}
        />
      </div>

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
    getAllStudents: ({ page } = { page: 1 }) =>
      dispatch(actions.fetchStudents({ page })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students)
