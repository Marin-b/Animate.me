import { createStore, combineReducers } from 'redux'
import framesReducer from './frames'
import  toolsReducer from './tools'


const reducers = combineReducers({
  framesReducer,
  toolsReducer
})

const store = createStore(reducers)
export default store
