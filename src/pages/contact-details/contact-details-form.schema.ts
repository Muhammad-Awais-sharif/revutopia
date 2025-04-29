import { z } from 'zod';

export const contactDetailsSchema = z.object({
  firstName: z.string().min(1, 'Primary contact name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Contact number is required'),
  landline: z.string().optional(),
});

export type ContactDetailsInputs = z.infer<typeof contactDetailsSchema>;
