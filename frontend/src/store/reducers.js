import { combineReducers } from 'redux'

// import reducers below
import usersReducer from './reducers/users'
import donationsReducer from './reducers/donations'

export default combineReducers({
  users: usersReducer,
  donations: donationsReducer,
})
