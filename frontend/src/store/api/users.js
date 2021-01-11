import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchUsers = async () => {
  const { data } = await thingahaApiClient.get('/users')

  return {
    data: {
      users: data.users,
    },
  }
}

export const createUser = async ({
  username,
  display_name,
  email,
  password,
  role,
  country,
}) => {
  const { data } = await thingahaApiClient.post('/users', {
    username,
    display_name,
    email,
    password,
    role,
    country,
  })

  return {
    data: data.user,
  }
}

export const editUser = async ({
  id,
  username,
  display_name,
  email,
  role,
  country,
}) => {
  const { data } = await thingahaApiClient.put(`/users/${id}`, {
    username,
    display_name,
    email,
    role,
    country,
  })

  return {
    data: data.user,
  }
}
