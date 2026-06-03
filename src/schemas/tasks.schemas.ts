import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  description: z.string().optional(),
  completed: z.boolean().optional().default(false),
});
