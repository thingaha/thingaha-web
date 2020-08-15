import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'

const DonatorCardContainer = styled(Paper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  align-items: center;

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

const DonatorCard = ({ handleToggle, checked, description, amount }) => {
  const cardStateClassName = classnames({ success: checked })
  return (
    <DonatorCardContainer className={cardStateClassName}>
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
          {amount} JPY
        </Typography>
      </div>
    </DonatorCardContainer>
  )
}

export default DonatorCard
