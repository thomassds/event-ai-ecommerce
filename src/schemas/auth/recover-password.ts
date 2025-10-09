import { z } from "zod";

const whatsappRegex = /^\d{10,}$/;

export const forgotPasswordSchema = z.object({
  username: z
    .string()
    .min(1, "Campo obrigatório")
    .refine(
      (value) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isWhatsapp = whatsappRegex.test(value.replace(/\D/g, ""));
        return isEmail || isWhatsapp;
      },
      {
        message: "Digite um e-mail válido.",
      }
    ),
});

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(1, "Código é obrigatório")
    .length(4, "Código deve ter 4 dígitos")
    .regex(/^\d{4}$/, "Código deve conter apenas números"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
        "Senha deve conter ao menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial"
      ),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type VerifyCodeFormValues = z.infer<typeof verifyCodeSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const recoverPasswordSchema = forgotPasswordSchema;
export type RecoverPasswordFormValues = ForgotPasswordFormValues;
