import { z } from 'zod';
import { UserRole } from '@/gql/graphql';

export const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(UserRole).optional(),
});

export type SignupFormInput = z.input<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginFormInput = z.input<typeof loginSchema>;
