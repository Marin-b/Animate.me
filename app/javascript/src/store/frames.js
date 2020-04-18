import { postApi, patchApi } from '../helpers/api'

const initialState = {
  frames: [],
  background: {},
}

//=================================
//============CONSTANTS============
//=================================
const NEW_FRAME = 'frames/new'
const GO_TO_FRAME = 'frames/go-to'
const SAVE_FRAME = 'frames/save'
const SAVE_BACKGROUND = 'frames/save-background'
const INITIALIZE = 'frames/initialize'

//=================================
//=============GETTERS=============
//=================================

const selectReducer = state => state.framesReducer

export const getFrames = state => selectReducer(state).frames

export const getCurrentFrame = state => selectReducer(state).currentFrame

export const getBackground = state => selectReducer(state).background

export const getAnimationId = state => selectReducer(state).animationid
//=================================
//=============ACTIONS=============
//=================================

export const newFrame = () => {
  return (dispatch, getState) => {
    return postApi(`/animations/${getAnimationId(getState())}/frames`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: NEW_FRAME, payload: { id: data.id, order: data.order } })
      })
  }
}

export const uploadFrame = (id) => {
 return (dispatch, getState) => {
    const frames = getFrames(getState())
    const frame = frames.find(el => el.id === id)
    const content = frame ? frame.content : getBackground(getState()).content
    return patchApi(`/animations/${getAnimationId(getState())}/frames/${id}`, { frame: { content } })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'nothing' })
      })
  }
}

export const saveFrame = (index, content) => ({ type: SAVE_FRAME, payload: { index, content } })

export const goToFrame = (index) => ({ type: GO_TO_FRAME, payload: index })

export const saveBackground = (content) => ({ type: SAVE_BACKGROUND, payload: content })

export const initialize = (payload) => ({ type: INITIALIZE, payload })


//=================================
//=============REDUCER=============
//=================================

const frames = (state = initialState, action) => {
  const {type, payload} = action;
  let currentFrame
  let frames
  switch(type){
    case NEW_FRAME:
      frames = [...state.frames, { id: payload.id, content: undefined, order: payload.order }].sort((a, b) => { return a.order - b.order })
      currentFrame = frames.length -1
      return { ...state, frames , currentFrame}
    case GO_TO_FRAME:
      return { ...state, currentFrame: payload}
    case SAVE_FRAME:
      frames = state.frames;
      frames[payload.index].content = payload.content
      return { ...state, frames: [...frames] }
    case SAVE_BACKGROUND:
      const background = state.background
      background.content = payload
      return { ...state, background }
    case INITIALIZE:
      return {...payload, currentFrame: payload.frames.length > 0 ? 0 : undefined}
    default:
      return state
  }
}

export default frames
