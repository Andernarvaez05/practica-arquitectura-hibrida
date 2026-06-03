import { Router } from 'express';
import { getAllTasks, createTask } from '../controllers/tasks.controllers.js';
import { authenticate } from '../middlewares/auth.middlewares.js';
import { validateBody } from '../middlewares/validate.middlewares.js';
import { createTaskSchema } from '../schemas/tasks.schemas.js';

const router = Router();
router.use(authenticate); // ← Protege TODAS las rutas de este router
router.get("/", getAllTasks);
router.post("/", validateBody(createTaskSchema), createTask);
export default router;
