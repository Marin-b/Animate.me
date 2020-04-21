import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { Frame } from '../components';
import { getFrames,
         getCurrentFrame,
         getBackground,
         newFrame,
         changeFrame,
         saveBackground,
         uploadFrame,
       } from '../store/frames'
import { getPlaying } from '../store/animation'
import { getOverlay } from '../store/tools'

const Frames = (props) => {
  const { currentFrameId,
          background,
          frames,
          changeFrame,
          saveBackground,
          uploadFrame,
          playing,
          showOverlay
        } = props;

  const [currentFrame, setCurrentFrame] = useState(undefined)
  const [overlay, setOverlay] = useState(undefined)

  const setOverlayFrame = (newCurrentFrame) => {
    if (!newCurrentFrame) {
      return null;
    }
    const index = frames.indexOf(newCurrentFrame)
    console.log('changin overlay', index)
    setOverlay(index > 0 ? frames[index - 1] : null)
  }

  useEffect(() => {
    const newCurrentFrame = frames.find(f => f.id === props.currentFrameId)
    setCurrentFrame(newCurrentFrame)
    setOverlayFrame(newCurrentFrame)
  }, [props.currentFrameId])

  const container = useRef(null)

  return (
    <div id="frames" ref={container}>
      { background && <Frame background key="background" id="canvas-background" frame={background} saveContent={ (content) => changeFrame(background.id, content)} uploadFrame={uploadFrame} editing={!playing && background.id === currentFrameId} />}
      { showOverlay && overlay && <Frame key={`overlay-${overlay.id}`} id="canvas-overlay" frame={overlay} opacity={0.5} editing={false} />}
      { currentFrame !== undefined && <Frame
          uploadFrame={uploadFrame}
          id="canvas-drawing"
          key={`canvas-${currentFrame.id}`}
          frame={currentFrame}
          opacity={1}
          editing={!playing}
          saveContent={(content) => { changeFrame(currentFrame.id, content) }}/> }
    </div>
  )
}

const mapStateToProps = (state) => ({
  frames: getFrames(state),
  currentFrameId: getCurrentFrame(state),
  background: getBackground(state),
  playing: getPlaying(state),
  showOverlay: getOverlay(state)
})

const mapDispatchToProps = {
  newFrame,
  changeFrame,
  saveBackground,
  uploadFrame
}

export default connect(mapStateToProps, mapDispatchToProps)(Frames)
