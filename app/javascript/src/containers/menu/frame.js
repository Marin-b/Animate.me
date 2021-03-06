import React from "react";
import { connect } from "react-redux"
import { uploadFrame, getCurrentFrame, getFrames, getBackground, destroyFrame } from "../../store/frames"
import { getPlaying } from '../../store/animation'

const Frame = (props) => {
  const {uploadFrame, currentFrameId, frames, background, destroyFrame, playing} = props

  const isCurrentFrameSaved = () => {
    const currentFrame = frames.find(f => f.id === currentFrameId)
    console.log('recheck')
    return currentFrame ? currentFrame.saved : background ? background.saved : true
  }

  const cannotDestroyFrame = () => {
    if (playing) {
      return true
    }
    return background ? currentFrameId === background.id : false
  }

  return(
    <div className="submenu">
      <div className="submenu-header">
        Frame
      </div>
      <div className="submenu-actions">
        <i className={`submenu-el fas fa-trash-alt ${ cannotDestroyFrame() ? 'disabled' : ''}`} onPointerDown={() => destroyFrame(currentFrameId)} style={{}}></i>
        <i className={`fas fa-save submenu-el ${isCurrentFrameSaved() ? 'disabled' : ''} `} onPointerDown={() => uploadFrame(currentFrameId)}></i>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  frames: getFrames(state),
  currentFrameId: getCurrentFrame(state),
  background: getBackground(state),
  playing: getPlaying(state)
})

const mapDispatchToProps = {
  uploadFrame,
  destroyFrame
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame)
