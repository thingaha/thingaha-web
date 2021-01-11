// TODO: This implementation is to be used in V2 of the app
// leaving it commented out for reference later

// import React, { useEffect, useState } from 'react'
// import { connect } from 'react-redux'
// import styled from 'styled-components'

// const DonationHistoryWrapper = styled(Paper)`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
//   padding: 1rem 1rem;
//   border-radius: 0px;
//   justify-content: space-between;

//   & .donator {
//     flex: 0.3;
//   }
//   & .attendee {
//     flex: 0.3;
//   }
//   & .date {
//     flex: 0.2;
//   }
// `

// const DonationTitle = styled.div`
//   margin: 4rem 0rem 2rem;
//   font-weight: bold;
//   font-size: 1.25rem;
// `

// const DonationHistoryCard = ({ donationHistory }) => {
//   return (
//     <DonationHistoryWrapper>
//       <div className="attendee">{donationHistory.attendeeInfo}</div>
//       <div className="donator">{donationHistory.donator}</div>
//       <div className="date">{donationHistory.dateFrom}</div>
//       <div className="date">{donationHistory.dateTo}</div>
//     </DonationHistoryWrapper>
//   )
// }

// const StudentDonationHistory = ({ student }) => {
//   return (
//     <div>
//       {studentdonator.map((donationHistory) => {
//         return (
//           <DonationHistoryCard
//             donationHistory={donationHistory}
//             className="donation"
//           />
//         )
//       })}
//     </div>
//   )
// }

// const getStudent = (state, studentId) => state.students.students[studentId]

// const mapStateToProps = (state, props) => ({
//   student: getStudent(state, props.match.params.id),
// })

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getStudentDonationHitory: (studentId) =>
//       dispatch(actions.fetchStudent(studentId)),
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(StudentDonationHistory)
