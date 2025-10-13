"use client";

import { PencilIcon } from "@phosphor-icons/react/ssr";
import { ReactNode } from "react";

interface ContactInfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  onEdit?: () => void;
}

export const ContactInfoItemCard = ({
  icon,
  label,
  value,
}: ContactInfoItemProps) => {
  return (
    <div className="flex items-center justify-between py-2 lg:py-0 mb-4">
      <div className="flex gap-4 lg:gap-3 items-start">
        <div className="w-8 h-8 lg:w-8 lg:h-8 rounded flex items-center justify-center border border-[#E9EAEB]">
          {icon}
        </div>
        <div>
          <p className="text-sm lg:text-sm font-semibold text-[#5400D6]">
            {label}
          </p>
          <p className="text-base lg:text-sm font-normal leading-5 text-[var(--Layout-geral-section-title-small,#272D36)]">
            {value}
          </p>
        </div>
      </div>
      <button
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        tabIndex={0}
        aria-label={`Editar ${label.toLowerCase()}`}
      >
        <PencilIcon size={16} className="text-[#5400D6] lg:w-5 lg:h-5" />
      </button>
    </div>
  );
};
