import express from 'express';
import { checkUserCredentials } from '../models/user.js'; //modelos de usuario.js
import jwt from 'jsonwebtoken';  // Importamos JWT para crear un token de sesión 

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

export default router;
