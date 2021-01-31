import { combineReducers } from 'redux'

// import reducers below
import authenticationReducer from './reducers/authentication'
import usersReducer from './reducers/users'
import donationsReducer from './reducers/donations'
import schoolsReducer from './reducers/schools'
import addressesReducer from './reducers/addresses'
import studentsReducer from './reducers/students'
import transfersReducer from './reducers/transfers'
import attendancesReducer from './reducers/attendances'
import configDataReducer from './reducers/configData'

export default combineReducers({
  authentication: authenticationReducer,
  users: usersReducer,
  donations: donationsReducer,
  schools: schoolsReducer,
  addresses: addressesReducer,
  students: studentsReducer,
  transfers: transfersReducer,
  attendances: attendancesReducer,
  configData: configDataReducer,
})
