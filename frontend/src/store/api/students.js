import thingahaApiClient from '../../utils/thingahaApiClient'
import thingahaFileUploadApiClient from '../../utils/thingahaFileUploadApiClient'

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

export const createStudent = async ({ photoUpload, ...studentFormValues }) => {
  let { data } = await thingahaApiClient.post('/students', studentFormValues)

  if (photoUpload) {
    const formData = new FormData()
    formData.append('img', photoUpload)
    formData.append('student_id', data.student.id)
    console.log('Uploading photo')
    data = await thingahaFileUploadApiClient.post('/student/upload', formData)
  }

  return {
    student: data.student,
  }
}

export const editStudent = async ({ photoUpload, ...studentFormValues }) => {
  const { data } = await thingahaApiClient.put(
    `/students/${studentFormValues.id}`,
    studentFormValues
  )

  if (photoUpload) {
    const formData = new FormData()
    formData.append('img', photoUpload)
    formData.append('student_id', data.student.id)
    console.log('Uploading photo')
    data = await thingahaFileUploadApiClient.post('/student/upload', formData)
  }

  return {
    student: data.student,
  }
}
