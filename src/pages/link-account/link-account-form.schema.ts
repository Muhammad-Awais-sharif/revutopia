import { z } from 'zod';

export const linkAccountSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Invalid URL').optional(),
});

export type LinkAccountInputs = z.infer<typeof linkAccountSchema>;
