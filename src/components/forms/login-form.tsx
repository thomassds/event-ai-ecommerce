"use client";

import Link from "next/link";
import { Button } from "../buttons";
import { Card, CardContent, CardHeader } from "../cards";
import { Form, FormField } from "./form";
import { InputForm, InputFormState, MaskedInput } from "../inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { detectInputType, LoginFormValues, loginSchema } from "@/schemas";
import { useState } from "react";

export const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { isDirty },
  } = form;

  const username = watch("username");
  const detectedType = username ? detectInputType(username) : "email";

  const getState = (
    error?: string,
    touched?: boolean,
    value?: string
  ): InputFormState => {
    if (!touched && !isDirty) return "default";
    if (error) {
      if (error.toLowerCase().includes("obrigatório")) return "error";
      if (
        error.toLowerCase().includes("válido") ||
        error.toLowerCase().includes("mínimo")
      )
        return "warning";
      return "default";
    }

    if (value && !error) return "success";
    return "default";
  };

  return (
    <Card className="not-lg:max-w-md lg:min-w-192">
      <CardHeader>
        <div className="flex flex-col items-start ">
          <h1
            className="text-[14px] leading-[16px] font-normal text-[#272D36]"
            id="login-title"
          >
            Bem vindo a Ingressos Web
          </h1>
          <h2
            className="text-[20px] leading-[28px] font-semibold text-primary"
            id="login-subtitle"
          >
            Faça Login na Sua Conta
          </h2>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <Form {...form}>
            <form
              onSubmit={() => {}}
              className="flex flex-col gap-6"
              aria-labelledby="login-title login-subtitle"
              noValidate
            >
              <FormField
                control={control}
                name="username"
                render={({ field, fieldState }) => {
                  // Só aplica máscara se detectar formatação específica
                  if (detectedType === "phone") {
                    return (
                      <MaskedInput
                        {...field}
                        label="E-mail, Telefone ou CPF"
                        placeholder="Digite seu e-mail, telefone ou CPF"
                        mask="phone"
                        state={getState(
                          fieldState.error?.message,
                          fieldState.isTouched,
                          field.value
                        )}
                        error={fieldState.error?.message}
                        enableCapsLockWarning={false}
                        description="Digite seu e-mail, telefone ou CPF para fazer login"
                        ariaLabel="Campo de e-mail, telefone ou CPF"
                      />
                    );
                  }

                  if (detectedType === "cpf") {
                    return (
                      <MaskedInput
                        {...field}
                        label="E-mail, Telefone ou CPF"
                        placeholder="Digite seu e-mail, telefone ou CPF"
                        mask="cpf"
                        state={getState(
                          fieldState.error?.message,
                          fieldState.isTouched,
                          field.value
                        )}
                        error={fieldState.error?.message}
                        enableCapsLockWarning={false}
                        description="Digite seu e-mail, telefone ou CPF para fazer login"
                        ariaLabel="Campo de e-mail, telefone ou CPF"
                      />
                    );
                  }

                  // Para tudo mais, input livre sem máscara
                  return (
                    <InputForm
                      {...field}
                      label="E-mail, Telefone ou CPF"
                      placeholder="Digite seu e-mail, telefone ou CPF"
                      state={getState(
                        fieldState.error?.message,
                        fieldState.isTouched,
                        field.value
                      )}
                      error={fieldState.error?.message}
                      showPlaceholder={true}
                      enableCapsLockWarning={true}
                      touched={fieldState.isTouched}
                      description="Digite seu e-mail, telefone ou CPF para fazer login"
                      ariaLabel="Campo de e-mail, telefone ou CPF"
                    />
                  );
                }}
              />
              <FormField
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <>
                    <InputForm
                      {...field}
                      label="Senha"
                      placeholder="Digite sua senha"
                      state={getState(
                        fieldState.error?.message,
                        fieldState.isTouched,
                        field.value
                      )}
                      type="password"
                      showEyeIcon={true}
                      enableCapsLockWarning={true}
                      error={fieldState.error?.message}
                      showPlaceholder={true}
                      touched={fieldState.isTouched}
                      description="Digite sua senha para acessar sua conta"
                      ariaLabel="Campo de senha"
                    />
                    <div className="flex flex-wrap items-center gap-4 justify-between mt-4">
                      <label className="flex items-center gap-2 text-[14px] leading-[16px] text-[#272D36] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={() => setRememberMe((v) => !v)}
                          className="w-4 h-4 rounded border border-[#C1C5CC] accent-[#017D5B] focus:ring-2 focus:ring-primary"
                          aria-label="Lembrar-me"
                        />
                        Lembrar-me
                      </label>
                      <Link
                        href="/esqueci-a-senha"
                        className="text-[14px] leading-[16px] text-[#5400D6] font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary"
                        tabIndex={0}
                        aria-label="Esqueceu a senha?"
                      >
                        Esqueceu a senha?
                      </Link>
                    </div>
                  </>
                )}
              />

              {error && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="!bg-[#017D5B] w-full h-12 px-4 py-4 rounded-lg text-white font-semibold text-base leading-6 transition-colors duration-200"
                disabled={isPending}
                aria-busy={isPending}
              >
                {isPending ? "Verificando..." : "Fazer Login"}
              </Button>
            </form>
          </Form>
          {/* <div className="flex flex-col gap-6">
            <p
              className="text-base leading-6 font-normal font-sans text-[#272D36] mb-0"
              id="social-login-title"
            >
              Ou faça login com:
            </p>
            <div
              className="flex gap-4 w-full items-center justify-center"
              role="group"
              aria-labelledby="social-login-title"
            >
              <button
                className="cursor-pointer flex items-center justify-center w-1/3 h-12 rounded bg-white border border-gray-200 shadow hover:bg-gray-50"
                onClick={() => handleSocialLogin("google")}
                disabled={!!isSocialLoading}
                aria-label="Login com Google"
                aria-busy={isSocialLoading === "google"}
              >
                <GoogleIcon width={24} height={24} aria-hidden="true" />
              </button>
              <button
                className="flex items-center justify-center w-full h-12 rounded bg-white border border-gray-200 shadow hover:bg-gray-50"
                onClick={() => handleSocialLogin("facebook")}
                disabled={!!isSocialLoading}
                aria-label="Login com Facebook"
                aria-busy={isSocialLoading === "facebook"}
              >
                <FacebookIcon
                  width={24}
                  height={24}
                  className="text-[#1877F3]"
                  aria-hidden="true"
                />
              </button>
              <button
                className="flex items-center justify-center w-full h-12 rounded bg-white border border-gray-200 shadow hover:bg-gray-50"
                onClick={() => handleSocialLogin("apple")}
                disabled={!!isSocialLoading}
                aria-label="Login com Apple"
                aria-busy={isSocialLoading === "apple"}
              >
                <AppleIcon
                  width={24}
                  height={24}
                  className="text-black"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div> */}

          <div className="text-sm text-[#272D36] font-normal">
            Não possui uma conta?{" "}
            <Link
              href="/registrar"
              className="text-primary font-medium underline hover:no-underline"
              aria-label="Ir para página de cadastro"
            >
              Cadastre-se.
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
