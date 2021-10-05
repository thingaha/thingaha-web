import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import values from 'lodash/values'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import Paper from '@material-ui/core/Paper'
import AttendanceForm from './AttendanceForm'
import { Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import HowToRegIcon from '@material-ui/icons/HowToReg'
import AttendanceCard from './AttendanceCard'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import Input from '@material-ui/core/Input'
import Pagination from '@material-ui/lab/Pagination'
import { Grid } from '@material-ui/core'

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

const Attendances = ({
  attendances,
  newStudents,
  newSchools,
  getAllAttendances,
  getAllStudents,
  fetchSchools,
  totalCount,
  totalPages,
}) => {
  const [attendanceFormVisible, setAttendanceFormVisible] = useState(false)
  const [editingAttendance, setEditingAttendance] = useState(null)
  const [searchData, setSearchData] = useState()

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase()
    let result = []
    result = attendances.filter((data) => {
      return data.student.name.toLowerCase().search(value) != -1
    })
    if (!value) {
      return setSearchData()
    } else {
      setSearchData(result)
    }
  }
  useEffect(() => {
    getAllAttendances()
    getAllStudents()
    fetchSchools()
  }, [getAllAttendances, getAllStudents, fetchSchools])

  if (attendances.length === 0) {
    return null
  }
  if (newStudents.length === 0) {
    return null
  }
  return (
    <Wrapper component={Paper}>
      <h1> Attendances</h1 >

      {/* Add button and Search */}
      <Grid
        style={{ marginBottom: '10px' }}
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid item >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={() => {
              setAttendanceFormVisible(true)
              setEditingAttendance(null)
            }}
          >
            Add
          </Button>
        </Grid>
        <Grid item className="MuiGrid-justify-xs-flex-end">
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            onChange={(event) => handleSearch(event)}
          />
        </Grid>
      </Grid>

      <AttendancesContainer>
        {searchData
          ? searchData.map((attendance) => {
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
            })
          : null}
      </AttendancesContainer>
      {!searchData ? (
        <div>
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
        </div>
      ) : null}
      {attendanceFormVisible ? (
        <AttendanceForm
          visible={attendanceFormVisible}
          setVisible={setAttendanceFormVisible}
          editingAttendance={editingAttendance}
          newStudents={newStudents}
          newSchools={newSchools}
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
  newStudents: values(state.students.students),
  newSchools: values(state.schools.schools),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAttendances: ({ page } = { page: 1 }) =>
      dispatch(actions.fetchAllAttendances({ page })),
    getAllStudents: ({ page, perPage } = { page: 1, perPage: 200 }) =>
      dispatch(actions.fetchStudents({ page, perPage })),
    fetchSchools: ({ page } = { page: 1 }) =>
      dispatch(actions.fetchSchools({ page })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendances)
