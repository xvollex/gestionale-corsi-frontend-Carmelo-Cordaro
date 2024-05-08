import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './User.css'; // File CSS per lo styling
import { getId } from '../../Tokencheck';
import { getUserById } from '../../services/RESTService';

export function User() {
  const [user, setUser] = useState({
    nome: "",
    cognome:"",
    email:"",
    ruoli: [{
        tipologia:""
    }]
  }); 
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('token'); 
        if (!token) {
          setError('Token non trovato');
          return;
        }

        const userData = await getUserById(getId()); 

        //console.log(userData);
        setUser(userData); 
      } catch (error) {
        setError('Aggiorna la pagina');
      }
    };

    fetchUserData(); // Chiama la funzione per recuperare i dati
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>; // Mostra messaggio di errore
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <h2>Profilo Utente</h2>
      </div>
      <div className="user-profile-info">
        <div className="user-profile-image">
        </div>
        <div className="user-details">
  <p><strong>Nome:</strong> {user.nome}</p>
  <p><strong>Cognome:</strong> {user.cognome}</p>
  <p><strong>Email:</strong> {user.email}</p>

  {user.ruoli.length > 0 && ( // Mostra solo se ci sono ruoli
    <>
      <strong>Ruoli:</strong>
      {user.ruoli.map((ruolo) => (
        <span key={ruolo.id}>
           {ruolo.tipologia}
          {ruolo.id < user.ruoli.length - 1 ? ', ' : ''} 
        </span>
      ))}
    </>
  )}
</div>
      </div>
    </div>
  );
}
