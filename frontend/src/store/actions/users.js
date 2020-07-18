export const GET_ALL_USERS = 'USERS/ALL'

export const fetchUsers = () => {
  return (dispatch) =>
    dispatch({
      type: GET_ALL_USERS,
    })
}
