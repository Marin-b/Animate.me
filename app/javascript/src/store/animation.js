const initialState = {
  playing: false,
  fps: 12
}

//=================================
//============CONSTANTS============
//=================================

const PLAY = 'animation/play'
const STOP = 'animation/stop'
const SET_FPS = 'animation/set-fps'

//=================================
//=============GETTERS=============
//=================================

const selectReducer = state => state.animationReducer

export const getPlaying = state => selectReducer(state).playing

export const getFps = state => selectReducer(state).fps

//=================================
//=============ACTIONS=============
//=================================

export const play = () =>({ type: PLAY })

export const stop = () =>({ type: STOP })

export const setFps = (fps) => ({ type: SET_FPS, payload: fps })

//=================================
//=============REDUCER=============
//=================================

const Animation = (state = initialState, action) => {
  const {type, payload} = action;
  switch(type){
    case PLAY:
      return { ...state, playing: true }
    case STOP:
      return { ...state, playing: false }
    case SET_FPS:
      return { ...state, fps: payload }
    default:
      return state
  }
}

export default Animation
