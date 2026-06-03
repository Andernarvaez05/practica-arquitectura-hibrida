import { Router } from 'express';
import { loginController } from '../controllers/auth.controllers.js';
import { validateBody } from '../middlewares/validate.middlewares.js';
import { loginSchema } from '../schemas/auth.schemas.js';

const router = Router();
router.post("/login", validateBody(loginSchema), loginController);
export default router;
