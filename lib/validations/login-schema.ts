import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "L'email est requis")
    .max(50, "L'email doit contenir au maximum 50 caractères")
    .email("Format d'email invalide")
    .toLowerCase() 
    .regex(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      "L'email doit être écrit uniquement en minuscules"
    )
    .max(50, "L'email doit contenir au maximum 50 caractères"),

  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .max(100, "Le mot de passe doit contenir au maximum 100 caractères")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
      'Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial'
    )
});

export type LoginSchema = z.infer<typeof loginSchema>;