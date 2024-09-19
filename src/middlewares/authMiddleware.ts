import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const jwtSecret = process.env.JWT_SECRET || '';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  }
