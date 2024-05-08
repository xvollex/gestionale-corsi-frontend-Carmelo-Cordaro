import { Link } from 'react-router-dom';
import './notfound.css'; 

export function NotFound()
{
    return (
        <div className="notfound-wrapper">
          <div className="notfound-container">
            <h1 className="notfound-title">404 - Pagina Non Trovata</h1>
            <p className="notfound-message">
              Siamo spiacenti, ma la pagina che stai cercando non è disponibile.
            </p>
            <Link to="/" className="btn btn-primary notfound-btn">
              Torna alla Home
            </Link>
          </div>
        </div>
      );
}