import exampleReducer from './exampleReducer'
import { combineReducers } from 'redux'
import { ExpansionPanelSummary } from '@material-ui/core';



const rootReducer = combineReducers({
  count: exampleReducer,
  light: exampleReducer,
  lastUpdate: exampleReducer,
})

export default rootReducer;