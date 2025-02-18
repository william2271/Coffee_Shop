import React, { useContext, useState } from 'react';
import './Login.css'
import Menu from '../Menu/Menu';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const auth = useContext(AuthContext); // Get the auth context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      const response = await fetch('http://localhost:8081/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Set user info in the AuthContext
        if (auth) {
          auth.setUsername(data.username); // Save the username to the context
          auth.setRole(data.role); // Save the role to the context
        }

        setMessage(`Login successful! Welcome, ${data.username}.`);
        // You can redirect or save the token here if your API provides one
        navigate('/menu'); // Navigate to the menu page after successful login
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      setMessage('An error occurred while logging in.');
      console.error('Error:', error);
    }
  };

  return (
    <body id="back">
      <div className="container min-vh-100 d-flex justify-content-center align-items-center new_font col-md-6">
        <form className="mochaa form-control-lg form-control-sm" onSubmit={handleLogin}>
          <h1>Log in</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputUsername" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputUsername"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn moch new_font">Log in</button>
          {message && <p className="mt-3">{message}</p>}
        </form>
      </div>
    </body>
  );
}

export default Login

