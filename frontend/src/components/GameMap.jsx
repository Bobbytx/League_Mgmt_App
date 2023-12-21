import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, Marker } from '@react-google-maps/api';

const GameMap = ({ location }) => {
  console.log("Location:", location); 
  const [coordinates, setCoordinates] = useState(null);
  const mapContainerStyle = {
    height: "400px",
    width: "100%"
  };
  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  useEffect(() => {
    if (location) {
      getCoordinates(location).then(coords => setCoordinates(coords));
    }
  }, [location]);

  const getCoordinates = async (location) => {
    try {
      const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: location,
          key: apiKey
        }
      });
      console.log("API Response:", response);
      const { lat, lng } = response.data.results[0].geometry.location;
      console.log("Fetched coordinates:", lat, lng);
      return { lat, lng };
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  if (!coordinates) {
    return <div>Loading map...</div>;
  }

  return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={coordinates}
        zoom={15}
        options={mapOptions}
      >
        <Marker position={coordinates} />
      </GoogleMap>
  );
};

export default GameMap;
