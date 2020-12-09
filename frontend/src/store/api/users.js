import last from 'lodash/last'
import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchUsers = async () => {
  const { data, error, status } = await thingahaApiClient.get('/users')

  return {
    data: {
      users: data.users,
    },
  }
}

export const createUser = async ({ name, email, password, role, country }) => {
  const { data } = await thingahaApiClient.post('/users', {
    name,
    email,
    password,
    role,
    country,
  })

  return {
    data: data.user,
  }
}

export const editUser = async ({ id, name, email, role, country }) => {
  const { data } = await thingahaApiClient.put(`/users/${id}`, {
    name,
    email,
    role,
    country,
  })

  return {
    data: data.user,
  }
}
