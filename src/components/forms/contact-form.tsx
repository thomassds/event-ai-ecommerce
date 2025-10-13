"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import {
  ContactValues,
  contactWithValidationSchema,
} from "@/schemas/auth/register";
import { resolve } from "path/win32";
import { Form, FormField } from "./form";
import { Checkbox, InputForm, MaskedInput } from "../inputs";
import { Label, PasswordStrength } from "../labels";
import { Button } from "../buttons";

const getState = (error?: string, touched?: boolean) => {
  if (!touched) return "default";
  if (error) return "error";
  return "default";
};

const getPasswordConfirmState = (
  confirmValue?: string,
  touched?: boolean,
  confirmError?: string,
  password?: string
) => {
  if (!touched) return "default";
  if (confirmError) return "error";
  if (!confirmValue) return "default";
  if (password && confirmValue && password !== confirmValue) return "error";
  if (password && confirmValue && password === confirmValue) return "success";
  return "default";
};

const getPasswordConfirmError = (
  confirmValue?: string,
  touched?: boolean,
  confirmError?: string,
  password?: string
) => {
  if (confirmError) return confirmError;
  if (touched && password && confirmValue && password !== confirmValue) {
    return "Senhas não conferem";
  }
  return undefined;
};

interface ContactProps {
  setCurrentStep: (step: number) => void;
}

