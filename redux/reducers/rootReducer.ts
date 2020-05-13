import exampleReducer from './exampleReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  counter: exampleReducer
})

export default rootReducer;