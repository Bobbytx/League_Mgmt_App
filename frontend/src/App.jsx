import { useEffect, useState } from "react";
import "./App.css";
import { api } from "./utilities";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";


function App() {
  const [user, setUser] = useState(null);

  const getInfo = async() => {
    let token = localStorage.getItem("token")
    if (token){
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get("")
      setUser(response.data.user)
    } 
  }

  useEffect(()=>{
    getInfo()
  },[])

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      {/* <h3>Welcome {user ? user : null}</h3> */}
      <Outlet context = {{user, setUser}} />
      
    </>
  );
}

export default App;