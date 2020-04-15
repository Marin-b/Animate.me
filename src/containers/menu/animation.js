import React, { useEffect, useState } from "react";
import { connect } from "react-redux"
import { getFrames, getCurrentFrame, goToFrame } from "../../store/frames"
import { getPlaying, getFps, setFps, play, stop } from "../../store/animation"

const Animation = (props) => {
  const {
    currentFrame,
    frames,
    goToFrame,
    fps,
    setFps,
    play,
    stop,
    playing
  } = props


  useEffect(() => {
    if (playing) {
      console.log(nextFrame())
      setTimeout(() => {goToFrame(nextFrame())}, 1000/fps)
      console.log('frame changed')
    }
  }, [props.currentFrame])

  const nextFrame = () => currentFrame === frames.length - 1 ? 0 : currentFrame + 1

  const toggleAnimation = () => {
    if (playing) {
      stop()
    } else {
      play()
      goToFrame(nextFrame())
    }
  }

  return(
    <div className="submenu">
      <div className="submenu-header">
        Animation
      </div>
      <div className="submenu-actions">
        <input type="number" onChange={(e) => setFps(e.target.value)} defaultValue={fps}/>
        <i className="fas fa-play-circle" style={{fontSize: '40px', color: '#FF9B71'}} onClick={toggleAnimation}></i>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  goToFrame,
  play,
  stop,
  setFps
}

const mapStateToProps = state => ({
  frames: getFrames(state),
  currentFrame: getCurrentFrame(state),
  playing: getPlaying(state),
  fps: getFps(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Animation)
