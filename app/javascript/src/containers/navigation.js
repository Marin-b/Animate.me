import React, { useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
import { Miniature } from '../components'
import { getFrames,
         getCurrentFrame,
         getBackground,
         newFrame,
         goToFrame
       } from '../store/frames'
import { getPlaying } from '../store/animation'

const Navigation = (props) => {
    const {
          currentFrameId,
          background,
          newFrame,
          goToFrame,
          playing
        } = props
  const [frames, setFrames] = useState(props.frames)
  let scrollingLeft
  let scrollingRight
  const framesContainer = useRef(null)

  let navScroll = framesContainer.current ? framesContainer.current.scrollLeft : 0

  useEffect(() => {
    setFrames(props.frames)
    if (props.frames.length !== frames.length) {
      setTimeout(scrollToEnd, 200)
    }
  }, [props.frames])

  const scrollToEnd = () => {
    navScroll = framesContainer.current.scrollWidth - framesContainer.current.offsetWidth
    framesContainer.current.scrollLeft = navScroll
  }

  const scrollLeft = () => {
    if (scrollingLeft) {
      if (navScroll <= 0) {
        navScroll = 0
        scrollingLeft = false
      } else {
        navScroll = navScroll - 20
      }
      framesContainer.current.scrollLeft = navScroll
      requestAnimationFrame(scrollLeft, 100)
    }
  }

  const scrollRight = () => {
    if (scrollingRight) {
      if (framesContainer.current.scrollLeft >= framesContainer.current.scrollWidth - framesContainer.current.offsetWidth) {
        navScroll = framesContainer.current.scrollWidth - framesContainer.current.offsetWidth
        scrollingRight = false
      } else {
        navScroll = navScroll + 20
      }
      framesContainer.current.scrollLeft = navScroll
      requestAnimationFrame(scrollRight, 100)
    }
  }

  const initScrollLeft = () => {
    scrollingLeft = true
    scrollLeft();
  }

  const initScrollRight = () => {
    scrollingRight = true
    scrollRight();
  }

  const stopScroll = () => {
    scrollingRight = false
    scrollingLeft = false
  }


  const miniatureClick = (frameId) => {
    if (!playing) {
      goToFrame(frameId)
    }
  }

  return(
     <div id="actions">
        <div id="background-container">
         { background &&  <div style={{position: 'relative'}}>
             <Miniature content={background.content} clickEvent={() => {miniatureClick(background.id)}} selected={currentFrameId === background.id}/>
             <div style={{position: 'absolute', bottom: '5px', right: 'calc(1vh + 5px)'}}>Background</div>
           </div>}
        </div>
        <div id="frames-wrapper" >
          <div className="scroll-actions" onMouseDown={initScrollLeft} onMouseUp={stopScroll} onTouchStart={initScrollLeft} onTouchEnd={stopScroll}>
            <i className="fas fa-chevron-left fa-2x"></i>
          </div>
          <div className="frames-container" ref={framesContainer}>
            {frames.map((frame, i) => (
              <div style={{position: 'relative'}} key={frame.id}>
                <Miniature  content={frame.content} selected={currentFrameId === frame.id} clickEvent={() => {miniatureClick(frame.id)}} />
                {frame && <div style={{position: 'absolute', bottom: '5px', right: 'calc(1vh + 5px)'}}> {i + 1} </div>}
              </div>
            ))}
          </div>
          <div className="scroll-actions" onMouseDown={initScrollRight} onMouseUp={stopScroll} onTouchStart={initScrollRight} onTouchEnd={stopScroll}>
            <i className="fas fa-chevron-right fa-2x"></i>
          </div>
        </div>
        <div className="add-frame btn-primary" onClick={newFrame}>
          Add a Frame
        </div>
      </div>
  )
}

const mapStateToProps = (state) => ({
  frames: getFrames(state),
  currentFrameId: getCurrentFrame(state),
  background: getBackground(state),
  playing: getPlaying(state)
})

const mapDispatchToProps = {
  newFrame,
  goToFrame
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
