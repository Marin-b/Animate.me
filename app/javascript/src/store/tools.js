const initialState = {
  color: 'black',
  lineWidth: 20,
  mode: 'draw',
  undoStack: [],
  redoStack: [],
  overlay: false
}

//=================================
//============CONSTANTS============
//=================================

const SET_COLOR = 'tools/set-color'
const SET_MODE = 'tools/set-mode'
const SET_LINE_WIDTH = 'tools/set-line-width'
const SET_OVERLAY = 'tools/set-overlay'
//=================================
//=============GETTERS=============
//=================================

const selectReducer = state => state.toolsReducer

export const getColor = state => selectReducer(state).color

export const getLineWidth = state => selectReducer(state).lineWidth

export const getMode = state => selectReducer(state).mode

export const getOverlay = state => selectReducer(state).overlay
//=================================
//=============ACTIONS=============
//=================================

export const setLineWidth = (lineWidth) => ({ type: SET_LINE_WIDTH, payload: lineWidth })

export const setColor = (color) => ({ type: SET_COLOR, payload: color })

export const setMode = (mode) => ({ type: SET_MODE, payload: mode })

export const setOverlay = payload => ({ type: SET_OVERLAY, payload })


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
    case SET_MODE:
      return { ...state, mode: payload }
    case SET_OVERLAY:
      return { ...state, overlay: payload}
    default:
      return state
  }
}

export default tools
