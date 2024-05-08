import React, { useState } from 'react';
import { registerUser } from '../../services/RESTService';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';


export function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    password: '',
    confermaPassword: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confermaPassword) {
      setError('Le password non corrispondono');
      return;
    }

    try {
      const response = await registerUser({
        nome: formData.nome,
        cognome: formData.cognome,
        email: formData.email,
        password: formData.password
      });
      
      if(response.status === 200)
      {
        setSuccess(true);
        setError('');
      }
      else
      {
        setSuccess(false);
        setError('password di almeno 6 caratteri con una maiuscola e un carattere speciale');
      }
      
      
    } catch (error) {
      setError('Errore di rete');
    }
  };

  return (
    <div className='cnt'>
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="text-center">Registrazione</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success ? (
                <div>
                  <div className="alert alert-success">Registrazione riuscita!</div>
                  <div className="text-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate('/login')} // Reindirizza al login
                    >
                      Vai al Login
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cognome</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cognome"
                      value={formData.cognome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                      />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Conferma Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confermaPassword"
                      required
                      value={formData.confermaPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Registrati
                    </button>
                  </div>
                </form>
              )}
              {!success && ( // Mostra il link al login solo se la registrazione non è riuscita
                <p className="register-link">
                  Sei già registrato? <Link to="/login">Accedi qui</Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
