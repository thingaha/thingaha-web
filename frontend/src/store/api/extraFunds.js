import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchExtraFunds = async (
  { page, perPage } = { page: 1, perPage: 200 }
) => {
  return thingahaApiClient.get('/extra_funds')
}

const transformTypesForExtraFunds = (extraFundFormValues) => ({
  transfer_id: Number(extraFundFormValues.transfer_id),
  mmk_amount: Number(extraFundFormValues.mmk_amount),
})

export const createExtraFund = async (extraFundFormValues) => {
  const { data } = await thingahaApiClient.post(
    '/extra_funds',
    transformTypesForExtraFunds(extraFundFormValues)
  )

  return {
    extrafund: data.extra_funds,
  }
}

export const updateExtrafund = async (extraFundFormValues) => {
  const { data } = await thingahaApiClient.put(
    `/extra_funds/${extraFundFormValues.id}`,
    transformTypesForExtraFunds(extraFundFormValues)
  )

  return {
    extrafund: data.extra_funds,
  }
}
