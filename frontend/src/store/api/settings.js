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

export const changePassword = async ({
  currentPassword,
  newPassword,
  newPasswordConfirmation,
}) => {
  const { data } = await thingahaApiClient.put(`/users/password`, {
    current_password: currentPassword,
    new_password: newPassword,
    new_confirm_password: newPasswordConfirmation,
  })

  return {
    data: data,
  }
}
