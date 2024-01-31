// src/components/CountryList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryList = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v2/all");
        setLoad(false);
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoad(true);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="bg-gray-200 p-4">
      {load ? (
      <div>
        <h2 className="text-xl mb-4">Select Two Countries</h2>
        <select
          className="block w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => onSelectCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.alpha3Code} value={country.alpha3Code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default CountryList;
