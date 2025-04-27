import { z } from "zod";

export const businessInfoSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  companyNumber: z.string().min(1, "Company number is required"),
  vatNumber: z.string().optional(),
  logo: z.any().optional(),
  address: z.string().optional(),
  apartment: z.string().optional(),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  postCode: z.string().min(1, "Post code is required"),
  country: z.string().default("United Kingdom"),
});

export const contactDetailsSchema = z.object({
  firstName: z.string().min(1, "Primary contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Contact number is required"),
  landline: z.string().optional(),
});

export const linkAccountSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Invalid URL").optional(),
});

export type BusinessInfoInputs = z.infer<typeof businessInfoSchema>;
export type ContactDetailsInputs = z.infer<typeof contactDetailsSchema>;
export type LinkAccountInputs = z.infer<typeof linkAccountSchema>;

export type FormData = {
  businessInfo: BusinessInfoInputs;
  contactDetails: ContactDetailsInputs;
  linkAccounts: LinkAccountInputs[];
};