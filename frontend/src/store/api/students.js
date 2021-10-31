import thingahaApiClient from '../../utils/thingahaApiClient'
import thingahaFileUploadApiClient from '../../utils/thingahaFileUploadApiClient'
import map from 'lodash/map'

export const fetchStudent = async (studentId) => {
  const { data } = await thingahaApiClient.get(`/students/${studentId}`)
  return {
    data: {
      student: data.student,
    },
  }
}

export const fetchStudents = async (
  { keyword, page, perPage } = { page: 1, perPage: 20 }
) => {
  // NOTE: We're using old format where we send request to separate endpoint for search
  // TODO: Update api to support keyword filter on the /students endpoint itself to match other pages
  let result = null
  if (keyword && keyword.length > 0) {
    result = await thingahaApiClient.get('/students/search', {
      params: { query: keyword, page, per_page: perPage },
    })
  } else {
    result = await thingahaApiClient.get('/students', {
      params: { page, per_page: perPage },
    })
  }

  return {
    data: {
      students: result.data.students,
      total_count: result.data.total_count,
      total_pages: result.data.pages,
    },
  }
}

const prepareMultipartStudentForm = ({
  photoUpload,
  photo,
  address,
  ...studentFormValues
}) => {
  let formData = new FormData()
  map(studentFormValues, (value, key) => {
    formData.append(key, value)
  })
  map(address, (value, key) => {
    formData.append(`address[${key}]`, value)
  })

  if (photoUpload) {
    formData.append('photo', photoUpload)
  }

  return formData
}

export const createStudent = async (studentFormValues) => {
  let formValues = prepareMultipartStudentForm(studentFormValues)
  let { data } = await thingahaFileUploadApiClient.post('/students', formValues)

  return {
    student: data.student,
  }
}

export const editStudent = async (studentFormValues) => {
  let formValues = prepareMultipartStudentForm(studentFormValues)
  let { data } = await thingahaFileUploadApiClient.put(
    `/students/${studentFormValues.id}`,
    formValues
  )

  return {
    student: data.student,
  }
}

export const deleteStudentPhoto = async ({ studentId }) => {
  let { data } = await thingahaApiClient.delete(`/students/${studentId}/photo`)

  return {
    success: true,
  }
}
