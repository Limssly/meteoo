import React, { useState, useEffect } from 'react';
import WeatherInfo from './components/WeatherInfo';
import WeatherIcon from './components/WeatherIcon';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'; // Importez vos styles CSS ici
const keyApi="96adb4a9f1d70ab53452fa60bcbc9d97";

function App() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [temp, setTemp] = useState('');
  const [main, setMain] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [isReady, setReady] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${keyApi}&units=metric`
      )
        .then((result) => result.json())
        .then((jsonresult) => {
          setCity(jsonresult.name);
          setCountry(jsonresult.sys.country);
          setTemp(jsonresult.main.temp);
          setMain(jsonresult.weather[0].main);
          setDesc(jsonresult.weather[0].description);
          setIcon(jsonresult.weather[0].icon);
          setSunrise(jsonresult.sys.sunrise);
          setSunset(jsonresult.sys.sunset);
          setReady(true);
        })
        .catch((err) => console.error(err));
    }
  }, [latitude, longitude]);

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  let theme = '';
  if (isReady) {
    if (temp < 10) {
      theme = 'table-primary';
    } else if (temp >= 10 && temp <20) {
      theme = 'table-info';
    }else if (temp >= 20 && temp <50) {
      theme = 'table-warning';
    } else {
      theme = 'table-danger';
    }
  }

  return (
    <div>
      <div class="bar"><h1>MY WEATHER APP</h1></div>
      <h5>Saisissez une latitude et une longitude valides</h5>
      <form > 
      <div class="row" >
        <div class="col">
        <input
          type="text"
          id="latitude"
          value={latitude}
          class="form-control" placeholder="Latitude"
          onChange={handleLatitudeChange}
        />
        </div>
        <div class="col">
        <input
          type="text"
          id="longitude"
          value={longitude}
          class="form-control" placeholder="Longitude"
          onChange={handleLongitudeChange}
        />
        </div>
      </div>
      </form>
      {isReady ? (
        <div>
          <WeatherInfo country={country} theme={theme} city={city} temp={temp} main={main} icon={icon} sunrise={sunrise} sunset={sunset} description={desc} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;