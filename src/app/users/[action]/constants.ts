import { z } from "zod";

export type FormMode = "add" | "edit" | "view";

export const formSchema = z.object({
  firstName: z.string().min(5).max(50),
  lastName: z.string().min(5).max(50),
  email: z.string().email({
    message: "El email debe ser un email válido",
  }),
  moneySpent: z.coerce.number().positive(),
  productsPurchased: z.coerce.number().positive(),
});
