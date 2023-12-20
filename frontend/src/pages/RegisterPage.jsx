import { useNavigate, useOutletContext } from "react-router-dom";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

export const RegisterPage = ({ initialShowLogin }) => {
  const { user, setUser } = useOutletContext();
  const [showLogin, setShowLogin] = useState(initialShowLogin); 
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard/");
    }
  }, []);

  return (
    <>
      <h1>Log In / Sign Up Page</h1>
      {showLogin ? (
        <>
          <LogIn setUser={setUser} />
          <Button
            variant="warning"
            onClick={() => setShowLogin(false)} 
          >
            Sign Up
          </Button>
        </>
      ) : (
        <>
          <SignUp setUser={setUser} />
          <Button
            variant="warning"
            onClick={() => setShowLogin(true)} 
          >
            Already have an account? Log In
          </Button>
        </>
      )}
    </>
  );
};
