import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchUsers = async ({ page, perPage }) => {
  const { data } = await thingahaApiClient.get('/users', {
    params: { page, per_page: perPage },
  })

  return {
    data: {
      users: data.users,
    },
  }
}

export const editUserDetail = async ({
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

export const editPassword = async ({
  id,
  password
}) => {
  const { data } = await thingahaApiClient.put(`/users/${id}`, {
    password
  })

  return {
    data: data.user,
  }
}
