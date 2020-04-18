import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
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

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
export default store
