import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux'
import { Navigation, Frames, Menu } from './containers'

import store from './store'
import './App.css'

function App() {
  const [height, setHeight] = useState(window.innerHeight)
  useEffect(() => {
    window.addEventListener('resize', () => setHeight(window.innerHeight))
    document.body.addEventListener('touchmove', (e) => e.preventDefault() , { passive: false })
  })

  return (
    <Provider store={store}>
      <div id="app" style={{height: `${height}px`, width: '100vw'}}>
        <div id="main">
          <Menu />
          <Frames />
        </div>
        <Navigation />
      </div>
    </Provider>
  );
}

export default App;
