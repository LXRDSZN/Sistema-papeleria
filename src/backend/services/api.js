// src/services/api.js
import axios from 'axios';

// Crear instancia de Axios con la configuración basica
const api = axios.create({
  baseURL: 'http://localhost:5000/api', //url del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para login
export const login = async (usuario, contrasena) => {
  try {
    const response = await api.post('/auth/login', {
      usuario,
      contrasena,
    });
    // Devuelve la respuesta de la API (por ejemplo, el token)
    return response.data;  
  } catch (error) {
    console.error('Error al hacer login:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;  
  }
};
