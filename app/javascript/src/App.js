import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Navigation, Frames, Menu } from './containers'

import { initialize } from './store/frames'


const App = (props) => {
  const [height, setHeight] = useState(window.innerHeight)
  useEffect(() => {
    window.addEventListener('resize', () => setHeight(window.innerHeight))
    document.body.addEventListener('touchmove', (e) => e.preventDefault() , { passive: false })
    const initialData = {...document.getElementById('animation-data').dataset}
    Object.keys(initialData).map(function(key, index) {
      initialData[key] = JSON.parse(initialData[key])
    });
    props.initialize(initialData)
  })

  return (
    <div id="app" style={{height: `${height}px`, width: '100vw'}}>
      <div id="main">
        <Menu />
        <Frames />
      </div>
      <Navigation />
    </div>
  );
}

const mapDispatchToProps = {
  initialize
}

export default connect(null, mapDispatchToProps)(App);
