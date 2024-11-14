// src/services/api.js
import axios from 'axios';

// Crear instancia de Axios con la configuración basica
const api = axios.create({
  baseURL: 'http://localhost:5173/api', //url del backend
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


// Función para registrar un nuevo usuario
export const register = async (curp, apellido_paterno, apellido_materno, nombre, correo, telefono, usuario, contrasena, rol_id) => {
  try {
    const response = await api.post('/auth/registrar', {
      curp,
      apellido_paterno,
      apellido_materno,
      nombre,
      correo,
      telefono,
      usuario,
      contrasena,
      rol_id
    });
    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al hacer registro:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};


export const registerAddress3 = async (curp, calle, numero_exterior, numero_interior, colonia, ciudad, estado,codigo_postal, pais) => {
  try {
    console.log('Enviando solicitud para registrar dirección con curp:', curp);
    const response = await api.post('/auth/registrar-direccion', { 
      curp,
      calle,
      numero_exterior,
      numero_interior,
      colonia,
      ciudad,
      estado,
      codigo_postal,
      pais,
      
    });
    console.log('Respuesta del registro de dirección:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al hacer registro de dirección:', error);
    throw error;
  }
};
