import exampleReducer from './exampleReducer'
import { combineReducers } from 'redux'




const rootReducer = combineReducers({
  count: exampleReducer,
  light: exampleReducer,
  lastUpdate: exampleReducer,
})

export default rootReducer;