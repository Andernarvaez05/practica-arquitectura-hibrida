
import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import { errorHandler } from './middlewares/error.middlewares.js';

const app = express();
const PORT = process.env['PORT'] ?? 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📋 Rutas disponibles:
   POST http://localhost:${PORT}/api/auth/login
   GET  http://localhost:${PORT}/api/tasks
   POST http://localhost:${PORT}/api/tasks`);
});