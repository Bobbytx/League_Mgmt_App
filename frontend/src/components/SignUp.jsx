import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    let response = await api.post("signup/", {
      email: email,
      password: password,
      display_name: displayName,
      first_name: firstName,
      last_name: lastName,
    }, { headers: { 'Authorization': '' } });
    if (response.status === 201) {
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      api.defaults.headers.common[
        "Authorization"
      ] = `Token ${response.data.token}`;
      navigate("/");
    } else {
      alert("Something Went wrong");
    }
  };

  return (
    <Form onSubmit={(e) => signUp(e)}>
      <h4>Sign Up</h4>
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
        <Form.Label>Display Name</Form.Label>
        <Form.Control
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          placeholder="Display Name"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="First Name"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Last Name"
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
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default SignUp;