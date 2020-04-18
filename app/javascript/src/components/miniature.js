import React, { useRef } from "react";

const Miniature = (props) => {
  return(
    <img src={props.content} className={props.selected ? 'selected miniature' :  'miniature'} onClick={props.clickEvent}/>
  )
}

export default Miniature
