import React from "react";
import CanvasTools from './canvas-tools'
import Format from './format'
import Animation from './animation'
import Frame from './frame'

const Menu = (props) => {
  return(
    <div id="menu">
      <CanvasTools />
      <Frame />
      <Animation />
    </div>
  )
}

export default Menu
