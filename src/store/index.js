import { createStore, combineReducers } from 'redux'
import framesReducer from './frames'
import toolsReducer from './tools'
import formatReducer from './format'
import animationReducer from './animation'

const reducers = combineReducers({
  framesReducer,
  toolsReducer,
  formatReducer,
  animationReducer
})

const store = createStore(reducers)
export default store
