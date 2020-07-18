import { createStore } from 'redux'
import combinedReducer from './reducers'

const initialState = {
  users: [],
}

const store = createStore(combinedReducer, initialState)

export default store
