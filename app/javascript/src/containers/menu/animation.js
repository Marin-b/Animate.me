import React, { useEffect, useState } from "react";
import { connect } from "react-redux"
import { getFrames, getCurrentFrame, goToFrame, getAnimationId } from "../../store/frames"
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
    playing,
    animationId
  } = props


  useEffect(() => {
    if (playing) {
      setTimeout(() => {goToFrame(nextFrame())}, 1000/fps)
    }
  }, [props.currentFrame])

  const nextFrame = () => currentFrame === frames.length - 1 ? 0 : currentFrame + 1

  const toggleAnimation = () => {
    if (playing) {
      stop()
    } else {
      play()
      currentFrame ? goToFrame(nextFrame()) : goToFrame(0)
    }
  }

  return(
    <div className="submenu">
      <div className="submenu-header">
        Animation
      </div>
      <div className="submenu-actions">
        <input type="number" onChange={(e) => setFps(e.target.value)} defaultValue={fps}/>
        <i className={playing ? "fas fa-pause-circle" : "fas fa-play-circle"} style={{fontSize: '40px', color: '#FF9B71'}} onClick={toggleAnimation}></i>
        <a href={`/animations/${animationId}/export`} download>
          <i className="fas fa-download" style={{fontSize: '40px', color: '#FF9B71'}}></i>
        </a>
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
  fps: getFps(state),
  animationId: getAnimationId(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Animation)
