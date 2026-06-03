import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const FAKE_USERS = [
  { id: 45, email: 'estudiante@yavirac.edu.ec', password: '123456' },
  { id: 46, email: 'atacante@email.com', password: 'pass46' },
];

export const loginController = (req: Request, res: Response): void => {
  const { email, password } = req.body;
  const user = FAKE_USERS.find(u => u.email === email && u.password === password);

  if (!user) { res.status(401).json({ message: 'Credenciales incorrectas' }); return; }
    const secret = process.env.JWT_SECRET ?? "fallback";
  const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "1h" });

  res.status(200).json({ message: 'Login exitoso', token });
};

