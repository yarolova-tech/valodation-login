import * as z from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "L'email est obligatoire")
    .max(50, "L'email doit contenir au maximum 50 caractères")
    .toLowerCase()
    .email("Format d'email invalide")
    .regex(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      "L'email doit être écrit uniquement en minuscules"
    ),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .max(100, "Le mot de passe doit contenir au maximum 100 caractères")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
      'Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial'
    ),

  confirmPassword: z
    .string()
    .min(1, "La confirmation est obligatoire"),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;