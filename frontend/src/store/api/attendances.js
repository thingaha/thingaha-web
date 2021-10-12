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

const transformTypesForAttendances = (attendanceFormValues) => ({
  student_id: attendanceFormValues.school_id,
  school_id: attendanceFormValues.school_id,
  grade: attendanceFormValues.grade,
  year: attendanceFormValues.year,
  enrolled_date: attendanceFormValues.enrolled_date,
})

export const createAttendance = async ({
  student_id,
  school_id,
  grade,
  year,
  enrolled_date,
}) => {
  const { data } = await thingahaApiClient.post('/attendances', {
    student_id,
    school_id,
    grade,
    year,
    enrolled_date,
  })

  return {
    attendance: data.attendance,
  }
}

export const editAttendance = async (attendanceFormValues) => {
  const { data } = await thingahaApiClient.put(
    `/attendances/${attendanceFormValues.id}`,
    transformTypesForAttendances(attendanceFormValues)
  )

  return {
    attendance: data.attendance,
  }
}
