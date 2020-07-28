import axios from 'axios'
import last from 'lodash/last'
axios.defaults.baseURL = 'https://backenddomain' // set backend domain

const usersDb = [
  {
    id: 1,
    username: 'naruto',
    email: 'naruto@example.com',
    address: '88, Strand Road, Kyauktada Township, Yangon.',
    role: 'admin',
    country: 'mm',
  },
  {
    id: 2,
    username: 'sasuke',
    email: 'sasuke@example.com',
    address: '2 Chome-8-1 Nishishinjuku, Shinjuku City, Tokyo 163-800',
    role: 'donator',
    country: 'jp',
  },
  {
    id: 3,
    username: 'sakura',
    email: 'sakura@example.com',
    address: '4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011',
    role: 'donator',
    country: 'jp',
  },
  {
    id: 4,
    username: 'kakashi',
    email: 'kakashi@example.com',
    address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-8634',
    role: 'donator',
    country: 'jp',
  },
]

export const fetchUsers = async () => {
  // mock response for users api call

  return {
    data: {
      users: usersDb,
    },
  }
}

export const createUser = async (userFormValues) => {
  const newUser = { ...userFormValues, id: last(usersDb).id + 1 }
  usersDb.push(newUser)
  return {
    data: newUser,
  }
}
