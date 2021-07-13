import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import values from 'lodash/values'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import Paper from '@material-ui/core/Paper'
import AttendanceForm from './AttendanceForm'
import { Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import AttendanceCard from './AttendanceCard'
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

const AttendancesContainer = styled.div`
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

const Attendances = ({
  attendances,
  getAllAttendances,
  totalCount,
  totalPages,
}) => {
  const [attendanceFormVisible, setAttendanceFormVisible] = useState(false)
  const [editingAttendance, setEditingAttendance] = useState(null)

  useEffect(() => {
    getAllAttendances()
  }, [getAllAttendances])

  if (attendances.length === 0) {
    return null
  }
  console.log(attendances)
  return (
    <Wrapper component={Paper}>
      <h1>Attendances</h1>
      <HeadingContainer>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={() => {
            setAttendanceFormVisible(true)
            setEditingAttendance(null)
          }}
        >
          Add Attendance
        </Button>
        <SearchInput />
      </HeadingContainer>

      <AttendancesContainer>
        {attendances.map((attendance) => {
          return (
            <AttendanceCard
              attendance={attendance}
              className="attendance"
              key={attendance.id}
              onEdit={(edit) => {
                setEditingAttendance(edit)
                setAttendanceFormVisible(true)
              }}
            />
          )
        })}
      </AttendancesContainer>
      <div className="pagination-container">
        <Pagination
          count={totalPages} // need to pass in total pages instead of total count
          color="primary"
          onChange={(_event, page) => {
            getAllAttendances({ page })
          }}
        />
      </div>

      {attendanceFormVisible ? (
        <AttendanceForm
          visible={attendanceFormVisible}
          setVisible={setAttendanceFormVisible}
          editingAttendance={editingAttendance}
        />
      ) : null}
    </Wrapper>
  )
}

const getAttendanceList = (state) => {
  return values(state.attendances.attendances)
}

const getTotalPage = (state) => state.attendances.totalPages
const getTotalCount = (state) => state.attendances.totalCount

const mapStateToProps = (state) => ({
  totalPages: getTotalPage(state),
  totalCount: getTotalCount(state),
  attendances: getAttendanceList(state),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAttendances: ({ page } = { page: 1 }) =>
      dispatch(actions.fetchAllAttendances({ page })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendances)
