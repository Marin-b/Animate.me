import React, { useState } from "react";
import { connect } from 'react-redux'
import { SketchPicker } from 'react-color'
import Slider from '@material-ui/core/Slider'
import { getColor, setColor, getLineWidth, setLineWidth, setMode, getMode, setOverlay, getOverlay } from '../../store/tools'

const CanvasTools = (props) => {
  const {
    color,
    setColor,
    lineWidth,
    setLineWidth,
    mode,
    setMode,
    overlay,
    setOverlay
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
          <div className="submenu-el" style={{ backgroundColor: color, borderRadius: '5px' }} onClick={() => { setIsPickerOpen(!isPickerOpen)}}>
          </div>
          { isPickerOpen &&
            <div id="picker-dropdown">
              <SketchPicker color={color} onChange={ (newColor) => {setColor(`rgba(${newColor.rgb.r}, ${newColor.rgb.g}, ${newColor.rgb.b}, ${newColor.rgb.a})`) }}/>
            </div>
          }
        </div>
        <div className="submenu-el line-width-container" style={{borderRadius: '50%'}} onClick={() => { setIsSliderOpen(!isSliderOpen)}}>
          <div className="line-width" style={{ height: `calc(calc(30px / 60) * ${lineWidth})`, width: `calc(calc(30px / 60) * ${lineWidth})`}}>
          </div>
          { isSliderOpen &&
            <div id="slider-dropdown">
              <Slider orientation='vertical' trackSize={50} value={lineWidth ? lineWidth : 10} onChange={(e, v) => {setLineWidth(v)}} max={60} min={2}/>
            </div>
          }
        </div>
        <i className="fas fa-eraser submenu-el" style={{color: mode === 'erase' ? '#FF9B71' : 'black'}} onClick={() => {
          console.log('seeting to', mode === 'erase' ? 'draw' : 'erase')
          setMode(mode === 'erase' ? 'draw' : 'erase')
        }}></i>
        <i className="fas fa-eye-dropper submenu-el" onClick={() => {setMode(mode === 'picker' ? 'draw' : 'picker')}} style={{color: mode === 'picker' ? '#FF9B71' : 'black'}}></i>
        <i className="far fa-clone submenu-el" style={{color: overlay ? '#FF9B71' : 'black'}} onClick={() => setOverlay(!overlay)}></i>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  color: getColor(state),
  lineWidth: getLineWidth(state),
  mode: getMode(state),
  overlay: getOverlay(state)
})

const mapDispatchToProps  = {
  setColor,
  setLineWidth,
  setMode,
  setOverlay
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasTools)
