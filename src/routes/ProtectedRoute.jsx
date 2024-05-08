import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TokenCheck, getRole } from "../Tokencheck";


export function ProtectedRoute({ children, requiredRole }) {
  const token = Cookies.get("token");

  if (!token || !TokenCheck()) {
    return <Navigate to="/login" />; // Reindirizza se non autenticato
  }

  const userRoles = getRole();

  if (userRoles === undefined || !userRoles.includes(requiredRole)) {
    return <Navigate to="/unauthorized" />; // Se non ha il ruolo richiesto, reindirizza
  }

  return <>{children}</>; // Mostra il contenuto protetto
}
