import thingahaApiClient from '../../utils/thingahaApiClient'

export const fetchUser = async (userId) => {
  const { data } = await thingahaApiClient.get(`/users/${userId}`)
  return {
    data: {
      user: data.user,
    },
  }
}

export const fetchUsers = async () => {
  const { data } = await thingahaApiClient.get('/users')

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
  address: { district, division, street_address, township },
}) => {
  const { data } = await thingahaApiClient.put(`/users/${id}`, {
    id,
    username,
    display_name,
    email,
    role,
    country,
    address: {
      district,
      division,
      street_address,
      township,
    },
  })

  return {
    data: data.user,
  }
}

export const editUserPassword = async ({
  current_password,
  new_password,
  new_confirm_password,
}) => {
  const { data } = await thingahaApiClient.put(`/users/password`, {
    current_password,
    new_password,
    new_confirm_password,
  })

  return {
    data: data,
  }
}
