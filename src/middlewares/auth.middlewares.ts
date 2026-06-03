import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Acceso denegado: token no proporcionado' });
    return;
  }

  // PASO 2: Extraer solo el token (quitamos el prefijo "Bearer ")
  const parts = authHeader.split(' ');
  const token = parts[1];

if (!token) {
  res.status(401).json({ message: 'Acceso denegado: token malformado' });
  return;
}

try {
    const secret = process.env.JWT_SECRET ?? 'fallback_secret';
    console.log('SECRET EN USO:', process.env.JWT_SECRET); // ← agrega esta línea
    const decoded = jwt.verify(token, secret) as unknown as { id: number; email: string };
    // PASO 4: Adjuntar los datos del usuario al request
    // Ahora los controllers pueden usar req.user.id sin confiar en el body del cliente
    req.user = decoded;
    next(); // Todo válido, continuar
    
  } catch {
    // Si el token expiró o fue manipulado, rechazamos con 401
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};