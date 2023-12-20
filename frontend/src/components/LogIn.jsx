import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { api } from "../utilities";
import { useNavigate, useOutletContext } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser, getInfo } = useOutletContext();

  const logIn = async (e) => {
    e.preventDefault();
    try {
      let response = await api.post("login/", {
        email: email,
        password: password,
      });
      console.log("Login API Response: ", response);

      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        api.defaults.headers.common[
          "Authorization"
        ] = `Token ${response.data.token}`;
        await getInfo();
        navigate("/dashboard", { state: { user: response.data.user } });
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login API Error: ", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <Form onSubmit={(e) => logIn(e)}>
      <h4>Log In</h4>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="name@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
      </Form.Group>
      <Button type="submit">Log In</Button>
    </Form>
  );
};

export default LogIn;
