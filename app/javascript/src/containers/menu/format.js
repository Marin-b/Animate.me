import React from "react";
import { connect } from "react-redux"
import { Select, MenuItem } from '@material-ui/core'
import { setHeight, setWidth, getFormat } from "../../store/format"

const Format = (props) => {
  const {
    setHeight,
    setWidth,
    format
  } = props

  const setFormat = (e) => {
    console.log(e)
    const strFormat = e.target.value
    console.log(strFormat.split('x'))
    const [width, height] = strFormat.split('x')
    console.log(typeof +height, width)
    setHeight(+height)
    setWidth(+width)
  }

  return(
    <div className="submenu">
      <div className="submenu-header">
        Format
      </div>
      <div className="submenu-actions">
       <Select value={`${format.width}x${format.height}`} onChange={setFormat}>
        <MenuItem value="1280x720">1280 x 720</MenuItem>
        <MenuItem value="1000x420">1000 x 420</MenuItem>
       </Select>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  format: getFormat(state)
})

const mapDispatchToProps = {
  setHeight,
  setWidth
}

export default connect(mapStateToProps, mapDispatchToProps)(Format)
