import thingahaApiClient from '../../utils/thingahaApiClient'

const schoolsDb = [
  {
    id: 1,
    name: 'School1',
    contact_info: '+95090987654',
    address: {
      id: 2,
      division: 'yangon',
      district: 'hlaingtharyar',
      township: 'hlaingtharyar',
      street_address: 'nyaungdon Road',
    },
  },
  {
    id: 2,
    name: 'School2',
    contact_info: '+95090987653',
    address: {
      id: 1,
      division: 'ayeyarwaddy',
      district: 'Maubin',
      township: 'Nyaungdon',
      street_address: 'Bo Min Road',
    },
  },
  {
    id: 3,
    name: 'School3',
    contact_info: '+95090987655',
    address: {
      id: 5,
      division: 'ayeyarwaddy',
      district: 'Maubin',
      township: 'Nyaungdon',
      street_address: 'Bo Min Road',
    },
  },
  {
    id: 4,
    name: 'School4',
    contact_info: '+95090987657',
    address: {
      id: 6,
      division: 'ayeyarwaddy',
      district: 'Maubin',
      township: 'Nyaungdon',
      street_address: 'Bo Min Road',
    },
  },
]

export const fetchSchools = async () => {
  const { data } = await thingahaApiClient.get('/schools')

  return {
    data: {
      schools: data.schools,
    },
  }
}

export const createSchool = async (values) => {
  const { data } = await thingahaApiClient.post('/schools', values)

  return {
    school: data.school,
  }
}

export const updateSchool = async (values) => {
  const { data } = await thingahaApiClient.put(`/schools/${values.id}`, values)

  // Until api returns updated school data, we will just need to call the api again for now.
  const { data: schoolData } = await thingahaApiClient.get(
    `/schools/${values.id}`
  )

  return {
    school: schoolData.school,
  }
}
