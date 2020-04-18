import React from "react";
import CanvasTools from './canvas-tools'
import Format from './format'
import Animation from './animation'

const Menu = (props) => {
  return(
    <div id="menu">
      <CanvasTools />
      <Animation />
    </div>
  )
}

export default Menu
