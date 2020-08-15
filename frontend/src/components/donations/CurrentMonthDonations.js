import React, { useState } from 'react'
import styled from 'styled-components'
import DonatorCard from './DonatorCard'

const DonatorList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  & li {
    margin-bottom: 0.5rem;
  }
`

const CurrentMonthDonations = ({}) => {
  const originalDonators = [
    {
      id: 1,
      name: 'Chan Myae San Hlaing + Khine Zar Thwe',
      status: 'PENDING',
      amount_jpy: 3000,
    },
    {
      id: 2,
      name: 'Ma Thin Zar Lin',
      status: 'PAID',
      amount_jpy: 3000,
    },
    {
      id: 3,
      name: 'Ma Khin Sabei Han',
      status: 'PAID',
      amount_jpy: 3000,
    },
  ]
  const [donators, setDonators] = useState(originalDonators)

  const handleToggle = (id) => {
    const newDonators = donators.map((donator) => {
      if (donator.id == id) {
        return {
          ...donator,
          status: donator.status == 'PENDING' ? 'PAID' : 'PENDING',
        }
      } else {
        return donator
      }
    })

    setDonators(newDonators)
  }

  return (
    <DonatorList>
      {donators.map((donator) => {
        return (
          <li>
            <DonatorCard
              handleToggle={() => handleToggle(donator.id)}
              checked={donator.status == 'PAID'}
              description={donator.name}
              amount={donator.amount_jpy}
            />
          </li>
        )
      })}
    </DonatorList>
  )
}

export default CurrentMonthDonations
