import last from 'lodash/last'
import thingahaApiClient from '../../utils/thingahaApiClient'

const studentsDb = [
  {
    id: 1,
    name: 'naruto-1',
    deactivated_at: null,
    birth_date: '1990-08-02',
    father_name: 'U Aye',
    mother_name: 'Daw Aye',
    parents_occupation: 'Farmer',
    photo: 'http://lorempixel.com/200/240',
    address: {
      id: 1,
      division: 'ayeyarwaddy',
      district: 'Maubin',
      township: 'Nyaungdon',
      street_address: 'Bo Min Road',
    },
  },
  {
    id: 2,
    name: 'naruto-2',
    deactivated_at: null,
    birth_date: '1990-08-01',
    father_name: 'U Aye Aye',
    mother_name: 'Daw Aye Aye',
    parents_occupation: 'Farmer',
    photo: 'http://lorempixel.com/200/240',
    address: {
      id: 2,
      division: 'ayeyarwaddy',
      district: 'Maubin',
      township: 'Nyaungdon',
      street_address: 'Bo Gyoke Road',
    },
  },
  {
    id: 3,
    name: 'naruto-3',
    deactivated_at: null,
    birth_date: '1990-08-03',
    father_name: 'U Mya',
    mother_name: 'Daw Mya',
    parents_occupation: 'Farmer',
    photo: 'http://lorempixel.com/200/240',
    address: {
      id: 3,
      division: 'ayeyarwaddy',
      district: 'Maubin',
      township: 'Nyaungdon',
      street_address: 'Zar Ni Road',
    },
  },
  {
    id: 4,
    name: 'naruto-4',
    deactivated_at: '2020-07-26T03:37:05.836Z',
    birth_date: '1990-08-05',
    father_name: 'U Hla',
    mother_name: 'Daw Hla',
    parents_occupation: 'Teacher',
    photo: 'http://lorempixel.com/200/240',
    address: {
      id: 4,
      division: 'ayeyarwaddy',
      district: 'Maubin',
      township: 'Nyaungdon',
      street_address: 'ABC Road',
    },
  },
]

export const fetchStudent = async (studentId) => {
  const response = await thingahaApiClient.get(`/students/${studentId}`)
  return {
    data: {
      studentdonator: response.data.studentdonator,
    },
  }
}

export const fetchStudents = async () => {
  const response = await thingahaApiClient.get('/students')

  return {
    data: {
      students: response.data.students,
    },
  }
}

export const createStudent = async (studentFormValues) => {
  const newStudent = { ...studentFormValues, id: last(studentsDb).id + 1 }
  studentsDb.push(newStudent)
  return {
    data: newStudent,
  }
}
export const editStudent = (values) => {
  const deactivated_at = values.deactivated_at
    ? values.deactivated_at
    : new Date()
  const editValues = {
    ...values,
    deactivated_at: values.isActivate ? null : deactivated_at,
  }

  return {
    data: [
      ...studentsDb.filter((student) => student.id !== editValues.id),
      editValues,
    ],
  }
}
