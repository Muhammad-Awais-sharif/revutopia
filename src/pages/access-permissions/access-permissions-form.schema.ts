import { z } from 'zod';

export const accessPermissionsSchema = z.object({
  users: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      role: z.enum(['Owner', 'Manager']),
      avatar: z.string().optional(),
      status: z.enum(['active', 'pending']).optional(),
    })
  ),
  settings: z
    .object({
      advancedEnabled: z.boolean().default(false),
    })
    .optional(),
});

export const addPersonSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
});

export type AccessPermissionsInputs = z.infer<typeof accessPermissionsSchema>;
