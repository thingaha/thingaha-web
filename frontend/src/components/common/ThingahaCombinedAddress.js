import React from 'react'

const ThingahaCombinedAddress = ({ address }) => {
  const combinedAddress =
    address.division +
    (address.district ? ', ' + address.district : '') +
    (address.township ? ', ' + address.township : '') +
    (address.street_address ? ', ' + address.street_address : '')

  return <div>{combinedAddress}</div>
}

export default ThingahaCombinedAddress
