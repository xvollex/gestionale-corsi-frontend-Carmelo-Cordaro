import React from 'react';
import { Link } from 'react-router-dom';
import './Unauthorized.css'; // Per gli stili della pagina

export function Unauthorized() {
  return (
    <div className="unauthorized-wrapper text-center p-5">
      <h1>Ooops! Hai perso la strada?</h1>
      <p>
        Sembra che tu abbia cercato di entrare in una zona riservata.
      </p>
      <p>
        Non preoccuparti, succede ai migliori. 
      </p>
      <div className="unauthorized-actions">
        <Link className="btn btn-primary" to="/">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}
