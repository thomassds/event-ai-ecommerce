import { validateCPF } from "@/utils/format-document";
import { z } from "zod";

const isValidBrazilianPhone = (phone: string) => {
  const cleaned = phone.replace(/[\s\(\)\-]/g, "");

  const phoneRegex = /^(\d{2})(\d{8,9})$/;

  return (
    phoneRegex.test(cleaned) && (cleaned.length === 10 || cleaned.length === 11)
  );
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const detectInputType = (input: string): "email" | "phone" | "cpf" => {
  const cleaned = input.trim();

  if (cleaned.includes("@")) {
    return "email";
  }

  if (/^\(/.test(cleaned)) {
    return "phone";
  }

  if (/\d{3}\.\d{3}\.\d{3}-\d{2}/.test(cleaned)) {
    return "cpf";
  }

  return "email";
};

export const loginSchema = z
  .object({
    username: z.string().min(1, "Campo é obrigatório"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(6, "Senha deve ter no mínimo 6 caracteres"),
  })
  .refine(
    (data) => {
      const inputType = detectInputType(data.username);

      if (inputType === "phone") {
        return isValidBrazilianPhone(data.username);
      } else if (inputType === "cpf") {
        return validateCPF(data.username);
      } else {
        return (
          isValidEmail(data.username) ||
          isValidBrazilianPhone(data.username) ||
          validateCPF(data.username)
        );
      }
    },
    {
      message: "Digite um e-mail válido, telefone ou CPF válido",
      path: ["username"],
    }
  );

export type LoginFormValues = z.infer<typeof loginSchema> & {
  detectedType?: "email" | "phone" | "cpf";
};
