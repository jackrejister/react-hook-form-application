
import { z } from 'zod';

export const basicFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old').max(100, 'Must be under 100'),
  bio: z.string().min(10, 'Bio must be at least 10 characters').max(500, 'Bio must be under 500 characters'),
});

export const advancedFormSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  birthDate: z.date(),
  gender: z.enum(['male', 'female', 'other']),
  country: z.string().min(1, 'Please select a country'),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  profilePicture: z.any().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to terms'),
  newsletter: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const dynamicFormSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  teamMembers: z.array(z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    email: z.string().email('Invalid email'),
  })).min(1, 'At least one team member is required'),
  tags: z.array(z.string()).optional(),
});

export const watchFormSchema = z.object({
  subscriptionType: z.enum(['basic', 'premium', 'enterprise']),
  features: z.array(z.string()),
  maxUsers: z.number().min(1),
  customDomain: z.boolean(),
  supportLevel: z.enum(['email', 'chat', 'phone']),
  additionalServices: z.array(z.string()).optional(),
});

export type BasicFormData = z.infer<typeof basicFormSchema>;
export type AdvancedFormData = z.infer<typeof advancedFormSchema>;
export type DynamicFormData = z.infer<typeof dynamicFormSchema>;
export type WatchFormData = z.infer<typeof watchFormSchema>;
