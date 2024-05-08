import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export function TokenCheck() {
    const token = Cookies.get('token');

    if (!token) { //token non presente
        return false;
    }

    try {
        const decodedToken = jwtDecode(token); //decodifica del token
        const expirationTime = decodedToken.exp * 1000; //scadenza token in millisecondi
        const currentTime = Date.now();

        console.log("token",decodedToken);

        if (expirationTime < currentTime) { //token scaduto
            return false;
        }

        //il token potrebbe essere corretto ma non quello che ci aspettiamo, quindi verifico tutti i campi che mi aspetto
        if (!decodedToken.nome || !decodedToken.cognome  ||  !decodedToken.email || !decodedToken.ruoli) {
            return false;
        }
    } catch (e) {
        console.log("Errore",e);
        return false; //c'è stato un errore quindi non sono riuscito a verificare correttamente il token
    }

    return true; //se sono arrivato fin qui vuol dire che ho passato tutte le istruzioni precedenti, quindi il token è valido
}

export function getRole()
{
    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token); // Decodifica il token
    return decodedToken.ruoli; // Ottieni il ruolo dal token
}

export function getId()
{
    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token); // Decodifica il token
    console.log(decodedToken.id);
    return decodedToken.id; // Ottieni il ruolo dal token
}