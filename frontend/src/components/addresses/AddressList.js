import React from 'react'
import AddressCard from './AddressesCard'

const AddressList = ({ addresses, currentPage, icon, type }) => {
  return (
    <div>
      {addresses.map((address, index) => {
        var addressableLink = `/${type}/${address.addressable.id}`
        var itemNo = (currentPage - 1) * 20 + index + 1
        return (
          <AddressCard
            key={index}
            itemNo={itemNo}
            address={address}
            icon={icon}
            link={addressableLink}
          />
        )
      })}
    </div>
  )
}

export default AddressList
