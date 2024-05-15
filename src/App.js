import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Container, Row, Col, Form, Button } from "react-bootstrap";
function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4a64a166460e5c4f31b7e16f9888c463&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setReady(true);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [latitude, longitude]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Trigger weather data fetching when latitude and longitude are provided
    if (latitude && longitude) {
      setReady(false); // Reset ready state
    }
  };

  if (!isReady) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="latitude">
                <Form.Label>Latitude:</Form.Label>
                <Form.Control
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="longitude">
                <Form.Label>Longitude:</Form.Label>
                <Form.Control
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Get Weather
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }

  // Vérification de nullité pour éviter les erreurs
  const temperature = weatherData?.main?.temp;
  const description = weatherData?.weather[0]?.description;
  const humidity = weatherData?.main?.humidity;
  const windSpeed = weatherData?.wind?.speed;
  const icon = weatherData?.weather[0]?.icon;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center">
            <h1>Weather Information</h1>
            <p>Location: {weatherData.name}</p>
            <p>Temperature: {temperature} °C</p>
            <p>Description: {description}</p>
            <p>Humidity: {humidity}%</p>
            <p>Wind Speed: {windSpeed} m/s</p>
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="Weather icon"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
