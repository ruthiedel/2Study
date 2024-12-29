import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("אימייל לא חוקי"),
  password: z.string().min(6, "הסיסמה חייבת להכיל לפחות 6 תווים"),
});

export const registerSchema = loginSchema.extend({
  username: z.string().min(3, "שם המשתמש חייב להכיל לפחות 3 תווים"),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "חובה לאשר את התקנון כדי להירשם" }),
  }),
});

export const contactSchema = z.object({
    name: z.string().min(1, '*שדה חובה'),
    email: z.string().nonempty('*שדה חובה').email('*כתובת מייל לא תקינה'),
    message: z.string().min(1, '*שדה חובה'),
});

export const passwordSchema = z.object({
    password: z
        .string()
        .min(6, { message: 'הסיסמא צריכה להכיל לפחות 6 תווים' })
        .regex(/[a-z]/, { message: 'הסיסמא צריכה לכלול אותיות קטנות' })
        .regex(/[A-Z]/, { message: 'הסיסמא צריכה לכלול אותיות גדולות' })
        .regex(/[0-9]/, { message: 'הסיסמא צריכה לכלול ספרות' }),
    confirmPassword: z.string().min(6, { message: 'הסיסמא צריכה להכיל לפחות 6 תווים' }),
}).refine(data => data.password === data.confirmPassword, {
    message: 'הסיסמאות לא תואמות',
    path: ['confirmPassword'],
});
