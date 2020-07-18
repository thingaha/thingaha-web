import { createStore, applyMiddleware } from 'redux'
import combinedReducer from './reducers'
import thunk from 'redux-thunk'

const store = createStore(combinedReducer, applyMiddleware(thunk))

export default store
