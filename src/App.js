// src/App.js
import React, { useState } from "react";
import "./App.css"; 
import CountryList from "./components/CountryList";
import CountryInfo from "./components/CountryInfo";

function App() {
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleSelectCountry = (countryCode) => {
    if (!selectedCountries.includes(countryCode)) {
      // Add the selected country code to the state
      setSelectedCountries((prevSelected) => {
        const updatedSelected = [...prevSelected, countryCode];

        if (updatedSelected.length > 2) {
          updatedSelected.shift();
        }

        return updatedSelected;
      });
    }
  };

  return (
    <div className="App min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8">Country Comparison App</h1>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-around bg-white p-8 rounded-md shadow-md">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex justify-center my-auto">
            <CountryList onSelectCountry={handleSelectCountry} />
          </div>
          <div className="flex justify-center my-auto">
            <CountryInfo countryCodes={selectedCountries} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
