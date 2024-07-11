import React from 'react';
import './index.css';
import ButtonEnabler from './component/disableButton'
import DragAndDrop from './component/dragAndDrop'
import HomeAddress from './component/homeAddressForm'
import Dashboard from './component/dashboard';
import Address from './component/addressAutocomplete'
function App() {
  return (
    <div className="App">
      <h1>Button Enabler</h1>
      <ButtonEnabler />
      <DragAndDrop/>
      <HomeAddress/>
      <Dashboard/>
      <Address/>
    </div>
  );
}

export default App;
