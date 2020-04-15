const initialState = {
  height: 720,
  width: 1280,
}

//=================================
//============CONSTANTS============
//=================================

const SET_HEIGHT = 'format/height'
const SET_WIDTH = 'format/width'

//=================================
//=============GETTERS=============
//=================================

const selectReducer = state => state.formatReducer

export const getFormat = state => selectReducer(state)

//=================================
//=============ACTIONS=============
//=================================

export const setHeight = height =>  ({ type: SET_HEIGHT, payload: height})

export const setWidth = width =>  ({ type: SET_WIDTH, payload: width})

//=================================
//=============REDUCER=============
//=================================

const Format = (state = initialState, action) => {
  const {type, payload} = action;
  switch(type){
    case SET_WIDTH:
      return { ...state, width: payload}
    case SET_HEIGHT:
      return { ...state, height: payload}
    default:
      return state
  }
}

export default Format
