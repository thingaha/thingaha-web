import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchStudent = async (studentId) => {
  const { data } = await thingahaApiClient.get(`/students/${studentId}`)
  return {
    data: {
      student: data.student,
    },
  }
}

export const fetchStudents = async ({ page } = { page: 1 }) => {
  const { data } = await thingahaApiClient.get('/students', {
    params: { page },
  })

  return {
    data: {
      students: data.students,
      total_count: data.total_count,
      total_pages: data.pages,
    },
  }
}

export const createStudent = async (studentFormValues) => {
  const { data } = await thingahaApiClient.post('/students', studentFormValues)

  return {
    student: data.student,
  }
}

export const editStudent = async (studentFormValues) => {
  const { data } = await thingahaApiClient.put(
    `/students/${studentFormValues.id}`,
    studentFormValues
  )

  return {
    student: data.student,
  }
}
