"use client";

import { cn } from "@/utils/ui";
import { CheckIcon, XIcon } from "@phosphor-icons/react";
import React from "react";

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: PasswordRequirement[] = [
  {
    label: "Letra maiúscula",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: "Caractere especial",
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
  {
    label: "8 caracteres",
    test: (password) => password.length >= 8,
  },
];

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-[12px] leading-[14px] text-[#6E7278]">
        Senha deve conter
      </p>
      <div className="space-y-2">
        {requirements.map((requirement, index) => {
          const isValid = requirement.test(password);
          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center",
                  isValid
                    ? "bg-[#015941] text-white"
                    : "bg-[#D40000] text-white"
                )}
              >
                {isValid ? (
                  <CheckIcon size={10} weight="bold" />
                ) : (
                  <XIcon size={10} weight="bold" />
                )}
              </div>
              <span
                className={cn(
                  "text-[12px] leading-[14px]",
                  isValid ? "text-[#015941]" : "text-[#D40000]"
                )}
              >
                {requirement.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
