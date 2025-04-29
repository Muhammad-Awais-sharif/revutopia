import { z } from 'zod';

export const businessInfoSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  companyNumber: z.string().min(1, 'Company number is required'),
  vatNumber: z.string().optional(),
  logo: z.any().optional(),
  address: z.string().optional(),
  apartment: z.string().optional(),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  postCode: z.string().min(1, 'Post code is required'),
  country: z.string().default('United Kingdom'),
});

export type BusinessInfoInputs = z.infer<typeof businessInfoSchema>;
