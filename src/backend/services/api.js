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

//Funcion para Registrar Direcciones de usuario  
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

// Función para eliminar un usuario
export const eliminarUsuario = async (curp, username) => {
  try {
    const response = await api.post('/auth/bajausuario', {
      curp,
      username,
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};

// Función para registrar un nuevo producto
export const resgistrerproducto = async (Codigo_barras, selectedCategory, Nombre_producto, Cantidad_producto, Precio_compra, precio_venta) => {
  try {
    const response = await api.post('/auth/altaproducto', {
      Codigo_barras, 
      selectedCategory, 
      Nombre_producto, 
      Cantidad_producto, 
      Precio_compra, 
      precio_venta
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al hacer registro:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};