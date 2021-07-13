import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchAttendance = async (attendanceId) => {
  const { data } = await thingahaApiClient.get(`/attendances/${attendanceId}`)
  return {
    data: {
      attendance: data.attendance,
    },
  }
}

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

export const createAttendance = async (attendanceFormValues) => {
  const { data } = await thingahaApiClient.post(
    '/attendances',
    attendanceFormValues
  )

  return {
    attendance: data.attendance,
  }
}

export const editAttendance = async (attendanceFormValues) => {
  const { data } = await thingahaApiClient.put(
    `/attendances/${attendanceFormValues.id}`,
    attendanceFormValues
  )

  return {
    attendance: data.attendance,
  }
}
