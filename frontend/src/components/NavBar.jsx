import { Link } from "react-router-dom";
import { api } from "../utilities";
import Button from "react-bootstrap/esm/Button";

const NavBar = ({ user, setUser }) => {
  const logOut = async () => {
    let response = await api.post("logout/");
    if (response.status === 204) {
      setUser(null);
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    }
  };
  return (
    <nav>
      <Link to={"/"}>Home</Link>
      {user ? (
        <>
          <Link to={"contact/"}>Contacts</Link>
          <Link to={"about/"}>About</Link>
          <Button onClick={logOut} variant="danger">
            Log Out
          </Button>
        </>
      ) : (
        <Link to={"/register/"}>Log In / Sign UP</Link>
      )}
    </nav>
  );
};

export default NavBar;