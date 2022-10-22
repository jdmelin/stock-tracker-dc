import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import userService from '../../services/userService';

function Register() {
  const [credentials, setCredentials] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const submit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await userService.register(credentials);
      const { message } = await response.json();

      if (message === 'success') {
        navigate(`/login`);
      }
    } catch {
      // handle error
    }
  };

  return (
    <Row className="login-container">
      <h1>Sign Up</h1>
      <Form onSubmit={submit}>
        <Form.Group className="mt-3">
          <Form.Label>First name</Form.Label>
          <Form.Control
            name="firstName"
            onChange={handleChange}
            type="text"
            placeholder="Enter First Name"
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            name="lastName"
            onChange={handleChange}
            type="text"
            placeholder="Enter Last Name"
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Enter Email Address"
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Enter Password"
          />
        </Form.Group>
        <Button variant="primary" className="mt-3" type="submit">
          Sign Up
        </Button>
      </Form>
      <Form.Text className="mt-3">
        Already have an account?&nbsp;
        <Link to="/login">Log In!</Link>
      </Form.Text>
    </Row>
  );
}

export default Register;
