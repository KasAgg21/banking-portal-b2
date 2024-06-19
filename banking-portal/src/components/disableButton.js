import React, { useState } from 'react';
import "../styles/buttonEnabler.css"

const ButtonEnabler = () => {
  const buttonNames = ['hello', 'hellolo', 'hehello', 'hehelolo'];
  const [clickedButtons, setClickedButtons] = useState(Array(buttonNames.length).fill(false));
  const [remainingButtons, setRemainingButtons] = useState(buttonNames.length);

  const handleButtonClick = (index) => {
    if (!clickedButtons[index]) {
      const newClickedButtons = [...clickedButtons];
      newClickedButtons[index] = true;
      setClickedButtons(newClickedButtons);
      setRemainingButtons(remainingButtons - 1);
    }
  };

  return (
    <div>
      {buttonNames.map((name, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          disabled={clickedButtons[index]}
          className={`button ${clickedButtons[index] ? 'clicked' : ''}`}
        >
          {name}
          {clickedButtons[index] && <span className="check-mark">&#10003;</span>}
        </button>
      ))}
      <button disabled={remainingButtons > 0} className="button">Button 5</button>
    </div>
  );
};

export default ButtonEnabler;