import React from 'react'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

const ThingahaSearchInput = ({ onChange, value, id, className }) => {
  return (
    <Input
      id={id || 'search-input'}
      className={className || 'search-input'}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      onChange={onChange}
      value={value}
    />
  )
}

export default ThingahaSearchInput
