const initialState = {
  frames: [],
  currentFrame: undefined,
  background: undefined
}

//=================================
//============CONSTANTS============
//=================================
const NEW_FRAME = 'frames/new'
const GO_TO_FRAME = 'frames/go-to'
const SAVE_FRAME = 'frames/save'
const SAVE_BACKGROUND = 'frames/save-background'

//=================================
//=============GETTERS=============
//=================================

const selectReducer = state => state.framesReducer

export const getFrames = state => selectReducer(state).frames

export const getCurrentFrame = state => selectReducer(state).currentFrame

export const getBackground = state => selectReducer(state).background

//=================================
//=============ACTIONS=============
//=================================

export const newFrame = () => ({ type: NEW_FRAME })

export const saveFrame = (index, content) => ({ type: SAVE_FRAME, payload: { index, content }})

export const goToFrame = (index) => ({ type: GO_TO_FRAME, payload: index })

export const saveBackground = (content) => ({ type: SAVE_BACKGROUND, payload: content})

//=================================
//=============REDUCER=============
//=================================

const frames = (state = initialState, action) => {
  const {type, payload} = action;
  let currentFrame
  let frames
  switch(type){
    case NEW_FRAME:
      frames = [...state.frames, undefined]
      currentFrame = frames.length -1
      return { ...state, frames , currentFrame}
    case GO_TO_FRAME:
      return { ...state, currentFrame: payload}
    case SAVE_FRAME:
      frames = state.frames;
      frames[payload.index] = payload.content
      return { ...state, frames: [...frames] }
    case SAVE_BACKGROUND:
      return { ...state, background: payload }
    default:
      return state
  }
}

export default frames
