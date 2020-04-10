import React, { useState, useRef, useEffect } from "react";

const Frame = (props) => {
  const [drawing, setDrawing] = useState(false);
  const [ctx, setCtx] = useState(undefined)
  const [X, setX] = useState(undefined)
  const [Y, setY] = useState(undefined)
  const canvas = useRef(null)

  useEffect(() => {
    console.log('useeffect', canvas.current)
    const newCtx = canvas.current.getContext('2d')
    setCtx(newCtx)
    if (props.content) {
      var img = new Image;
      img.onload = function(){
        newCtx.drawImage(img,0,0);
      };
      img.src = props.content;
    }
    setTimeout( () => {props.saveContent(canvas.current.toDataURL())}, 100)
  }, [])

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
    setDrawing(true)
    const { x, y } = getPenPos(canvas, clientX, clientY)
    setX(x)
    setY(y)
  }

  const endDrawing = () => {
    setDrawing(false)
    props.saveContent(canvas.current.toDataURL())
  }

  const handleMouseMove = (e) => {
    if(drawing) {
      const {x, y } = getPenPos(canvas, e.clientX, e.clientY)
      draw(x, y)
    }
  }

  const handleTouchMove = (e) => {
     if(drawing) {
      const {x, y } = getPenPos(canvas, e.touches[0].clientX, e.touches[0].clientY)
      draw(x, y)
    }
  }

  const draw = (drawX, drawY) => {
    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.lineTo(drawX , drawY );
    ctx.lineWidth=3;
    ctx.stroke();
    setX(drawX)
    setY(drawY)

  }

  return(
    <div className={props.background ? "frame background" : "frame"} style={{height: `${props.height}px`}}>
      <canvas
        ref={canvas}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={endDrawing}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={endDrawing}
        height={`${props.height}px`}
        width={`${window.innerWidth}px`}
      />
    </div>
  )
}

export default Frame
