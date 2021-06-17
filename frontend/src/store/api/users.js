import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchUser = async (userId) => {
  const { data } = await thingahaApiClient.get(`/users/${userId}`)
  return {
    data: {
      user: data.user,
    },
  }
}

export const fetchUsers = async ({ page, perPage }) => {
  const { data } = await thingahaApiClient.get('/users', {
    params: { page, per_page: perPage },
  })

  return {
    data: {
      users: data.users,
      total_count: data.total_count,
      total_pages: data.pages,
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

export const passwordReset = async ({
  user_id,
  password,
}) => {
  const { data } = await thingahaApiClient.put(`/users/reset_password`, {
    user_id,
    password,
  })

  return {
    data: data,
  }
}
