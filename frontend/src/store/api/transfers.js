import last from 'lodash/last'
import thingahaApiClient from '../../utils/thingahaApiClient'

const transfersDb = [
  {
    id: 1,
    year: '2020',
    month: 'january',
    total_mmk: '35000',
    total_jpy: '3000',
  },
  {
    id: 2,
    year: '2020',
    month: 'february',
    total_mmk: '35000',
    total_jpy: '3000',
  },
  {
    id: 3,
    year: '2020',
    month: 'march',
    total_mmk: '35000',
    total_jpy: '3000',
  },
  {
    id: 4,
    year: '2020',
    month: 'april',
    total_mmk: '35000',
    total_jpy: '3000',
  },
]

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
  /* const { data } = await thingahaApiClient.post('/transfers', values)
  console.log('api transfer ' + values)
  return {
    transfer: data.transfer,
  }*/

  const newTransfer = { ...transferFormValues, id: last(transfersDb).id + 1 }
  transfersDb.push(newTransfer)
  return {
    data: newTransfer,
  }
}
export const editTransfer = async (values) => {
  /*const { data } = await thingahaApiClient.put(
    `/transfers/${values.id}`,
    values
  )
  // Until api returns updated transfer data, we will just need to call the api again for now.
  const { data: transferData } = await thingahaApiClient.get(
    `/transfers/${values.id}`
  )
  return {
    transfer: transferData.transfer,
  }*/
  return {
    data: [
      ...transfersDb.filter((transfer) => transfer.id !== values.id),
      values,
    ],
  }
}
