import { combineReducers } from 'redux'

// import reducers below
import usersReducer from './reducers/users'

export default combineReducers({
  users: usersReducer,
})
