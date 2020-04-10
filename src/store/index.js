import { createStore, combineReducers } from 'redux'
import framesReducer from './frames'
import frameReducer from './frame'


const reducers = combineReducers({
  frameReducer,
  framesReducer
})

const store = createStore(reducers)
export default store
