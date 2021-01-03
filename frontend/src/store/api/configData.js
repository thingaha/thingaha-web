import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchMyanamrDivisions = async () => {
  const { data } = await thingahaApiClient.get('/myanmar_divisions')

  return {
    data: {
      divisions: data.divisions,
    },
  }
}
