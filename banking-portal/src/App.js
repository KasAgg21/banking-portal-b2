import React from 'react';
import './index.css';
import ButtonEnabler from './component/disableButton'
import DragAndDrop from './component/dragAndDrop'
import HomeAddress from './component/homeAddressForm'
import Dashboard from './component/dashboard';
function App() {
  return (
    <div className="App">
      <h1>Button Enabler</h1>
      <ButtonEnabler />
      <DragAndDrop/>
      <HomeAddress/>
      <Dashboard/>
    </div>
  );
}

export default App;
