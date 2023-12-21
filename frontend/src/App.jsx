import React, { useEffect, useState } from "react";
import "./App.css";
import { api } from "./utilities";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { LoadScript } from '@react-google-maps/api';

function App() {
  const [user, setUser] = useState(null);

  const getInfo = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      // Make an API call to get user details based on the token
      try {
        let response = await api.get("http://localhost:8000/api/v1/users/user-info/");
        setUser(response.data);
        console.log("User details:", response.data);

      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle error, maybe clear the token if it's invalid
      }
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}>
      <NavBar user={user} setUser={setUser} />
      <Outlet context={{ user, setUser, getInfo }} />
      <Footer />
      </LoadScript>
    </>
  );
}

export default App;
