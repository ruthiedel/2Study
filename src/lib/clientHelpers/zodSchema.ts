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