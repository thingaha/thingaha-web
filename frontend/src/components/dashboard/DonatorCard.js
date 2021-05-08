import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

const DonatorCardContainer = styled(Paper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0rem 0.5rem;
  align-items: center;
  transition: all 0.3s;

  &.success {
    color: ${(props) => props.theme.palette.success.contrastText};
    background-color: ${(props) => props.theme.palette.success.light};
  }

  & .icon {
    flex: 1;
    color: ${(props) => props.theme.palette.common.grey};
  }

  &.success .icon {
    color: ${(props) => props.theme.palette.success.dark};
  }

  &.disabled .icon {
    color: ${(props) => props.theme.palette.text.disabled};
  }

  & .details {
    flex: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme.palette.text.primary};
  }
`

const DonatorCard = ({ index, handleToggle, checked, description, amount }) => {
  const cardStateClassName = classnames({ success: checked })

  return (
    <DonatorCardContainer className={cardStateClassName}>
      <Chip
        label={index + 1}
        variant="primary"
        size="small"
        className="current-page-total"
      />
      <div className="icon">
        <Switch
          edge="end"
          color="primary"
          onChange={handleToggle}
          checked={checked}
          inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
        />
      </div>
      <div className="details">
        <Typography variant="subtitle1" color="inherit">
          {description}
        </Typography>
        <Typography variant="body1" color="inherit">
          {amount}
        </Typography>
      </div>
    </DonatorCardContainer>
  )
}

export default DonatorCard
