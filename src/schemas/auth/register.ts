import { z } from "zod";

// Step 1: Personal Data - Updated to match endpoint
export const personalDataSchema = z.object({
  name: z.string().min(2, "Nome completo é obrigatório"),
  document: z.string().min(1, "Documento é obrigatório"),
  birthDate: z.string().optional(),
  typeOfDocument: z.enum(["CPF", "CNPJ", "PASSPORT"]),
  nationality: z.enum(["Brasileiro", "Estrangeiro"]).optional(),
  sex: z.enum(["M", "F", "O"], {
    error: "Sexo é obrigatório",
  }),
});

// Step 2: Contact
export const contactSchema = z.object({
  mail: z.string().email("E-mail inválido"),
  cellphone: z
    .string()
    .min(10, "Celular é obrigatório")
    .regex(
      /^\((\d{2}|[A-Z])\)\s\d{1}\s\d{4}-\d{4}$|^\((\d{2}|[A-Z])\)\s\d{4}-\d{4}$/,
      "Celular deve estar no formato (XX) X XXXX-XXXX, (M) X XXXX-XXXX, (XX) XXXX-XXXX ou (M) XXXX-XXXX"
    ),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Senha deve conter pelo menos um caractere especial"
    ),
  confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  termsAccepted: z.boolean({}).refine((val) => val === true, {
    message: "Você deve aceitar os termos e condições",
  }),
});

// Contact with password validation
export const contactWithValidationSchema = contactSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  }
);

// Step 3: Address (now optional)
export const addressSchema = z.object({
  zipcode: z.string().optional(),
  address: z.string().optional(),
  number: z.string().optional(),
  neighborhood: z.string().optional(),
  complement: z.string().optional(),
  countryId: z.coerce.number().optional(),
  stateId: z.coerce.number().optional(),
  cityId: z.coerce.number().optional(),
});

// Step 4: Public Exposure (now optional)
export const publicExposureSchema = z.object({
  isPep: z.boolean().optional(),
  isPublicExposure: z.boolean().optional(),
});

// Complete form schema
export const registerSchema = personalDataSchema
  .merge(contactSchema)
  .merge(addressSchema)
  .merge(publicExposureSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

// Backend payload type (matching the exact endpoint structure)
export const backendRegisterSchema = z.object({
  name: z.string(),
  document: z.string(),
  birthDate: z.string().optional(),
  nationality: z.string(),
  typeOfDocument: z.string(),
  mail: z.string().email(),
  cellphone: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  zipcode: z.string().optional(),
  countryId: z.string().optional(), // Backend expects string
  stateId: z.string().optional(), // Backend expects string
  cityId: z.string().optional(), // Backend expects string
  address: z.string().optional(),
  number: z.string().optional(),
  neighborhood: z.string().optional(),
  complement: z.string().optional(),
  isPep: z.boolean().optional(),
  isPublicExposure: z.boolean().optional(),
  termsAccepted: z.boolean(),
});

// Response types
export const authResponseSchema = z.object({
  accessToken: z.string(),
  client: z.string(),
});

// Exported types
export type PersonalDataValues = z.infer<typeof personalDataSchema>;
export type ContactValues = z.infer<typeof contactSchema>;
export type AddressValues = z.infer<typeof addressSchema>;
export type PublicExposureValues = z.infer<typeof publicExposureSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type BackendRegisterData = z.infer<typeof backendRegisterSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;

// Função para converter data DD/MM/YYYY para YYYY-MM-DD
const convertBrazilianDateToISO = (dateStr?: string): string | undefined => {
  if (!dateStr) return undefined;

  // Se já está no formato ISO (YYYY-MM-DD), retorna como está
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }

  // Converte DD/MM/YYYY para YYYY-MM-DD
  const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (match) {
    const [, day, month, year] = match;
    return `${year}-${month}-${day}`;
  }

  return undefined;
};

// Função para transformar dados do form para o backend - Updated to match endpoint exactly
export const transformFormToBackend = (
  formData: RegisterFormValues
): BackendRegisterData => {
  const documentValue = formData.document.replace(/\D/g, "");

  const result: Partial<BackendRegisterData> = {
    name: formData.name,
    document: documentValue,
    birthDate: convertBrazilianDateToISO(formData.birthDate),
    nationality: formData.nationality || "Brasileiro",
    typeOfDocument: formData.typeOfDocument,
    mail: formData.mail,
    cellphone: formData.cellphone.replace(/\D/g, ""), // Remove formatting
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    isPep: formData.isPep ?? false,
    isPublicExposure: formData.isPublicExposure ?? false,
    termsAccepted: formData.termsAccepted,
  };

  // Só adicionar campos de endereço se estiverem preenchidos
  if (formData.zipcode) {
    result.zipcode = formData.zipcode.replace(/\D/g, "");
  }
  if (formData.countryId) {
    result.countryId = String(formData.countryId);
  }
  if (formData.stateId) {
    result.stateId = String(formData.stateId);
  }
  if (formData.cityId) {
    result.cityId = String(formData.cityId);
  }
  if (formData.address) {
    result.address = formData.address;
  }
  if (formData.number) {
    result.number = formData.number;
  }
  if (formData.neighborhood) {
    result.neighborhood = formData.neighborhood;
  }
  if (formData.complement) {
    result.complement = formData.complement;
  }

  return result as BackendRegisterData;
};
