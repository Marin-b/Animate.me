import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { Frame } from '../components';
import { getFrames,
         getCurrentFrame,
         getBackground,
         newFrame,
         saveFrame,
         saveBackground,
         uploadFrame
       } from '../store/frames'
import { getPlaying } from '../store/animation'


const Frames = (props) => {
  const { currentFrame,
          background,
          frames,
          saveFrame,
          saveBackground,
          uploadFrame,
          playing
        } = props

  const container = useRef(null)

  return (
    <div id="frames" ref={container}>
      { background.id && <Frame background key={`background-${background.id}`} frame={background} saveContent={saveBackground} uploadFrame={uploadFrame} editing={!playing} />}
      { currentFrame !== undefined && currentFrame && !playing > 0 && <Frame
          key={`backlayer-${frames[currentFrame - 1].id}`}
          frame={frames[currentFrame - 1]}
          opacity={0.4}
          editing={false}
         /> }
      { currentFrame !== undefined && <Frame
          uploadFrame={uploadFrame}
          key={`canvas-${frames[currentFrame].id}`}
          frame={frames[currentFrame]}
          opacity={1}
          editing={!playing}
          saveContent={(content) => { saveFrame(currentFrame, content) }}/> }
    </div>
  )
}

const mapStateToProps = (state) => ({
  frames: getFrames(state),
  currentFrame: getCurrentFrame(state),
  background: getBackground(state),
  playing: getPlaying(state)
})

const mapDispatchToProps = {
  newFrame,
  saveFrame,
  saveBackground,
  uploadFrame
}

export default connect(mapStateToProps, mapDispatchToProps)(Frames)
