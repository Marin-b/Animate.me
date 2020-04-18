import React from "react";
import CanvasTools from './canvas-tools'
import Format from './format'
import Animation from './animation'
import './menu.css'

const Menu = (props) => {
  return(
    <div id="menu">
      <CanvasTools />
      <Animation />
    </div>
  )
}

export default Menu
