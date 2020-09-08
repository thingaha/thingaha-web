import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import * as actions from '../../store/actions'
import SchoolCard from './SchoolCard'
import SchoolForm from './SchoolForm'

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
`

const HeadingContainer = styled.div`
  margin-bottom: 1rem;
`

const SchoolsContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  & .school-row {
    margin-bottom: 1rem;
  }
`

const Schools = ({ schools: { schools }, getAllSchools }) => {
  const [schoolFormVisible, setSchoolFormVisible] = useState(false)
  const [editingSchool, setEditingSchool] = useState(null)

  useEffect(() => {
    getAllSchools()
  }, [getAllSchools])

  return (
    <Wrapper component={Paper}>
      <HeadingContainer>
        <h2>Schools</h2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={() => {
            setEditingSchool(false)
            setSchoolFormVisible(true)
          }}
        >
          Add School
        </Button>
      </HeadingContainer>

      <SchoolForm
        visible={schoolFormVisible}
        setVisible={setSchoolFormVisible}
        editingSchool={editingSchool}
      />

      <SchoolsContainer>
        {schools.map((school) => {
          return (
            <li name="school-row">
              <SchoolCard
                school={school}
                onEdit={(editSchool) => {
                  setEditingSchool(editSchool)
                  setSchoolFormVisible(true)
                }}
              />
            </li>
          )
        })}
      </SchoolsContainer>
    </Wrapper>
  )
}

const mapStateToProps = (state) => ({
  schools: state.schools,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSchools: () => dispatch(actions.fetchSchools()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schools)
