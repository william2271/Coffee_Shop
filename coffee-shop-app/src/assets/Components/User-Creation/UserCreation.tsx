
import React, { useState } from 'react';
import './User-Creation.css'
function UserCreation() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [answer, setAnswer] = useState('');
  const [role, setRole] = useState('USER'); // Default role is 'USER'
  const [message, setMessage] = useState('');

  const handleRoleAssignment = (value: any) => {
    setAnswer(value);
    if (value.toLowerCase() === '2') {
      setRole('ADMIN');
    } else {
      setRole('USER');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Account created successfully for user: ${data.username} with role: ${data.role}`);
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      setMessage('An error occurred while creating the account.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center new_font col-md-6">
      <form className="mochaa form-control-lg form-control-sm" onSubmit={handleSubmit}>
        <h1>Create Your Account</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputUsername" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="securityQuestion" className="form-label">
            
            <em>1+1?.</em>
          </label>
          <input
            type="text"
            className="form-control"
            id="securityQuestion"
            value={answer}
            onChange={(e) => handleRoleAssignment(e.target.value)}
          />
        </div>
        <button type="submit" className="btn moch new_font">Create Account</button>
        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
}

export default UserCreation
