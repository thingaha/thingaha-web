import thingahaApiClient from '../../utils/thingahaApiClient'

const normalizeNumberValues = (transferFormValues) => {
  return {
    ...transferFormValues,
    year: Number(transferFormValues.year),
    total_mmk: Number(transferFormValues.total_mmk),
    total_jpy: Number(transferFormValues.total_jpy),
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
  const { data } = await thingahaApiClient.post(
    '/transfers',
    normalizeNumberValues(transferFormValues)
  )

  return {
    data: {
      transfer: data.transfer,
    },
  }
}

export const editTransfer = async ({ id, ...transferFormValues }) => {
  const { data } = await thingahaApiClient.put(
    `/transfers/${id}`,
    normalizeNumberValues(transferFormValues)
  )

  return {
    data: {
      transfer: data.transfer,
    },
  }
}
