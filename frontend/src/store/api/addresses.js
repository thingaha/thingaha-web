import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchAddresses = async ({ page } = { page: 1 }) => {
  const { data } = await thingahaApiClient.get('/addresses', {
    params: { page },
  })
  
  return {
    data: {
      addresses: data.addresses,
      total_count: data.total_count,
      total_pages: data.pages,
    },
  }
}

export const searchAddresses = async (searchkeyword) => {
  //later match with api
  return null
}
