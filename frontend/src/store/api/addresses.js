import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchAddresses = async ({ page, userType } = { page: 1, userType: 'student'}) => {
  const { data } = await thingahaApiClient.get('/addresses', {
    params: { page, type: userType },
  })

  return {
    data: {
      addresses: data.addresses,
      total_count: data.total_count,
      total_pages: data.pages,
      current_page: data.current_page
    },
  }
}

export const searchAddresses = async (searchkeyword) => {
  //later match with api
  return null
}
