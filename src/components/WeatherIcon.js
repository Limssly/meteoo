import React from 'react';

const WeatherIcon = ({ iconCode }) => {
  return (
    <p>Illustration :<img
      src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
      alt="Weather Icon"
    /></p>
  );
};

export default WeatherIcon;