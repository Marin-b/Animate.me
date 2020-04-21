import React, { useState, useRef, useEffect } from "react";
import { connect } from 'react-redux'
import { getColor, getLineWidth, getMode } from "../store/tools"
import { getFormat } from "../store/format"

const Frame = (props) => {
  const [drawing, setDrawing] = useState(false);
  const [ctx, setCtx] = useState(undefined)
  const [X, setX] = useState(undefined)
  const [Y, setY] = useState(undefined)
  const canvas = useRef(null)

  const { lineWidth, color, format, uploadFrame, editing, mode } = props

  const loadContent = (ctx) => {
    var img = new Image;
    img.onload = function(){
      ctx.drawImage(img,0,0);
    };
    img.src = props.frame.content;
  }

  useEffect(() => {
    const newCtx = canvas.current.getContext('2d')
    setCtx(newCtx)

    if (props.frame.content) {
      loadContent(newCtx)
    } else if (props.saveContent) {
      // set content after the creation of frame
      setTimeout(() => {props.saveContent(canvas.current.toDataURL())}, 100)
    }

    return () => {
      if (!props.frame.saved) {
        uploadFrame(props.frame.id)
      }
    }
  }, [])

  useEffect( () => {
    if (!props.editing && !props.frame.saved && props.uploadFrame) {
      uploadFrame(props.frame.id)
    }
  }, [props.editing])

  const getPenPos = (canvas, clientX, clientY) => {
   var rect = canvas.current.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.current.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.current.height / rect.height;  // relationship bitmap vs. element for Y

    return {
      x: (clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
  }

  const handleMouseDown = (e) => {
    startDrawing(e.clientX, e.clientY)
  }

  const handleTouchStart = (e) => {
    startDrawing(e.touches[0].clientX, e.touches[0].clientY)
  }

  const startDrawing = (clientX, clientY) => {
    if (!editing) {
      return
    }
    setDrawing(true)
    const { x, y } = getPenPos(canvas, clientX, clientY)
    setX(x)
    setY(y)
    ctx.globalCompositeOperation = mode === 'draw' ? 'source-over' : 'destination-out'
    ctx.beginPath();
    ctx.arc(x, y, lineWidth / 2, 0, 2 * Math.PI)
    ctx.fill()
    ctx.beginPath()
  }

  const endDrawing = () => {
    setDrawing(false)
    props.saveContent(canvas.current.toDataURL())
  }

  const handleMouseMove = (e) => {
    if(drawing) {
      const { x, y } = getPenPos(canvas, e.clientX, e.clientY)
      draw(x, y)
    }
  }

  const handleTouchMove = (e) => {
    if(drawing) {
      const { x, y } = getPenPos(canvas, e.touches[0].clientX, e.touches[0].clientY)
      draw(x, y)
    }
  }

  const draw = (drawX, drawY) => {
    ctx.moveTo(X, Y);
    ctx.lineTo(drawX , drawY );
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';
    ctx.stroke();
    setX(drawX)
    setY(drawY)
  }

  return(
      <canvas
        className={props.background ? "canvas frame background" : "canvas frame"}
        style={{ opacity: props.opacity ? props.opacity : 1 }}
        ref={canvas}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={endDrawing}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={endDrawing}
        height={format.height}
        width={format.width}
      />
  )
}

const mapStateToProps = (state) => ({
  color: getColor(state),
  lineWidth: getLineWidth(state),
  format: getFormat(state),
  mode: getMode(state)
})

export default connect(mapStateToProps)(Frame)
