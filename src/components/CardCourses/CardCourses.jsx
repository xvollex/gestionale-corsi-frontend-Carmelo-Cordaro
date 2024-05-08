import { useState, useEffect } from 'react';
import { getAllCourses, createCourse, deleteCourse } from '../../services/RESTService';
import './CardCourses.css';
import {  TokenCheck, getRole } from '../../Tokencheck';
import { useNavigate } from 'react-router-dom';


export function CardCourses() {
  const [courses, setCourses] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    nomeCorso: '',
    descrizioneBreve: '',
    descrizioneCompleta: '',
    durata: 1,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Usa useEffect per caricare i corsi al montaggio del componente
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses(); 
        setCourses(data);
      } catch (err) {
        console.error(err);
        setError("Errore durante il recupero dei corsi");
      }
    };

    fetchCourses();

    if (TokenCheck()) { 

      console.log(getRole());
      
      // Se il ruolo è admin, aggiorna lo stato
      if (getRole() == "Admin") {
        setIsAdmin(true);
      }

      console.log(isAdmin);
    }
    else
    {
      navigate('/login'); // Va al login se non si è effettuato l'accesso
    }
  }, []); 

  const [isAdmin, setIsAdmin] = useState(false); // Stato per ruolo admin

  const handleDeleteClick = async (courseId) => {
    try {
      await deleteCourse(courseId); // Usa la funzione per eliminare
      setCourses(courses.filter((course) => course.id != courseId)); // Aggiorna la lista dei corsi
    } catch (err) {
      console.error(err);
      setError(err.message || "Errore durante l'eliminazione");
    }
  };

  const handleNewCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  
  const handleCreateClick = async () => {
    try {
      const createdCourse = await createCourse(newCourse); // Usa la funzione per creare
      setCourses([...courses, createdCourse]); // Aggiungi il nuovo corso alla lista
      setNewCourse({ nomeCorso: '', descrizioneBreve: '', descrizioneCompleta: '', durata: 1 }); // Ripristina il modulo
      setShowCreateModal(false); // Chiudi il modale
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError(err.message || "Errore durante la creazione");
    }
  };

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  return (
    <div className="container mt-4">
      <h2>Gestione dei Corsi</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Messaggio di errore */}
      {isAdmin &&
      <button className="btn btn-primary" onClick={handleShowCreateModal}>
        Aggiungi Nuovo Corso
      </button>
      }

      <div className="row mt-3">
        {courses.map((course) => (
          <div key={course.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{course.nomeCorso}</h5>
                <p className="card-text">Descrizione breve: {course.descrizioneBreve}</p>
                <p className="card-text">Descrizione lunga: {course.descrizioneCompleta}</p>
                <p className="card-text">Durata: {course.durata} {course.durata === 1 ? 'mese' : 'mesi'}</p>
                {isAdmin &&
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(course.id)}>
                  Elimina
                </button>
                }
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Aggiungi Nuovo Corso</h5>
                <button type="button" className="close" onClick={handleCloseCreateModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nome</label>
                  <input
                    type="text"
                    name="nomeCorso"
                    className="form-control"
                    value={newCourse.nome}
                    onChange={handleNewCourseChange}
                  />
                </div>
                <div className="form-group">
                  <label>Descrizione Breve</label>
                  <input
                    type="text"
                    name="descrizioneBreve"
                    className="form-control"
                    value={newCourse.descrizioneB}
                    onChange={handleNewCourseChange}
                  />
                </div>
                <div className="form-group">
                  <label>Descrizione Lunga</label>
                  <input
                    type="text"
                    name="descrizioneCompleta"
                    className="form-control"
                    value={newCourse.descrizioneL}
                    onChange={handleNewCourseChange}
                  />
                </div>
                <div className="form-group">
                  <label>Durata (in mesi)</label>
                  <input
                    type="number"
                    name="durata"
                    className="form-control"
                    value={newCourse.durata}
                    onChange={handleNewCourseChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseCreateModal}>
                  Chiudi
                </button>
                <button className="btn btn-primary" onClick={handleCreateClick}>
                  Aggiungi Corso
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
