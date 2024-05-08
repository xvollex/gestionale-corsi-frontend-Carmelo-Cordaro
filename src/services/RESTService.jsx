import Cookies from "js-cookie";

export async function login(userData) {
    try {
      const response = await fetch("http://localhost:8080/api/user/login",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const responseData = await response.json();
      return {
        status: response.status,
        data: responseData,
      };
    } catch (error) {
      console.error('Error during the request:', error);
      return {
        status: 500, // Return a generic error status code
        data: { error: 'Internal server error' },
      };
    }
  }
  

export async function registerUser(userData) {
    console.log(1,userData)
    const response = await fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    });

    return response; 
  
}

export async function getAllUsers() 
{
    const response = await fetch("http://localhost:8080/api/user/get-all", {
      method: 'GET',
    });
  
    return await response.json();
}

export async function deleteUser(userId) {
    const response = await fetch(`http://localhost:8080/api/user/deleteById/${userId}`, {
      method: 'DELETE',
    });
  
    return  response.status; // Status per confermare l'eliminazione
  }
  
  export async function updateUser(user) {
    console.log(user);
    const response = await fetch("http://localhost:8080/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });

    return response; // Dati aggiornati dell'utente
  }


export async function getUserById(userId) {
  try {
    const token = Cookies.get('token'); // Ottieni il token JWT
    console.log(token);
    const response = await fetch(`http://localhost:8080/api/user/get?id=${userId}`, {
      method: 'GET', // Richiesta GET per ottenere i dati dell'utente
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Invia il token per l'autenticazione
      },
    });

      return response.json(); // Restituisce i dati dell'utente

  } catch (error) {
    console.error('Errore durante la fetch dell\'utente:', error);
    throw error;
  }

}

  export async function getAllCourses() {
    const response = await fetch('http://localhost:8080/api/corso/corsi', {
      method: 'GET',
    });
  
    return await response.json(); // Restituisce la lista dei corsi
  }
  
  export async function deleteCourse(courseId) {
    const response = await fetch(`http://localhost:8080/api/corso/delete/${courseId}`, {
      method: 'DELETE',
    });

  }
  
  export async function createCourse(courseData) {
    const response = await fetch('http://localhost:8080/api/corso/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });
  
    return response; 
  }