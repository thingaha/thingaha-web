export const GET_ALL_USERS = 'USERS/GET_ALL'

export const fetchUsers = () => {
  return {
    type: GET_ALL_USERS,
  }
}
