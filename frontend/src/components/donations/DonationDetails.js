import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as actions from '../../store/actions'
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded'
import { Link } from 'react-router-dom'
import EventRoundedIcon from '@material-ui/icons/EventRounded'
import SchoolIcon from '@material-ui/icons/School'
import Paper from '@material-ui/core/Paper'
import DonationForm from './DonationForm'
import { formatMMK, formatJPY } from '../../utils/formatCurrency'

import EditIcon from '@material-ui/icons/EditRounded'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import PeopleIcon from '@material-ui/icons/People'
import HelpIcon from '@material-ui/icons/Help'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

const Wrapper = styled.div`
  width: 70%;
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

const DonationDetailWrapper = styled(Paper)`
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
    padding: 0.5rem;
    align-items: center;
  }

  & .heading {
    font-size: 1.5rem;
    line-height: 1.5rem;
    height: 2rem;
    border-radius: 50%;
    color: ${({ theme }) => theme.palette.text.primary};
    margin-bottom: 1rem;
  }

  & .smallText {
    padding-left: 0.5rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  & .unpaid {
    color: ${({ theme }) => theme.palette.error.main};
  }

  & .paid {
    color: ${({ theme }) => theme.palette.success.main};
  }
`

const DonationDetail = ({ donation }) => {
  return (
    <DonationDetailWrapper>
      <div className="infoText">
        <div className="heading">{donation.id}</div>
        <div className="iconTextWrapper">
          <EventRoundedIcon variant="rounded" />
          <div className="smallText">
            {donation.year} {donation.month}
          </div>
        </div>

        <div className="iconTextWrapper">
          <PeopleIcon variant="rounded" />
          <div className="smallText"> {donation.user.display_name}</div>
        </div>

        <div className="iconTextWrapper">
          <SchoolIcon variant="rounded" />
          <div className="smallText"> {donation.student.name}</div>
        </div>

        <div className="iconTextWrapper">
          <MonetizationOnIcon variant="rounded" />
          <div className="smallText">{formatJPY(donation.jpy_amount)}</div>
        </div>
        <div className="iconTextWrapper">
          <MonetizationOnIcon variant="rounded" />
          <div className="smallText">{formatMMK(donation.mmk_amount)}</div>
        </div>

        <div className="iconTextWrapper">
          {Boolean(donation.paidAt) ? (
            <>
              <CheckCircleRoundedIcon className="paid" />
              <div className="smallText paid">{'ပေးလှူပြီး။'}</div>
            </>
          ) : (
            <>
              <HelpIcon className="unpaid" />
              <div className="smallText unpaid">{'ပေးလှူရန် ကျန်ရှိ'}</div>
            </>
          )}
        </div>
      </div>
    </DonationDetailWrapper>
  )
}

const DonationDetails = ({ match, donation, getDonationInfo }) => {
  const { params } = match
  const donationId = params.id

  useEffect(() => {
    getDonationInfo(donationId)
  }, [getDonationInfo, donationId])

  const [editingDonation, setEditingDonation] = useState(null)
  const [donationFormVisible, setDonationFormVisible] = useState(false)

  if (!donation) {
    return null
  }

  return (
    <Wrapper>
      <TopIconContainer>
        <Link to={'/donations'}>
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
            setDonationFormVisible(true)
            setEditingDonation(donation)
          }}
        />
      </TopIconContainer>

      <DonationDetail donation={donation} />

      <DonationForm
        visible={donationFormVisible}
        setVisible={setDonationFormVisible}
        editingDonation={editingDonation}
      />
    </Wrapper>
  )
}

const getDonation = (state, donationId) => state.donations.donations[donationId]

const mapStateToProps = (state, props) => ({
  donation: getDonation(state, props.match.params.id),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getDonationInfo: (donationId) =>
      dispatch(actions.fetchDonation(donationId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DonationDetails)
