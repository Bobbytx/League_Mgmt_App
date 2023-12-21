import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';

const Weather = ({ teamId }) => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');

  const fetchLatestGameLocation = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/games/team-games/${teamId}/latest`);
      const latestLocation = response.data.location;
      setLocation(latestLocation);
      if (latestLocation) {
        const locationKey = await fetchLocationKey(latestLocation);
        if (locationKey) {
          fetchWeather(locationKey);
        }
      }
    } catch (error) {
      console.error("Error fetching latest game location:", error);
    }
  };

  const fetchLocationKey = async (location) => {
    try {
      const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search`, {
        params: {
          q: location,
          apikey: 'rzouc3hWTvx07z6GAnjb74snCbEHukm6'
        }
      });
      return response.data[0].Key; // assuming the first result is the correct one
    } catch (error) {
      console.error("Error fetching location key:", error);
    }
  };

  const fetchWeather = async (locationKey) => {
    try {
      const response = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`, {
        params: {
          apikey: 'rzouc3hWTvx07z6GAnjb74snCbEHukm6'
        }
      });
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    if (teamId) {
      fetchLatestGameLocation();
    }
  }, [teamId]);

  return (
    <Card>
        <Card.Body>
            <Card.Title>5-Day Forecast</Card.Title>
            {weather ? (
            <ListGroup>
                {weather.DailyForecasts.map((day, index) => (
                <ListGroup.Item key={index}>
                    <div className="d-flex justify-content-between">
                    <div>
                        <strong>{new Date(day.Date).toLocaleDateString()}</strong>
                    </div>
                    <div>
                        {day.Temperature.Minimum.Value}°{day.Temperature.Minimum.Unit}-
                        {day.Temperature.Maximum.Value}°{day.Temperature.Maximum.Unit}
                    </div>
                    <div>
                        <img 
                        src={`https://developer.accuweather.com/sites/default/files/${String(day.Day.Icon).padStart(2, '0')}-s.png`} 
                        alt={day.Day.IconPhrase}
                        />
                    </div>
                    </div>
                </ListGroup.Item>
                ))}
            </ListGroup>
            ) : (
            <p>Loading weather...</p>
            )}
        </Card.Body>
        </Card>
    );
    };

export default Weather;
