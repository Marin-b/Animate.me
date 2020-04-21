import swal from 'sweetalert'
import { postApi, patchApi, deleteApi } from '../helpers/api'

const initialState = {
  frames: [],
  background: undefined,
};

//=================================
//============CONSTANTS============
//=================================
const NEW_FRAME = 'frames/new'
const GO_TO_FRAME = 'frames/go-to'
const CHANGE_FRAME = 'frames/change'
const SAVE_FRAME = 'frames/save'
const SAVE_BACKGROUND = 'frames/save-background'
const DELETE_FRAME = 'frames/delete'
const INITIALIZE = 'frames/initialize'

//=================================
//=============GETTERS=============
//=================================

const selectReducer = state => state.framesReducer

export const getFrames = state => selectReducer(state).frames.filter(f => f.id !== getBackgroundId(state))

export const getBackgroundId = state => selectReducer(state).background

export const getAllFrames = state => selectReducer(state).frames

export const getCurrentFrame = state => selectReducer(state).currentFrame

export const getBackground = state => selectReducer(state).frames.find(f => f.id === getBackgroundId(state))

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
        dispatch(saveFrame(id))
      })
  }
}

export const destroyFrame = (id) => {
  return (dispatch, getState) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this frame?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        return deleteApi(`/animations/${getAnimationId(getState())}/frames/${id}`)
          .then(res => res.json())
          .then(data => {
            dispatch(deleteFrame(data.id))
          })
      }
    });
  }
}

const saveFrame = (id) => ({ type: SAVE_FRAME, payload: id })

export const changeFrame = (id, content) => ({ type: CHANGE_FRAME, payload: { id, content } })

export const goToFrame = (index) => ({ type: GO_TO_FRAME, payload: index })

export const saveBackground = (content) => ({ type: SAVE_BACKGROUND, payload: content })

export const initialize = (payload) => ({ type: INITIALIZE, payload })

export const deleteFrame = (id) => ({type: DELETE_FRAME, payload: id})

//=================================
//=============REDUCER=============
//=================================

const frames = (state = initialState, action) => {
  const {type, payload} = action;
  let currentFrame
  let frames
  let index
  switch(type){
    case NEW_FRAME:
      frames = [...state.frames, { id: payload.id, content: undefined, order: payload.order, saved: true }].sort((a, b) => { return a.order - b.order })
      currentFrame = payload.id
      return { ...state, frames , currentFrame}
    case GO_TO_FRAME:
      return { ...state, currentFrame: payload}
    case CHANGE_FRAME:
      frames = state.frames;
      const newFrame = state.frames.find(f => f.id === payload.id)
      index = state.frames.indexOf(newFrame)
      newFrame.saved = false
      newFrame.content = payload.content
      frames[index] = newFrame
      return { ...state, frames }
    case SAVE_BACKGROUND:
      const background = state.background
      background.content = payload
      return { ...state, background }
    case SAVE_FRAME:
      const f = state.frames.find(f => f.id === payload)
      index = state.frames.indexOf(f)
      f.saved = true
      frames = state.frames
      frames[index] = f
      return { ...state, frames}
    case DELETE_FRAME:
      const frame = state.frames.find(f => f.id === payload)
      index = state.frames.indexOf(frame)
      currentFrame = index > 0 ? state.frames[index - 1].id : state.background
      frames = state.frames.filter(f => f !== frame)
      return {...state, frames, currentFrame}
    case INITIALIZE:
      payload.frames.map(f => f.saved = true)
      return {...payload, currentFrame: payload.frames.length > 1 ? payload.frames[payload.frames.length - 2].id : payload.background }
    default:
      return state
  }
}

export default frames
