import React, { useState } from 'react';
import buttonEnabler from '../styles/buttonEnabler.css'
const ButtonEnabler = () => {
  const totalButtons = 4;
  const [clickedButtons, setClickedButtons] = useState(Array(totalButtons).fill(false));

  const handleButtonClick = (index) => {
    const newClickedButtons = [...clickedButtons];
    newClickedButtons[index] = true;
    setClickedButtons(newClickedButtons);
  };

  const allButtonsClicked = clickedButtons.every(Boolean);

  return (
    <div>
      {clickedButtons.map((clicked, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          disabled={clicked}
        >
          Button {index + 1}
        </button>
      ))}
      <button disabled={!allButtonsClicked}>Button 5</button>
    </div>
  );
};

export default ButtonEnabler;
