// This file is auto-generated by @hey-api/openapi-ts

import { z } from 'zod';

export const zUser = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string().email(),
  email_verified_at: z.union([z.string().datetime(), z.null()]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const zRegisterUserResponse = z.object({
  success: z.boolean().optional(),
  message: z.string().optional(),
  data: zUser.optional(),
});
