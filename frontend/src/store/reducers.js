import { combineReducers } from 'redux'

// import reducers below
import authenticationReducer from './reducers/authentication'
import usersReducer from './reducers/users'
import donationsReducer from './reducers/donations'

export default combineReducers({
  authentication: authenticationReducer,
  users: usersReducer,
  donations: donationsReducer,
})
