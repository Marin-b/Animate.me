import React, { useState } from "react";
import { connect } from 'react-redux'
import { SketchPicker } from 'react-color'
import Slider from '@material-ui/core/Slider'
import { getColor, setColor, getLineWidth, setLineWidth } from '../../store/tools'

const CanvasTools = (props) => {
  const {
    color,
    setColor,
    lineWidth,
    setLineWidth
  } = props

  const [isPickerOpen, setIsPickerOpen ] = useState(false)
  const [isSliderOpen, setIsSliderOpen] = useState(false)

  return(
    <div className='submenu'>
      <div className="submenu-header">
        Canvas tools
      </div>
      <div className="submenu-actions">
        <div className="color-container">
          <div style={{ backgroundColor: color, height: '40px', width: '40px', borderRadius: '5px' }} onClick={() => { setIsPickerOpen(!isPickerOpen)}}>
          </div>
          { isPickerOpen &&
            <div id="picker-dropdown">
              <SketchPicker color={color} onChange={ (newColor) => {setColor(newColor.hex) }}/>
            </div>
          }
        </div>
        <div className="line-width-container" style={{height: '40px', width: '40px', borderRadius: '50%'}} onClick={() => { setIsSliderOpen(!isSliderOpen)}}>
          <div className="line-width" style={{ height: `calc(calc(40px / 100) * ${lineWidth})`, width: `calc(calc(40px / 100) * ${lineWidth})`}}>
          </div>
          { isSliderOpen &&
            <div id="slider-dropdown">
              <Slider orientation='vertical' value={lineWidth ? lineWidth : 10} onChange={(e, v) => {setLineWidth(v)}} max={100} min={1}/>
            </div>
          }
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CanvasTools)
