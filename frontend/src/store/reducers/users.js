import { GET_ALL_USERS } from '../actions/users'

const getUsers = () => {
  return [
    {
      id: 1,
      user_name: 'naruto',
      email: 'naruto@example.com',
      address: '88, Strand Road, Kyauktada Township, Yangon.',
      role: 'admin',
      country: 'mm',
    },
    {
      id: 2,
      user_name: 'sasuke',
      email: 'sasuke@example.com',
      address: '2 Chome-8-1 Nishishinjuku, Shinjuku City, Tokyo 163-800',
      role: 'donator',
      country: 'jp',
    },
    {
      id: 3,
      user_name: 'sakura',
      email: 'sakura@example.com',
      address: '4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011',
      role: 'donator',
      country: 'jp',
    },
    {
      id: 4,
      user_name: 'kakashi',
      email: 'kakashi@example.com',
      address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-8634',
      role: 'donator',
      country: 'jp',
    },
  ]
}

export default (state = { users: [] }, action) => {
  console.log('From get users', state, action)

  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: getUsers(),
      }

    default:
      return state
  }
}
