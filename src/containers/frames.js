import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { Frame } from '../components';
import { getFrames,
         getCurrentFrame,
         getBackground,
         newFrame,
         saveFrame,
         saveBackground
       } from '../store/frames'



const Frames = (props) => {
  const { currentFrame,
          background,
          frames,
          saveFrame,
          saveBackground
        } = props

  const container = useRef(null)

  return (
    <div id="frames" ref={container}>
      <Frame background content={background} saveContent={saveBackground} />
      { currentFrame !== undefined && currentFrame > 0 && <Frame
          key={currentFrame - 1}
          content={frames[currentFrame - 1]}
          opacity={0.4}
         /> }
      { currentFrame !== undefined && <Frame
          key={currentFrame}
          content={frames[currentFrame]}
          opacity={1}
          saveContent={(content) => { saveFrame(currentFrame, content) }}/> }
    </div>
  )
}

const mapStateToProps = (state) => ({
  frames: getFrames(state),
  currentFrame: getCurrentFrame(state),
  background: getBackground(state)
})

const mapDispatchToProps = {
  newFrame,
  saveFrame,
  saveBackground
}

export default connect(mapStateToProps, mapDispatchToProps)(Frames)
