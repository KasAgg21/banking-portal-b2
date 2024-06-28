import React from 'react';
import './index.css';
import ButtonEnabler from './component/disableButton'
import DragAndDrop from './components/dragAndDrop'

function App() {
  return (
    <div className="App">
      <h1>Button Enabler</h1>
      <ButtonEnabler />
      <DragAndDrop/>
    </div>
  );
}

export default App;
