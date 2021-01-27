import last from 'lodash/last'
import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchTransfer = async (transferId) => {
  const { data } = await thingahaApiClient.get(`/transfers/${transferId}`)
  return {
    data: {
      transfer: data.transfer,
    },
  }
}

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

export const createTransfer = async (transferFormValues) => {
  //async (values) =>
  const values = {
    year: Number(transferFormValues.year),
    month: transferFormValues.month,
    total_mmk: Number(transferFormValues.total_mmk),
    total_jpy: Number(transferFormValues.total_jpy),
  }

  const { data } = await thingahaApiClient.post('/transfers', values)
  console.log('api transfer ' + transferFormValues)
  return {
    transfer: data.transfer,
  }
}

export const editTransfer = async (transferFormValues) => {
  const values = {
    year: Number(transferFormValues.year),
    month: transferFormValues.month,
    total_mmk: Number(transferFormValues.total_mmk),
    total_jpy: Number(transferFormValues.total_jpy),
  }
  const { data } = await thingahaApiClient.put(
    `/transfers/${transferFormValues.id}`,
    values
  )
  // Until api returns updated transfer data, we will just need to call the api again for now.
  const { data: transferData } = await thingahaApiClient.get(
    `/transfers/${transferFormValues.id}`
  )
  return {
    transfer: transferData.transfer,
  }
}
