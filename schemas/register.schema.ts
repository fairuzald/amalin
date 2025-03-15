import * as z from 'zod';

const phoneRegex = /^[0-9]{10,13}$/;

// Step 1 schema (Account)
export const accountSchema = z
  .object({
    method: z.enum(['phone', 'email']),
    phoneNumber: z
      .string()
      .regex(phoneRegex, 'Nomor telepon tidak valid')
      .optional()
      .or(z.literal('')),
    email: z.string().email('Email tidak valid').optional().or(z.literal('')),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string(),
  })
  .refine(
    data => {
      if (data.method === 'phone') {
        return !!data.phoneNumber;
      } else {
        return !!data.email;
      }
    },
    {
      message: 'Silakan masukkan nomor telepon atau email',
      path: ['phoneNumber', 'email'],
    }
  )
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password dan konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  });

// Enhanced address schema
export const addressSchema = z.object({
  country: z.string({
    required_error: 'Negara wajib dipilih',
  }),
  province: z.string({
    required_error: 'Provinsi wajib dipilih',
  }),
  district: z.string({
    required_error: 'Kabupaten/Kota wajib dipilih',
  }),
  detailAddress: z.string().optional(),
});

// Step 2 schema (Profile)
export const profileSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  birthDate: z.string().optional(),
  gender: z.string().optional(),
  address: addressSchema,
});

// Step 3 schema (Verification)
export const verificationSchema = z.object({
  otp: z.string().length(6, 'Kode OTP harus 6 digit').optional(),
});

export const registerSchema = z.object({
  account: accountSchema,
  profile: profileSchema,
  verification: verificationSchema,
});

export type RegisterFormData = z.infer<typeof registerSchema>;
