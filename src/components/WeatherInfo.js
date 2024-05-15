import React from 'react';
import WeatherIcon from './WeatherIcon';

const WeatherInfo = ({ country,city,main,icon,sunrise,sunset,temp, description,theme }) => {
  return (
<table class="table">
  <thead>
    <tr>
      <th scope="row">COUNTRY</th>
      <td>{country}</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">CITY</th>
      <td>{city}</td>
    </tr>
    <tr>
      <th scope="row">MAIN</th>
      <td>{main}</td>
    </tr>
    <tr>
      <th scope="row">ILLUSTRATION</th>
      {/* <WeatherIcon iconCode={icon}/> */}
      <td><img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon"/></td>
    </tr>
    <tr>
      <th scope="row">SUNRISE</th>
      <td>{sunrise}</td>
    </tr>
    <tr>
      <th scope="row">SUNSET</th>
      <td>{sunset}</td>
    </tr>
    <tr>
      <th scope="row" class={theme}>TEMPERATURE</th>
      <td class={theme}>{temp}°</td>
    </tr>
    <tr>
      <th scope="row">DESCRIPTION</th>
      <td>{description}</td>
    </tr>
  </tbody>
</table>
  );
};

export default WeatherInfo;