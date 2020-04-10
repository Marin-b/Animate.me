const initialState = {
  color: 'red',
  lineWidth: 40
}

//=================================
//============CONSTANTS============
//=================================

const SET_COLOR = 'tools/set-color'
const SET_LINE_WIDTH = 'tools/set-line-width'

//=================================
//=============GETTERS=============
//=================================

const selectReducer = state => state.toolsReducer

export const getColor = state => selectReducer(state).color

export const getLineWidth = state => selectReducer(state).lineWidth


//=================================
//=============ACTIONS=============
//=================================

export const setLineWidth = (lineWidth) => ({ type: SET_LINE_WIDTH, payload: lineWidth })

export const setColor = (color) => ({ type: SET_COLOR, payload: color })


//=================================
//=============REDUCER=============
//=================================

const tools = (state = initialState, action) => {
  const {type, payload} = action;
  switch(type){
    case SET_COLOR:
      return { ...state, color: payload }
    case SET_LINE_WIDTH:
      return { ...state, lineWidth: payload }
    default:
      return state
  }
}

export default tools
