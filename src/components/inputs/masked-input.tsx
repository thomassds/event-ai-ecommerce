"use client";

import React, { useState, useRef } from "react";
import {
  WarningOctagonIcon,
  CheckCircleIcon,
  WarningIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@phosphor-icons/react";
import { cn } from "@/utils/ui";
import { InputFormState } from "./input";

interface MaskedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  state?: InputFormState;
  iconRight?: React.ReactNode;
  error?: string;
  enableCapsLockWarning?: boolean;
  label?: string;
  showEyeIcon?: boolean;
  description?: string;
  ariaLabel?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  mask?: "cpf" | "cnpj" | "phone" | "cep";
}

const stateClasses: Record<InputFormState, string> = {
  default: "border border-[#E9EAEB]",
  success: "border-2 border-[#015941]",
  warning: "border-2 border-[#674F00]",
  error: "border-2 border-[#D40000]",
};

const messageColor: Record<InputFormState, string> = {
  default: "text-[#015941]",
  success: "text-[#015941]",
  warning: "text-[#674F00]",
  error: "text-[#D40000]",
};

function getMessageIcon(error?: string, state?: InputFormState) {
  if (!error && state === "success")
    return (
      <CheckCircleIcon
        size={16}
        weight="regular"
        className="text-[#015941] flex-shrink-0"
      />
    );
  if (error && state === "error")
    return (
      <WarningIcon
        size={16}
        weight="regular"
        className="text-[#D40000] flex-shrink-0"
      />
    );
  if (error && state === "warning")
    return (
      <WarningOctagonIcon
        size={16}
        weight="regular"
        className="text-[#674F00] flex-shrink-0"
      />
    );
  return null;
}

const applyMask = (value: string, mask?: string): string => {
  if (!mask || !value) return value;

  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, "");

  switch (mask) {
    case "cpf":
      // CPF: XXX.XXX.XXX-XX
      if (numbers.length <= 11) {
        return numbers
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      }
      return numbers
        .substring(0, 11)
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    case "cnpj":
      // CNPJ: XX.XXX.XXX/XXXX-XX
      if (numbers.length <= 14) {
        return numbers
          .replace(/(\d{2})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1/$2")
          .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
      }
      return numbers
        .substring(0, 14)
        .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

    case "phone":
      // Phone: (XX) X XXXX-XXXX
      if (numbers.length <= 11) {
        return numbers
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{1})(\d{4})(\d)/, "$1 $2-$3")
          .replace(/(-\d{4})\d+?$/, "$1");
      }
      return numbers
        .substring(0, 11)
        .replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");

    case "cep":
      // CEP: XXXX-XXX
      if (numbers.length <= 8) {
        return numbers.replace(/(\d{5})(\d{3})$/, "$1-$2");
      }
      return numbers.substring(0, 8).replace(/(\d{5})(\d{3})/, "$1-$2");

    default:
      return value;
  }
};

export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  (
    {
      state = "default",
      iconRight,
      className,
      error,
      enableCapsLockWarning = false,
      label,
      showEyeIcon = false,
      type,
      description,
      ariaLabel,
      onChange,
      value,
      mask,
      ...props
    },
    ref
  ) => {
    const [showValue, setShowValue] = useState(false);
    const [capsLock, setCapsLock] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputType = showEyeIcon ? (showValue ? "text" : type) : type;
    const inputId = props.id;
    const descriptionId = inputId ? `${inputId}-description` : undefined;
    const messageId = inputId ? `${inputId}-message` : undefined;
    const capsLockId = inputId ? `${inputId}-capslock` : undefined;

    const handleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.getModifierState) {
        setCapsLock(e.getModifierState("CapsLock"));
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const maskedValue = applyMask(rawValue, mask);

      // Create a new event with the masked value
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: maskedValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      if (onChange) {
        onChange(syntheticEvent);
      }
    };

    return (
      <div
        className={cn("flex flex-col w-full", className)}
        style={{ gap: 12 }}
      >
        <div className="flex flex-wrap justify-between gap-2">
          {label && (
            <label
              className="text-[14px] leading-[16px] text-[#272D36]"
              htmlFor={inputId}
            >
              {label}
            </label>
          )}
          {enableCapsLockWarning && capsLock && (
            <div
              className="flex items-center gap-1 font-semibold text-[14px] leading-[16px] text-[#674F00]"
              id={capsLockId}
              role="alert"
              aria-live="polite"
            >
              <WarningOctagonIcon
                size={16}
                weight="regular"
                className="text-[#674F00] flex-shrink-0"
                aria-hidden="true"
              />
              <span>Caps Lock está ativado</span>
            </div>
          )}
        </div>

        <div className="relative">
          <input
            ref={ref || inputRef}
            id={inputId}
            type={inputType}
            value={value || ""}
            onChange={handleChange}
            onKeyUp={handleKeyEvent}
            onKeyDown={handleKeyEvent}
            className={cn(
              "w-full h-[48px] rounded-[8px] border px-4 py-3 text-[14px] leading-[16px] text-[#272D36] placeholder-[#6E7278] placeholder:text-[14px] placeholder:leading-[16px] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
              stateClasses[state],
              className
            )}
            aria-describedby={
              [
                description && descriptionId ? descriptionId : "",
                error && messageId ? messageId : "",
                enableCapsLockWarning && capsLock && capsLockId
                  ? capsLockId
                  : "",
              ]
                .filter(Boolean)
                .join(" ") || undefined
            }
            aria-label={ariaLabel}
            {...props}
          />

          {showEyeIcon && (
            <button
              type="button"
              onClick={() => setShowValue(!showValue)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6E7278] hover:text-[#272D36] transition-colors"
              aria-label={showValue ? "Ocultar senha" : "Mostrar senha"}
            >
              {showValue ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          )}

          {iconRight && !showEyeIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {iconRight}
            </div>
          )}
        </div>

        {description && (
          <p
            className="text-[12px] leading-[14px] text-[#6E7278]"
            id={descriptionId}
          >
            {description}
          </p>
        )}

        {error && (
          <div
            className={cn(
              "flex items-start gap-2 text-[12px] leading-[14px]",
              messageColor[state]
            )}
            id={messageId}
          >
            {getMessageIcon(error, state)}
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

MaskedInput.displayName = "MaskedInput";
