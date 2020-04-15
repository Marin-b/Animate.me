import React, { useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
import { Miniature } from '../components'
import { getFrames,
         getCurrentFrame,
         getBackground,
         newFrame,
         goToFrame
       } from '../store/frames'

const Navigation = (props) => {
    const {
          currentFrame,
          background,
          newFrame,
          goToFrame
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
      console.log(navScroll)
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
      console.log(framesContainer.current.scrollWidth, framesContainer.current.scrollLeft - framesContainer.current.offsetWidth)
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



  return(
     <div id="actions">
        <div id="background-container">
          <Miniature content={background} clickEvent={() => {goToFrame(undefined)}}/>
        </div>
        <div id="frames-wrapper" >
          <div className="scroll-actions" onMouseDown={initScrollLeft} onMouseUp={stopScroll} onTouchStart={initScrollLeft} onTouchEnd={stopScroll}>
            <i className="fas fa-chevron-left fa-2x"></i>
          </div>
          <div className="frames-container" ref={framesContainer}>
            {frames.map((frame, i) => (
              <div style={{position: 'relative'}}>
                <Miniature key={i} content={frame} selected={currentFrame === i} clickEvent={() => {goToFrame(i)}} />
                {frame && <div style={{position: 'absolute', bottom: '10px', right: '20px'}}> {i + 1} </div>}
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
  currentFrame: getCurrentFrame(state),
  background: getBackground(state)
})

const mapDispatchToProps = {
  newFrame,
  goToFrame
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
