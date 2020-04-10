import React, { useState } from "react";
import { connect } from 'react-redux'
import { SketchPicker } from 'react-color'
import Slider from '@material-ui/core/Slider'
import { getColor, setColor, getLineWidth, setLineWidth } from '../store/tools'
const DrawingTools = (props) => {
  const {
    color,
    setColor,
    lineWidth,
    setLineWidth
  } = props
  console.log(lineWidth)
  const [isPickerOpen, setIsPickerOpen ] = useState(false)
  const [isSliderOpen, setIsSliderOpen] = useState(false)
  return(
    <div id='drawing-tools' style={{padding: '2vh'}}>
      <div className="color-container">
        <div style={{ backgroundColor: color, height: '5vh', width: '5vh', border: '1px solid #FF9B71'}} onClick={() => { setIsPickerOpen(!isPickerOpen)}}>
        </div>
        { isPickerOpen &&
          <div id="picker-dropdown">
            <SketchPicker color={color} onChange={ (newColor) => {setColor(newColor.hex) }}/>
          </div>
        }
      </div>
      <div className="line-width-container" style={{height: '5vh', width: '5vh', borderRadius: '50%'}} onClick={() => { setIsSliderOpen(!isSliderOpen)}}>
        <div className="line-width" style={{ height: `calc(calc(5vh / 150) * ${lineWidth})`, width: `calc(calc(5vh / 150) * ${lineWidth})`}}>
        </div>
        { isSliderOpen &&
          <div id="slider-dropdown">
            <Slider orientation='vertical' value={lineWidth ? lineWidth : 10} onChange={(e, v) => {setLineWidth(v)}} max={150}/>
          </div>
        }
      </div>
      <div class="erase" onClick={() => {setColor( "rgba(0, 0, 200, 0)")}}>
        h
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  color: getColor(state),
  lineWidth: getLineWidth(state)
})

const mapDispatchToProps  = {
  setColor,
  setLineWidth
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawingTools)
