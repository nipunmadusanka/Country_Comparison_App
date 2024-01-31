// src/components/CountryInfo.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryInfo = ({ countryCodes }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const responses = await Promise.all(
          countryCodes.map((code) =>
            axios.get(`https://restcountries.com/v2/alpha/${code}`)
          )
        );
        setCountries(responses.map((response) => response.data));
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    };

    if (countryCodes.length > 0) {
      fetchCountryDetails();
    }
  }, [countryCodes]);

  return (
    <div className="flex flex-wrap justify-center">
      {countries.map((country) => (
        <div
          key={country.alpha3Code}
          className="m-4 p-6 bg-white rounded-md shadow-md"
        >
          <h2 className="text-xl mb-2">{country.name}</h2>
          <div className="flex justify-center items-center">
            <img src={country.flags.png} className="w-16" />
          </div>
          <p className="text-gray-600">Capital: {country.capital}</p>
          <p className="text-gray-600">Population: {country.population}</p>
          <p className="text-gray-600">Area: {country.area} sq km</p>
          <p className="text-gray-600">
            Languages: {country.languages.map((lang) => lang.name).join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CountryInfo;
