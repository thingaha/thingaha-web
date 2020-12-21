import last from 'lodash/last'
import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchTransfers = async ({ page } = { page: 1 }) => {
  const { data } = await thingahaApiClient.get('/transfers', {
    params: { page },
  })

  return {
    data: {
      transfers: data.transfers,
      total_count: data.total_count,
      total_pages: data.pages,
    },
  }
}

export const createTransfer = async (values) => {
  const { data } = await thingahaApiClient.post('/transfers', values)
  console.log('api transfer ' + values)
  return {
    transfer: data.transfer,
  }
}

export const editTransfer = async (values) => {
  // TODO call backend transfers edit endpoint
  // Until api rFeturns updated transfer data, we will just need to call the api again for now.
  const { data: transferData } = await thingahaApiClient.put(
    `/transfers/${values.id}`
  )
  return {
    transfer: transferData.transfer,
  }
}
