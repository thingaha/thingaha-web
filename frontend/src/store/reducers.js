import { combineReducers } from 'redux'

// import reducers below
import authenticationReducer from './reducers/authentication'
import usersReducer from './reducers/users'
import donationsReducer from './reducers/donations'
import schoolsReducer from './reducers/schools'
import addressesReducer from './reducers/addresses'

export default combineReducers({
  authentication: authenticationReducer,
  users: usersReducer,
  donations: donationsReducer,
  schools: schoolsReducer,
  addresses: addressesReducer,
})
