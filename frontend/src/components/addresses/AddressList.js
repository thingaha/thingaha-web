import React from 'react'
import AddressCard from './AddressesCard'

const AddressList = ({ addresses, icon, type }) => {
  return (
    <div>
      {addresses.map((address) => {
        var addressableLink = `/${type}/${address.addressable.id}`
        return (
          <AddressCard address={address} icon={icon} link={addressableLink} />
        )
      })}
    </div>
  )
}

export default AddressList
