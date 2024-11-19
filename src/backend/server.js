import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';  // Importas las rutas de autenticación

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173',  // URL del frontend
  credentials: true,  // Permite que las cookies sean enviadas entre frontend y backend
  methods: ['GET', 'POST'],
}));

app.use(express.json());  // Middleware para manejar el cuerpo de las solicitudes en formato JSON

app.use('/api', authRoutes);  // Ruta base para las rutas de autenticación

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
