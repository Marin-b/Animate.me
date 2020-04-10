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

  const [height, setHeight] = useState()
  const container = useRef(null)

  const setCanvasHeight = () => {
    console.log(window.window.orientation)
    console.log(container.current.offsetHeight)
    setHeight(container.current.offsetHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', setCanvasHeight);
    setCanvasHeight()
  }, [])

  return (
    <div id="frames" ref={container}>
      <Frame background content={background} saveContent={saveBackground} height={height}/>
      { currentFrame !== undefined && <Frame
          key={currentFrame}
          content={frames[currentFrame]}
          height={height}
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
