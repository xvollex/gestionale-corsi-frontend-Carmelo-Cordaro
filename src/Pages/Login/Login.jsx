import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { login } from '../../services/RESTService';

export function Login() 
{
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate to redirect after login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const response = await login(formData); 

    if (response.status === 200) {
      // Successful login
      Cookies.set('token', response.data.token);
      Cookies.set('token_creation_time', response.data.tokenCreationTime);
      Cookies.set('token_ttl', response.data.ttl);

      setError(''); 
      navigate('/');
      location.reload();
    } else {
      setError('Credenziali errate');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Accedi</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn btn-primary">Accedi</button>
        </form>
        <p className="register-link">
          Non hai un account? <Link to="/register">Registrati qui</Link>
        </p>
      </div>
    </div>
  );
}
