"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { formatDocument, unformatDocument } from "@/utils/format-document";
import {
  personalDataSchema,
  PersonalDataValues,
} from "@/schemas/auth/register";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { InputForm, RadioGroup } from "../inputs";
import { Select } from "../selectors";
import { Button } from "../buttons";
import { ICreateUser } from "@/interfaces";

// const nationalityOptions = [
//   { value: "Brasileiro", label: "Brasileiro" },
//   { value: "Estrangeiro", label: "Estrangeiro" },
// ];

const typeOfDocumentOptions = [
  { value: "CPF", label: "CPF" },
  { value: "CNPJ", label: "CNPJ" },
  { value: "PASSPORT", label: "Passaporte" },
];

const sexOptions = [
  { value: "M", label: "Masculino" },
  { value: "F", label: "Feminino" },
  { value: "O", label: "Prefiro não responder" },
];

interface PersonalDataFormProps {
  onStepChange: (step: number) => void;
  newUser: ICreateUser | null;
  setNewUser: (data: ICreateUser) => void;
}

export function PersonalDataForm({
  onStepChange,
  setNewUser,
}: PersonalDataFormProps) {
  const [personalData, setPersonalData] = useState<PersonalDataValues | null>(
    null
  );
  const [hasDocumentError, setHasDocumentError] = useState(false);
  const [documentErrorMessage, setDocumentErrorMessage] = useState("");
  const [isVerifyingDocument, setIsVerifyingDocument] = useState(false);

  const form = useForm<PersonalDataValues>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: {
      name: personalData?.name || "",
      nationality: personalData?.nationality || "Brasileiro", // Valor padrão já que o campo está comentado
      document: personalData?.document || "",
      birthDate: personalData?.birthDate || "",
      typeOfDocument: personalData?.typeOfDocument || undefined,
      sex: personalData?.sex || undefined,
    },
  });

  const verifyDocument = async (data: { document: string }) => {
    setIsVerifyingDocument(true);
    console.log("Verifying document:", data.document);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error verifying document:", error);
    } finally {
      setIsVerifyingDocument(false);
    }
  };

  // const { execute: verifyDocument, isPending: isVerifyingDocument } = useAction(
  //   verifyDocumentAction,
  //   {
  //     onSuccess: (result) => {
  //       // The action returns data wrapped in a 'data' property by next-safe-action
  //       if (result?.data?.code === "DOCUMENT_ALREADY_REGISTERED") {
  //         const errorMsg =
  //           result.data.message || "Este documento já está registrado.";
  //         setDocumentErrorMessage(errorMsg);
  //         setHasDocumentError(true);
  //       } else if (result?.data?.code === "DOCUMENT_NOT_REGISTERED") {
  //         // Document is not registered - this is good for signup
  //         setDocumentErrorMessage("");
  //         setHasDocumentError(false);
  //       } else {
  //         // Clear any previous errors for other successful responses
  //         setDocumentErrorMessage("");
  //         setHasDocumentError(false);
  //       }
  //     },
  //     onError: (error) => {
  //       // This will be called when there are network errors or other issues
  //       const errorMessage =
  //         error.error?.serverError || "Erro ao verificar documento";
  //       setDocumentErrorMessage(errorMessage);
  //       setHasDocumentError(true);
  //     },
  //   }
  // );

  const selectedNationality = form.watch("nationality");
  const selectedDocumentType = form.watch("typeOfDocument");

  useEffect(() => {
    if (personalData) {
      form.reset({
        name: personalData.name || "",
        nationality: personalData.nationality || "Brasileiro", // Valor padrão já que o campo está comentado
        document: personalData.document || "",
        birthDate: personalData.birthDate || "",
        typeOfDocument: personalData.typeOfDocument || undefined,
        sex: personalData.sex || undefined,
      });
    }
  }, [personalData, form]);

  // Limpar campo de documento quando o tipo mudar
  useEffect(() => {
    if (selectedDocumentType) {
      form.setValue("document", "");
      // Limpar erros quando trocar o tipo
      setHasDocumentError(false);
      setDocumentErrorMessage("");
    }
  }, [selectedDocumentType, form]);

  const handleDocumentChange = (value: string) => {
    const formatted = formatDocument(value, selectedDocumentType);
    form.setValue("document", formatted);

    // Only clear error if the user is actually typing a different document
    // This prevents clearing the error immediately when showing the error message
    if (hasDocumentError && value.length > 0) {
      setHasDocumentError(false);
      setDocumentErrorMessage("");
    }
  };

  const handleDocumentBlur = () => {
    const documentValue = form.getValues("document");

    // Não verificar passaporte no backend, apenas CPF e CNPJ
    if (selectedDocumentType === "PASSPORT") {
      return;
    }

    const cleanDocument = documentValue.replace(/\D/g, "");

    // Só verificar se o documento tem o tamanho mínimo (CPF: 11 dígitos, CNPJ: 14 dígitos)
    if (selectedDocumentType === "CPF" && cleanDocument.length === 11) {
      verifyDocument({ document: documentValue });
    } else if (selectedDocumentType === "CNPJ" && cleanDocument.length === 14) {
      verifyDocument({ document: documentValue });
    }
  };

  const handleSubmit = (data: PersonalDataValues) => {
    // Prevent submission if there's a document error
    if (hasDocumentError) {
      return;
    }

    setPersonalData(data);

    setNewUser({
      name: data.name,
      taxIdentifier: unformatDocument(data.document),
    });

    onStepChange(2);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputForm
                  {...field}
                  label="Nome completo *"
                  placeholder="Digite seu nome completo"
                  ariaLabel="Campo de nome completo"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  options={nationalityOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione a sua nacionalidade"
                  label="Nacionalidade"
                  ariaLabel="Nacionalidade"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        /> */}

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
          <FormField
            control={form.control}
            name="typeOfDocument"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    options={typeOfDocumentOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Selecione o tipo"
                    label="Tipo de documento"
                    ariaLabel="Tipo de documento"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputForm
                    disabled={!selectedDocumentType}
                    {...field}
                    type="text"
                    label="Documento (obrigatório)"
                    placeholder={
                      selectedDocumentType === "CPF"
                        ? "000.000.000-00"
                        : selectedDocumentType === "CNPJ"
                        ? "00.000.000/0000-00"
                        : "Digite o número do passaporte"
                    }
                    ariaLabel={`Número do ${
                      selectedDocumentType || "documento"
                    }`}
                    onChange={(e) => handleDocumentChange(e.target.value)}
                    onBlur={handleDocumentBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Exibição de erro customizado para documento */}
        {hasDocumentError && documentErrorMessage && (
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
                  {documentErrorMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedNationality === "Estrangeiro" && (
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputForm
                    {...field}
                    type="text"
                    label="Passaporte (obrigatório)"
                    placeholder="Digite o número do seu passaporte"
                    ariaLabel="Número do passaporte"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputForm
                  {...field}
                  type="date"
                  label="Data de Nascimento *"
                  placeholder="DD/MM/AAAA"
                  ariaLabel="Data de nascimento"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sex"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  options={sexOptions}
                  value={field.value}
                  onChange={field.onChange}
                  label="Gênero *"
                  error={fieldState.error?.message}
                  ariaLabel="Seleção de gênero"
                  direction="vertical"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={
            !form.formState.isValid || hasDocumentError || isVerifyingDocument
          }
          type="submit"
          className="w-full bg-[#015941] hover:bg-[#014A37] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifyingDocument ? "Verificando documento..." : "Próxima Etapa"}
        </Button>
      </form>
    </Form>
  );
}
