import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser, updateUser  } from '../../services/RESTService';


export function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState({
    nome:"",
    cognome:""
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  // Usa useEffect per recuperare gli utenti al montaggio del componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(); // Usa la funzione getAllUsers
        setUsers(data); // Aggiorna lo stato degli utenti
      } catch (err) {
        console.error(err);
        setError('Errore durante il recupero degli utenti');
      }
    };

    fetchUsers();
  }, []); // L'array vuoto assicura che venga eseguito solo al montaggio del componente

  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDeleteClick = async (userId) => {
    try {
      await deleteUser(userId); // Usa la funzione di eliminazione
      setUsers(users.filter((user) => user.id != userId));
    } catch (err) {
      console.error(err);
      setError('Errore durante l\'eliminazione');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);

  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUser(editingUser); // Usa la funzione di aggiornamento
      setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));

      console.log(users);
      handleModalClose();
    } catch (err) {
      console.error(err);
      setError('Errore durante l\'aggiornamento');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Gestione degli Utenti</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Email</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.cognome}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEditClick(user)}
                >
                  Modifica
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(user.id)}
                >
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifica Utente</h5>
                <button type="button" onClick={handleModalClose}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nome</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="form-control"
                    value={editingUser.nome}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label>Cognome</label>
                  <input
                    type="text"
                    id="cognome"
                    name="cognome"
                    className="form-control"
                    value={editingUser.cognome}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleModalClose}
                >
                  Chiudi
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Salva
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
