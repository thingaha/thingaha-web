import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
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

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const Students = ({ students: { students }, getAllStudents }) => {
  const [studentFormVisible, setStudentFormVisible] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  useEffect(() => {
    getAllStudents()
  }, [getAllStudents])

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
              onEdit={(edit) => {
                setEditingStudent(edit)
                setStudentFormVisible(true)
              }}
            />
          )
        })}
      </StudentsContainer>

      <StudentForm
        visible={studentFormVisible}
        setVisible={setStudentFormVisible}
        editingStudent={editingStudent}
      />
    </Wrapper>
  )
}

const mapStateToProps = (state) => ({
  students: state.students,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllStudents: () => dispatch(actions.fetchStudents()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students)
