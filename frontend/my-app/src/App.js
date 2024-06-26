import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from './actions/authActions';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