export function ContactForm({ setCurrentStep }: ContactProps) {
  const router = useRouter();

  const [isHydrated, setIsHydrated] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // const { execute: verifyEmail, isPending: isVerifyingEmail } = useAction(
  //   verifyEmailAction,
  //   {
  //     onSuccess: (data) => {
  //       if (data?.data?.code === "EMAIL_ALREADY_REGISTERED") {
  //         const errorMsg =
  //           data.data.message || "Este email já está registrado.";
  //         setEmailErrorMessage(errorMsg);
  //         setHasEmailError(true);
  //       } else {
  //         setEmailErrorMessage("");
  //         setHasEmailError(false);
  //       }
  //     },
  //     onError: (error) => {
  //       const errorMessage =
  //         error.error?.serverError || "Erro ao verificar email";
  //       setEmailErrorMessage(errorMessage);
  //       setHasEmailError(true);
  //     },
  //   }
  // );

  const form = useForm({
    resolver: zodResolver(contactWithValidationSchema),
    mode: "onChange",
    defaultValues: {
      mail: "",
      cellphone: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  // // Load data from store after hydration (only once)
  // useEffect(() => {
  //   if (isHydrated && contactData && Object.keys(contactData).length > 0) {
  //     form.reset({
  //       mail: contactData.mail || "",
  //       cellphone: contactData.cellphone || "",
  //       password: contactData.password || "",
  //       confirmPassword: contactData.confirmPassword || "",
  //     });
  //   }
  // }, [isHydrated, contactData, form]); // Added missing dependencies

  const password = form.watch("password");

  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const verifyEmail = async ({ email }: { email: string }) => {
    try {
      setIsVerifyingEmail(true);
      const response = await new Promise<{ isRegistered: boolean }>(
        (resolve) => {
          setTimeout(() => {
            // For demonstration, let's say "email@example.com" is already registered
            const isRegistered = email === "email@example.com";
            resolve({ isRegistered });
          }, 1000);
        }
      );
      return response;
    } catch (error) {
      console.error("Error verifying email:", error);
      throw error;
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handleEmailBlur = () => {
    const emailValue = form.getValues("mail");
    if (emailValue && emailValue.includes("@")) {
      verifyEmail({ email: emailValue });
    }
  };

  const handleEmailChange = () => {
    // Limpar erro quando usuário começar a digitar
    if (hasEmailError) {
      setHasEmailError(false);
      setEmailErrorMessage("");
    }
  };

  const onSubmit = async (data: ContactValues) => {
    console.log("Contact form data:", data);
    // if (!personalData) {
    //   toast.error("Dados pessoais não encontrados. Reinicie o cadastro.");
    //   router.push("/registrar");
    //   return;
    // }

    setIsSubmitting(true);

    try {
      // Combine personal data and contact data
      // const formData: RegisterFormValues = {
      //   name: personalData.name || "",
      //   document: personalData.document || "",
      //   birthDate: personalData.birthDate,
      //   typeOfDocument: personalData.typeOfDocument || "CPF",
      //   nationality: personalData.nationality || "Brasileiro",
      //   sex: personalData.sex || "M",
      //   ...data,
      //   // Optional fields - deixar undefined para não serem enviados
      //   zipcode: undefined,
      //   address: undefined,
      //   number: undefined,
      //   neighborhood: undefined,
      //   complement: undefined,
      //   countryId: undefined,
      //   stateId: undefined,
      //   cityId: undefined,
      //   isPep: false,
      //   isPublicExposure: false,
      //   termsAccepted: data.termsAccepted,
      // };

      // Transform data for backend
      // const backendData = transformFormToBackend(formData);

      // Call register API
      // await authService.signUp(backendData);

      // Update registration store
      // setContactData(data);
      // markStepAsCompleted(2);

      toast.success(
        "Cadastro realizado com sucesso! Agora você pode fazer login."
      );
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      if (
        errorMessage.toLowerCase().includes("mail") ||
        errorMessage.toLowerCase().includes("email")
      ) {
        setEmailErrorMessage("Este email já está cadastrado");
        setHasEmailError(true);
      } else {
        toast.error(
          errorMessage || "Erro ao realizar cadastro. Tente novamente."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="mail"
          render={({ field, fieldState }) => (
            <InputForm
              {...field}
              type="email"
              label="Email (obrigatório)"
              placeholder="Digite seu email"
              state={getState(fieldState.error?.message, fieldState.isTouched)}
              error={fieldState.error?.message}
              touched={fieldState.isTouched}
              ariaLabel="Campo de email"
              onChange={(e) => {
                field.onChange(e);
                handleEmailChange();
              }}
              onBlur={() => {
                field.onBlur();
                handleEmailBlur();
              }}
            />
          )}
        />

        {/* Exibição de erro customizado para email */}
        {hasEmailError && emailErrorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-2">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 font-medium">
                  {emailErrorMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        <FormField
          control={form.control}
          name="cellphone"
          render={({ field, fieldState }) => (
            <MaskedInput
              {...field}
              id="cellphone-input"
              type="tel"
              mask="phone"
              label="Celular (obrigatório)"
              placeholder="(99) 9 9999-9999"
              state={getState(fieldState.error?.message, fieldState.isTouched)}
              error={fieldState.error?.message}
              ariaLabel="Campo de celular"
            />
          )}
        />

        <div className="space-y-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <InputForm
                {...field}
                type="password"
                label="Senha (obrigatório)"
                placeholder="Digite sua senha"
                showEyeIcon={true}
                enableCapsLockWarning={true}
                state={getState(
                  fieldState.error?.message,
                  fieldState.isTouched
                )}
                error={fieldState.error?.message}
                touched={fieldState.isTouched}
                ariaLabel="Campo de senha"
              />
            )}
          />

          <PasswordStrength password={password || ""} />
        </div>

        <div className="space-y-3">
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => {
              const confirmState = getPasswordConfirmState(
                field.value,
                fieldState.isTouched,
                fieldState.error?.message,
                password
              );
              const confirmError = getPasswordConfirmError(
                field.value,
                fieldState.isTouched,
                fieldState.error?.message,
                password
              );

              return (
                <InputForm
                  {...field}
                  type="password"
                  label="Confirmar Senha (obrigatório)"
                  placeholder="Confirme sua senha"
                  showEyeIcon={true}
                  enableCapsLockWarning={true}
                  state={confirmState}
                  error={confirmError}
                  touched={fieldState.isTouched}
                  ariaLabel="Campo de confirmação de senha"
                />
              );
            }}
          />
        </div>

        <div className="space-y-3">
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <div className="flex items-start gap-2 flex-col">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="termsAccepted"
                  />
                  <Label htmlFor="termsAccepted">
                    Aceitar termos e condições
                  </Label>
                </div>
                <p className="text-sm text-gray-500">
                  Ao clicar em &quot;Finalizar Cadastro&quot;, você concorda com
                  os{" "}
                  <Link
                    href="/termos-de-uso"
                    className="text-blue-500"
                    target="_blank"
                  >
                    Termos de Uso
                  </Link>{" "}
                  e a{" "}
                  <Link
                    href="/politica-de-privacidade"
                    className="text-blue-500"
                    target="_blank"
                  >
                    Política de Privacidade
                  </Link>
                </p>
              </div>
            )}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Link href="/registrar" className="flex-1">
            <Button
              type="button"
              variant="ghost"
              className="w-full h-12 text-[16px] text-[#5400D6] font-semibold"
            >
              <ArrowLeftIcon size={20} className="mr-2" />
              Voltar
            </Button>
          </Link>
          <Button
            type="submit"
            className="flex-1 h-12 text-[16px] font-semibold"
            disabled={
              !form.formState.isValid ||
              hasEmailError ||
              isVerifyingEmail ||
              isSubmitting
            }
          >
            {isSubmitting
              ? "Finalizando cadastro..."
              : isVerifyingEmail
              ? "Verificando email..."
              : "Finalizar Cadastro"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
