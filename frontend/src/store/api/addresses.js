import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchAddresses = async () => {
  return thingahaApiClient.get('/addresses')
}

export const searchAddresses = async (searchkeyword) => {
  //later match with api
  return null
}
