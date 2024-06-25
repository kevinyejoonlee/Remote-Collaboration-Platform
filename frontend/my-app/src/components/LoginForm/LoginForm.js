import React, { useState } from 'react';
import './LoginForm.css';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [action, setAction] = useState('Login');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === 'Sign Up') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        await api.post('/auth/signup/', {
          username,
          password,
          confirm_password: confirmPassword,
        });
        setError('');
        console.log('Signup successful');
        setAction('Login');
      } else {
        const response = await api.post('/auth/login/', {
          username,
          password,
        });
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        setError('');
        console.log('Login successful');
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.error || `${action} failed`);
      console.error(`${action} failed:`, error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="title">{action}</div>
        <div className="underline"></div>
      </div>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="inputs">
        {action === "Sign Up" && <input className="input" type="text" name="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />}
        <input className="input" type="text" name="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="input" type="password" name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        {action === "Sign Up" && <input className="input" type="password" name="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />}
        {action === "Login" && (
          <div className="forgot_login">
            Forgot Password? <span>Click Here</span>
          </div>
        )}
        <div className="submit_buttons">
          <button type="button" className={action === "Sign Up" ? "submit_button purple" : "submit_button"} onClick={() => setAction("Sign Up")}>Sign Up</button>
          <button type="button" className={action === "Login" ? "submit_button purple" : "submit_button"} onClick={() => setAction("Login")}>Login</button>
        </div>
        <button type="submit" className="submit_button enter">Enter</button>
      </form>
    </div>
  );
}

export default LoginForm;
