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
//Funcion para agregar  un producto
export const resgistrerproducto = async (codigo_barras, categoria, nombre, cantidad, precio_compra, precio_venta) => {
  try {
    console.log('Datos enviados a la API:', {
      codigo_barras, 
      categoria, 
      nombre, 
      cantidad, 
      precio_compra, 
      precio_venta
    });

    const response = await api.post('/auth/altaproducto', {
      codigo_barras, 
      categoria, 
      nombre, 
      cantidad, 
      precio_compra, 
      precio_venta
    });

    return response.data;
  } catch (error) {
    console.error('Error al hacer registro:', error);
    throw error;
  }
};


//Funcion para borrar un producto 

export const eliminarProducto = async (formaEliminacion, datoSeleccionado) =>{
  try {
    const response = await api.post('/auth/bajaproducto', {
      formaEliminacion, 
      datoSeleccionado
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};



// Función para obtener usuarios
export const obtenerUsuarios = async () => {
  try {
    // Realizamos una solicitud GET a la ruta completa en el backend
    const response = await axios.get('http://localhost:5000/api/auth/obtenerusuarios');
    return response.data;  // Devolvemos los datos de la respuesta (usuarios)
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw new Error('Error al obtener los usuarios.');
  }
};


// Función para obtener productos
export const obtenerProductos = async () => {
  try {
    // Realizamos una solicitud GET a la ruta completa en el backend
    const response = await axios.get('http://localhost:5000/api/auth/obtenerproductos');
    return response.data;  // Devolvemos los datos de la respuesta (productos)
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw new Error('Error al obtener los productos.');
  }
};



export const registrarVenta = async (producto_id, cantidad, precio_total) => {
  try {
    console.log('Datos enviados a la API /auth/ventas:', {
      producto_id, 
      cantidad, 
      precio_total
    });

    const response = await api.post('/auth/ventas', {
      producto_id, 
      cantidad, 
      precio_total
    });

    // Verifica si la venta fue registrada correctamente
    if (response.data.success) {
      return response.data;  // Devuelve los datos de la venta registrada
    } else {
      throw new Error(response.data.message || 'Error al registrar la venta');
    }
  } catch (error) {
    console.error('Error al registrar la venta:', error);
    throw error;
  }
};
