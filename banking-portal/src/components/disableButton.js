import React, { useState } from 'react';

const ButtonEnabler = () => {
  const [count, setCount] = useState(0);
  const totalButtons = 4;
  const targetSum = (totalButtons * (totalButtons + 1)) / 2;

  const handleButtonClick = (index) => {
    setCount(prevCount => prevCount + (index + 1));
  };

  return (
    <div>
      {[...Array(totalButtons)].map((_, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          disabled={count >= targetSum ? true : false}
        >
          Button {index + 1}
        </button>
      ))}
      <button disabled={count < targetSum}>Button 5</button>
    </div>
  );
};

export default ButtonEnabler;
