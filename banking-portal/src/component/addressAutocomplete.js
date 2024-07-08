import React, { useState } from 'react';
import '../styles/AddressAutocomplete.css';

const loqateApiKey = 'HA26-FT52-AP96-AD96';

const AddressAutocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(null, args);
      }, wait);
    };
  };

  const getAddressSuggestions = async (currentValue) => {
    if (currentValue.length < 3) return;

    try {
      const response = await fetch(`https://api.addressy.com/Capture/Interactive/Find/v1.10/json3.ws?Key=${loqateApiKey}&Text=${currentValue}&IsMiddleware=False&Origin=&Countries=GBR`);
      const data = await response.json();
      setSuggestions(data.Items);
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
    }
  };

  const debouncedGetAddressSuggestions = debounce(getAddressSuggestions, 300);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedGetAddressSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.Text);
    setSuggestions([]);
  };

  return (
    <div className="container">
      <div className="autocomplete-container">
        <h2>Enter an address</h2>
        <p>Find your location</p>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter an address here"
          />
        </div>
        <ul id="address-suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.Text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddressAutocomplete;