import express from 'express';
import { checkUserCredentials } from '../models/user.js'; //modelos de usuario.js
import { registerUser } from '../models/registrer.js'     //modelos de resistro de usuarios 
import { registerAddress3 } from '../models/addres.js';     //modelos de registro de direcciones 
import jwt from 'jsonwebtoken';                           // Importamos JWT para crear un token de sesión 

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


export default router;
