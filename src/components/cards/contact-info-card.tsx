"use client";
import {
  EnvelopeIcon,
  IdentificationCardIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { ContactInfoItemCard } from "./contact-info-item-card";
import { useState } from "react";

export const ContactInfoCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="bg-white rounded-lg p-4 lg:p-3 lg:border-b lg:border-gray-200 lg:rounded-none">
      <h2 className="text-xl lg:text-lg font-semibold text-[#5400D6] mb-6 lg:mb-4">
        Informações de Contato
      </h2>
      {isLoading ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ) : (
        <div className="space-y-4 lg:space-y-3">
          <ContactInfoItemCard
            icon={
              <EnvelopeIcon className="text-[#5400D6] w-5 h-5 lg:w-5 lg:h-5" />
            }
            label="Email"
            value={"teste@teste.com.br"}
          />
          <ContactInfoItemCard
            icon={
              <WhatsappLogoIcon className="text-[#5400D6] w-5 h-5 lg:w-5 lg:h-5" />
            }
            label="Telefone"
            value={"(00) 0 0000-0000"} // displayData.phone
          />
          <ContactInfoItemCard
            icon={
              <IdentificationCardIcon className="text-[#5400D6] w-5 h-5 lg:w-5 lg:h-5" />
            }
            label="Documento"
            value={
              // displayData.document.includes("Não informado")
              // ? "CPF: Não informado"
              // : `CPF: ${displayData.document}`
              "CPF: 000.000.000-00"
            }
          />
        </div>
      )}
    </div>
  );
};
