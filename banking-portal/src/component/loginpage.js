import React, { useState } from 'react';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password checks
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    if (!/[a-z]/.test(password)) {
      alert('Password must contain at least one lowercase letter');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      alert('Password must contain at least one uppercase letter');
      return;
    }

    if (!/\d/.test(password)) {
      alert('Password must contain at least one digit');
      return;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      alert('Password must contain at least one special character');
      return;
    }

    // Submit form (e.g., make an API call)
    console.log('Form submitted with:', { username, password });
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        <p>Your savings journey continues here</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          /><br /><br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br /><br />
          <input type="submit" value="Login" />
        </form>
        <p>Forgot password? <a href="#">Reset password</a></p>
        <p>Don't have an account? <a href="#">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;