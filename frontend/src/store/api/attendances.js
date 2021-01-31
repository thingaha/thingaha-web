import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchAllAttendances = async (
  { page, perPage } = { page: 1, perPage: 200 }
) => {
  const { data } = await thingahaApiClient.get('/attendances', {
    params: { page, per_page: perPage },
  })

  return {
    data: {
      attendances: data.attendances,
      total_count: data.total_count,
      total_pages: data.pages,
    },
  }
}
