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

  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    if (playing) {
      setTimeout(() => {goToFrame(nextFrameId())}, 1000/fps)
    }
  }, [props.currentFrame])

  const nextFrameId = () => {
    const frame = frames.find(f => f.id === currentFrame)
    const nextIndex = frames.indexOf(frame) + 1
    return frames[nextIndex > frames.length - 1 ? 0 : nextIndex].id
  }

  const toggleAnimation = () => {
    if (playing) {
      stop()
    } else {
      play()
      currentFrame ? goToFrame(nextFrameId()) : goToFrame(0)
    }
  }

  const canExport = () => {
    if (exporting) {
      return false
    }
    const frame = frames.find(f => f.id === currentFrame)
    return frame ? frame.saved : true
  }

  const exportStarted = () => {
    setExporting(true)
    setTimeout(() => {setExporting(false)}, 4000)
  }

  return(
    <div className="submenu">
      <div className="submenu-header">
        Animation
      </div>
      <div className="submenu-actions">
        <input type="number" className="submenu-el" style={{fontSize: '12px', width: '50px', textAlign: 'center'}} onChange={(e) => setFps(e.target.value)} defaultValue={fps}/>
        <a href={`/animations/${animationId}/export?fps=${fps}`} onClick={exportStarted} className={canExport() ? "submenu-el" : "submenu-el disabled"} download>
          <i className="fas fa-download submenu-el"></i>
        </a>
        <i className={playing ? "fas fa-pause-circle submenu-el" : "fas fa-play-circle submenu-el"} style={{ color: '#FF9B71' }} onClick={toggleAnimation}></i>
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
