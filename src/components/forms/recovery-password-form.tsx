"use client";

import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
  ResetPasswordFormValues,
  resetPasswordSchema,
  VerifyCodeFormValues,
  verifyCodeSchema,
} from "@/schemas/auth/recover-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputForm, InputFormState, OTPInputComponent } from "../inputs";
import { LockIcon, PasswordIcon } from "@phosphor-icons/react";
import { CircularStepIndicator } from "../steps";
import { Form, FormField } from "./form";
import { Button } from "../buttons";
import Link from "next/link";
import { PasswordStrength } from "../labels";
import { Card, CardContent } from "../cards";
import {
  formatPhoneNumber,
  isPhoneNumber,
  unformatPhoneNumber,
} from "@/utils/format-phone";

type RecoveryStep = "forgot" | "verify" | "reset" | "success";

export function RecoverPasswordForm() {
  const searchParams = useSearchParams();
  const isExported = searchParams.get("exported") === "true";
  const emailFromParams = searchParams.get("email") || "";
  const contactFromParams = searchParams.get("contact") || "";
  const contactTypeFromParams = searchParams.get("contactType") || "email";

  const [currentStep, setCurrentStep] = useState<RecoveryStep>(
    isExported ? "verify" : "forgot"
  );
  const [userEmail, setUserEmail] = useState<string>(emailFromParams);
  const [resetToken, setResetToken] = useState<string>("");
  const [isExportedUser] = useState<boolean>(isExported);

  const formatContact = (contact: string, type: string) => {
    if (type === "phone") {
      const cleanPhone = contact.replace(/\D/g, "");
      if (cleanPhone.length === 11) {
        return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(
          2,
          7
        )}-${cleanPhone.slice(7)}`;
      }
      return contact;
    }
    return contact;
  };

  const forgotForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      username: "",
    },
    mode: "onChange",
  });

  const verifyForm = useForm<VerifyCodeFormValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
    mode: "onChange",
  });

  const resetForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (currentStep === "verify") {
      verifyForm.reset({ code: "" });
    }
  }, [currentStep, verifyForm]);

  const codeValue = verifyForm.watch("code");

  useEffect(() => {
    if (codeValue && verifyForm.formState.errors.code) {
      verifyForm.clearErrors("code");
    }
  }, [codeValue, verifyForm]);

  const getState = (
    error?: string,
    touched?: boolean,
    value?: string
  ): InputFormState => {
    if (!touched) return "default";
    if (error) return "error";
    if (value && !error) return "success";
    return "default";
  };

  const getPasswordConfirmState = (
    confirmValue?: string,
    touched?: boolean,
    confirmError?: string,
    password?: string
  ): InputFormState => {
    if (!touched) return "default";
    if (confirmError) return "error";
    if (!confirmValue) return "default";
    if (password && confirmValue && password !== confirmValue) return "error";
    if (password && confirmValue && password === confirmValue) return "success";
    return "default";
  };

  const handleUsernameChange = (value: string) => {
    if (isPhoneNumber(value)) {
      const formatted = formatPhoneNumber(value);
      forgotForm.setValue("username", formatted);
    } else {
      forgotForm.setValue("username", value);
    }
  };

  const handleForgotPassword = (data: ForgotPasswordFormValues) => {
    setUserEmail(data.username);

    const identifier = isPhoneNumber(data.username)
      ? unformatPhoneNumber(data.username)
      : data.username;

    console.log({ identifier });
  };

  const handleVerifyCode = (data: VerifyCodeFormValues) => {
    console.log(data);
  };

  const handleResetPassword = (data: ResetPasswordFormValues) => {
    if (!resetToken) {
      resetForm.setError("password", {
        type: "manual",
        message: "Código de reset não encontrado. Reinicie o processo.",
      });
      return;
    }

    console.log(data);
  };

  const handleBackToLogin = () => {
    setCurrentStep("forgot");
    forgotForm.reset();
    verifyForm.reset();
    resetForm.reset();
    setUserEmail("");
    setResetToken("");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "forgot":
        return (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#5400D6]/10 flex items-center justify-center mb-6">
                <LockIcon width={40} height={40} fill="#5400D6" />
              </div>

              <div className="flex items-center gap-4 mb-4">
                <CircularStepIndicator
                  currentStep={1}
                  totalSteps={3}
                  size={60}
                />
                <div className="text-left">
                  <h1 className="text-[20px] leading-[28px] font-semibold text-[#5400D6]">
                    Esqueceu sua senha?
                  </h1>
                  <p className="text-[14px] leading-[20px] text-[#6E7278]">
                    Sem problemas, vamos enviar instruções para resetar sua
                    senha.
                  </p>
                </div>
              </div>
            </div>

            <Form {...forgotForm}>
              <form
                onSubmit={forgotForm.handleSubmit(handleForgotPassword)}
                className="space-y-8"
              >
                <FormField
                  control={forgotForm.control}
                  name="username"
                  render={({ field, fieldState }) => (
                    <InputForm
                      {...field}
                      type="text"
                      label="Email ou Telefone"
                      placeholder="Digite seu email ou telefone"
                      state={getState(
                        fieldState.error?.message,
                        fieldState.isTouched,
                        field.value
                      )}
                      error={fieldState.error?.message}
                      touched={fieldState.isTouched}
                      ariaLabel="Campo de email ou telefone"
                      onChange={(e) => {
                        const value = e.target.value;
                        handleUsernameChange(value);
                      }}
                    />
                  )}
                />

                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  className="w-full"
                  disabled={forgotForm.formState.isSubmitting}
                  loading={forgotForm.formState.isSubmitting}
                >
                  {forgotForm.formState.isSubmitting
                    ? "Enviando..."
                    : "Confirmar"}
                </Button>
              </form>
            </Form>

            <div className="flex items-center gap-2 text-[14px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 3.5L2.5 8L6.5 12.5"
                  stroke="#5400D6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link
                href="/auth"
                className="text-[#5400D6] font-medium hover:underline"
              >
                Voltar a tela de login.
              </Link>
            </div>
          </div>
        );

      case "verify":
        return (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#5400D6]/10 flex items-center justify-center mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 10.6667L14.5867 17.68C15.0583 17.9724 15.6131 18.1284 16.18 18.1284C16.7469 18.1284 17.3017 17.9724 17.7733 17.68L28.36 10.6667M6.66667 25.3333H25.3333C27.1743 25.3333 28.6667 23.8409 28.6667 22V10C28.6667 8.15905 27.1743 6.66667 25.3333 6.66667H6.66667C4.82572 6.66667 3.33333 8.15905 3.33333 10V22C3.33333 23.8409 4.82572 25.3333 6.66667 25.3333Z"
                    stroke="#5400D6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <CircularStepIndicator
                  currentStep={2}
                  totalSteps={3}
                  size={60}
                />
                <div className="text-left">
                  <h1 className="text-[20px] leading-[28px] font-semibold text-[#5400D6]">
                    {isExportedUser ? "Redefinir Senha" : "Confirmar Email"}
                  </h1>
                  <p className="text-[14px] leading-[20px] text-[#6E7278]">
                    {isExportedUser ? (
                      <>
                        É necessário que você refaça sua senha para prosseguir.{" "}
                        <br />
                        Enviamos um código para seu{" "}
                        <span className="font-medium text-[#272D36]">
                          {contactTypeFromParams === "phone"
                            ? "telefone"
                            : "email"}{" "}
                          {formatContact(
                            contactFromParams || userEmail,
                            contactTypeFromParams
                          )}
                        </span>
                      </>
                    ) : (
                      <>
                        Enviamos um código de verificação para <br />
                        <span className="font-medium text-[#272D36]">
                          {userEmail}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <Form {...verifyForm}>
              <form
                onSubmit={verifyForm.handleSubmit(handleVerifyCode)}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <label className="text-[14px] leading-[16px] text-[#272D36] font-medium">
                    Digite o código de verificação
                  </label>
                  <OTPInputComponent
                    maxLength={4}
                    value={verifyForm.watch("code") || ""}
                    onChange={(value) => {
                      verifyForm.setValue("code", value);
                      // Limpa erros quando usuário começa a digitar
                      if (verifyForm.formState.errors.code && value) {
                        verifyForm.clearErrors("code");
                      }
                    }}
                    error={verifyForm.formState.errors.code?.message}
                  />
                </div>

                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  className="w-full mt-6"
                  disabled={verifyForm.formState.isSubmitting}
                  loading={verifyForm.formState.isSubmitting}
                >
                  {verifyForm.formState.isSubmitting
                    ? "Verificando..."
                    : "Verificar Código"}
                </Button>
              </form>
            </Form>

            <div className="flex items-center gap-2 text-[14px] mt-4">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 3.5L2.5 8L6.5 12.5"
                  stroke="#5400D6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <button
                onClick={handleBackToLogin}
                className="text-[#5400D6] font-medium hover:underline"
                type="button"
                aria-label="Voltar para tela de login"
              >
                Voltar a tela de login.
              </button>
            </div>
          </div>
        );

      case "reset":
        const password = resetForm.watch("password");

        return (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#5400D6]/10 flex items-center justify-center mb-6">
                <PasswordIcon width={40} height={40} fill="#5400D6" />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <CircularStepIndicator currentStep={3} totalSteps={3} size={60} />
              <div className="text-left">
                <h1 className="text-[20px] leading-[28px] font-semibold text-[#5400D6]">
                  Criar Nova Senha
                </h1>
                <p className="text-[14px] leading-[20px] text-[#6E7278]">
                  Etapa final
                </p>
              </div>
            </div>

            <Form {...resetForm}>
              <form
                onSubmit={resetForm.handleSubmit(handleResetPassword)}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <FormField
                    control={resetForm.control}
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
                          fieldState.isTouched,
                          field.value
                        )}
                        error={fieldState.error?.message}
                        touched={fieldState.isTouched}
                        ariaLabel="Campo de nova senha"
                      />
                    )}
                  />
                  <PasswordStrength password={password || ""} />
                </div>

                <div className="space-y-3">
                  <FormField
                    control={resetForm.control}
                    name="confirmPassword"
                    render={({ field, fieldState }) => (
                      <InputForm
                        {...field}
                        type="password"
                        label="Confirmar Senha (obrigatório)"
                        placeholder="Confirme sua senha"
                        showEyeIcon={true}
                        enableCapsLockWarning={true}
                        state={getPasswordConfirmState(
                          field.value,
                          fieldState.isTouched,
                          fieldState.error?.message,
                          password
                        )}
                        error={fieldState.error?.message}
                        touched={fieldState.isTouched}
                        ariaLabel="Campo de confirmação de senha"
                      />
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  className="w-full"
                  disabled={resetForm.formState.isSubmitting}
                  loading={resetForm.formState.isSubmitting}
                >
                  {resetForm.formState.isSubmitting
                    ? "Alterando..."
                    : "Resetar Senha"}
                </Button>
              </form>
            </Form>

            <div className="flex items-center gap-2 text-[14px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 3.5L2.5 8L6.5 12.5"
                  stroke="#5400D6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link
                href="/auth"
                className="text-[#5400D6] font-medium hover:underline"
              >
                Voltar a tela de login.
              </Link>
            </div>
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#017D5B]/10 flex items-center justify-center mb-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.6667 8L12 22.6667L5.33333 16"
                    stroke="#017D5B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[20px] leading-[28px] font-semibold text-[#272D36] mb-2">
                Sucesso!
              </h1>
              <p className="text-[14px] leading-[20px] text-[#6E7278] max-w-[280px]">
                Sua senha foi redefinida com sucesso!
              </p>
            </div>

            <Button
              onClick={() => (window.location.href = "/auth")}
              variant="success"
              size="lg"
              className="w-full"
              aria-label="Voltar para tela inicial"
            >
              Voltar à Tela Inicial
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative items-center justify-center mb-74">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardContent>{renderStepContent()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
