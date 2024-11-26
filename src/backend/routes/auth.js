import express from 'express';
import { checkUserCredentials } from '../models/user.js';           //modelos de usuario.js
import { registerUser } from '../models/registrer.js'               //modelos de resistro de usuarios 
import { registerAddress3 } from '../models/addres.js';             //modelos de registro de direcciones 
import { resgistrerproducto } from '../models/AltasProductos.js';   //modelos de registro de productos 
import { eliminarProducto } from '../models/BajaProducto.js';       //modelos para la eliminacion de productos 
import { eliminarUsuario } from '../models/remove-usuario.js';      //modelo para la eliminacion de un usuario
import { consultausuarios } from '../models/Usuarios.js';           //modelo para obtener usuarios
import jwt from 'jsonwebtoken';                                     //Importamos JWT para crear un token de sesión 


const router = express.Router();

// Ruta para login
router.post('/auth/login', async (req, res) => {  // path de auth
  const { usuario, contrasena } = req.body;

  try {
    const user = await checkUserCredentials(usuario, contrasena);
    if (user) {
      // Crear un JWT de sesión (opcional)
      const token = jwt.sign({ id: user.curp, username: user.usuario }, 'secretKey', { expiresIn: '1h' });
      return res.json({ message: 'Login exitoso', token });  // Devuelve el token al frontend
    }
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor', error });
  }
});
// Ruta para Registro de Usuario
router.post('/auth/registrar', async (req, res) => {
  const { curp, apellido_paterno, apellido_materno, nombre, correo, telefono, usuario, contrasena, rol_id } = req.body;

  try {
    // Llamamos al modelo de usuario para registrar los datos
    const newUser = await registerUser(curp, apellido_paterno, apellido_materno, nombre, correo, telefono, usuario, contrasena, rol_id);

    if (newUser) {
      return res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } else {
      return res.status(400).json({ message: 'No se pudo registrar el usuario' });
    }
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return res.status(500).json({ message: 'Error del servidor', error });
  }
});

//Ruta para Registro de Direcciones 
router.post('/auth/registrar-direccion', async (req, res) => {
  const { curp, calle, numero_exterior, numero_interior, colonia, ciudad, estado, pais, codigo_postal } = req.body;

  console.log('Datos recibidos:', req.body);  // Verifica que los datos son los correctos

  try {
    // Llamamos al modelo de direcciones para registrar los datos
    const newAddress = await registerAddress3(curp, calle, numero_exterior, numero_interior, colonia, ciudad, estado, codigo_postal,pais,);

    if (newAddress) {
      return res.status(201).json({ message: 'Dirección registrada exitosamente' });
    } else {
      return res.status(400).json({ message: 'No se pudo registrar la dirección' });
    }
  } catch (error) {
    console.error('Error al registrar la dirección:', error);
    return res.status(500).json({ message: 'Error del servidor', error });
  }
});


// Ruta para eliminar un usuario
router.post('/auth/bajausuario', async (req, res) => {
  const { curp, username } = req.body;

  try {
    const result = await eliminarUsuario(curp, username);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return res.status(500).json({ message: 'Error del servidor', error });
  }
});

//Ruta para agregar un producto 
router.post('/auth/altaproducto', async (req, res) => {
  const { codigo_barras, categoria, nombre, cantidad, precio_compra, precio_venta } = req.body;

  console.log("Datos recibidos en el servidor:", req.body); // Verifica los datos recibidos

  try {
    const newproducto = await resgistrerproducto(codigo_barras, categoria, nombre, cantidad, precio_compra, precio_venta);

    if (newproducto) {
      return res.status(201).json({ message: 'Producto registrado exitosamente', producto: newproducto });
    } else {
      return res.status(400).json({ message: 'No se pudo registrar el producto' });
    }
  } catch (error) {
    console.error('Error al registrar el producto:', error);
    return res.status(500).json({ message: 'Error del servidor', error });
  }
});

// Ruta para borrar un producto
router.post('/auth/bajaproducto', async (req, res) => {
  const { formaEliminacion, datoSeleccionado } = req.body;

  try {
    // Validar que se recibieron los datos necesarios
    if (!formaEliminacion || !datoSeleccionado) {
      return res.status(400).json({
        success: false,
        message: "Debes proporcionar la forma de eliminación y el dato correspondiente.",
      });
    }

    // Llamar a la función de eliminación
    const resultado = await eliminarProducto(formaEliminacion, datoSeleccionado);

    // Devolver la respuesta con el resultado
    if (resultado.success) {
      return res.status(200).json({
        success: true,
        message: resultado.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: resultado.message,
      });
    }
  } catch (error) {
    console.error("Error al intentar eliminar el producto:", error);
    return res.status(500).json({
      success: false,
      message: "Hubo un error al intentar eliminar el producto.",
    });
  }
});


// Ruta para obtener los usuarios
router.get('/auth/obtenerusuarios', async (req, res) => {
  try {
    // Llamamos a la función consultausuarios para obtener los usuarios
    const usuarios = await consultausuarios();
    
    // Si todo va bien, enviamos los usuarios como respuesta
    res.status(200).json(usuarios);
  } catch (error) {
    // Si hay algún error, devolvemos un mensaje de error
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al consultar los usuarios', error: error.message });
  }
});

export default router;


