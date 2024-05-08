import { NavLink, useNavigate } from "react-router-dom";
import { TokenCheck, getRole } from "../../Tokencheck"; // Assicurati di chiamare la funzione correttamente
import { useEffect, useState } from "react";
import Cookies from "js-cookie";


export function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Stato per autenticazione
  const [isAdmin, setIsAdmin] = useState(false); // Stato per ruolo admin

  useEffect(() => {
    if (TokenCheck()) { // Se il token è valido
      setIsAuthenticated(true);

      console.log(getRole());
      
      // Se il ruolo è admin, aggiorna lo stato
      if (getRole() == "Admin") {
        setIsAdmin(true);
      }

      console.log(isAdmin);
    }
  }, []);

  

  const handleLogout = () => {
    Cookies.remove("token"); // Rimuovi il token dai cookie
    navigate("/"); // Reindirizza alla home page
    window.location.reload(); // Ricarica la pagina per aggiornare lo stato
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand">Gestionale Corsi</div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/">Home</NavLink>
            {isAuthenticated && (
              <>
              <NavLink className="nav-link" to="/courses">Courses</NavLink>
                {isAdmin && (
                  <>
                    <NavLink className="nav-link" to="/users">Users</NavLink>
                  </>
                )}
                <NavLink className="nav-link" to="/user">User</NavLink>
              </>
            )}
          </div>
          {isAuthenticated && (
            <div style={{ marginLeft: "auto" }}> {/* Posiziona a destra */}
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
