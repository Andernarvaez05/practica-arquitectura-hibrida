import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth.middlewares.js';

const tasks: Array<{ id: number; title: string; userId: number }> = [];
let nextId = 1;

export const getAllTasks = (req: AuthRequest, res: Response): void => {
  const userTasks = tasks.filter(t => t.userId === req.user?.id);
  res.status(200).json(userTasks);
};

export const createTask = (req: AuthRequest, res: Response): void => {
  const { title } = req.body;
  const newTask = { id: nextId++, title, userId: req.user!.id }; // ← Del token, no del body
  tasks.push(newTask);
  res.status(201).json(newTask);
};
