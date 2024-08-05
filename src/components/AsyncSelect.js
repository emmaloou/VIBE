// src/components/AsyncSelect.js
import React from 'react';
import AsyncSelect from 'react-select/async';

const fetchCities = async (inputValue) => {
  if (!inputValue) {
    return [];
  }
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?city=${inputValue}&format=json&addressdetails=1`
  );
  const data = await response.json();
  return data.map((item) => ({
    label: `${item.address.city || item.address.town || item.address.village}, ${item.address.postcode || ''}, ${item.address.country}`,
    value: {
      city: item.address.city || item.address.town || item.address.village,
      postcode: item.address.postcode || '',
      country: item.address.country,
    },
    address: item.address,
  }));
};

const CitySelect = ({ onChange, value }) => {
  const loadOptions = (inputValue, callback) => {
    fetchCities(inputValue).then((options) => {
      callback(options);
    });
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      onChange={onChange}
      value={value}
      placeholder="Sélectionner une ville"
    />
  );
};

export default CitySelect;
