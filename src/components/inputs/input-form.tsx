"use client";
import React, { useState, forwardRef, useId } from "react";
import {
  WarningOctagonIcon,
  CheckCircleIcon,
  WarningIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@phosphor-icons/react";
import { useFormField } from "../forms";
import { cn } from "@/utils/ui";
import { InputFormState } from "./input";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: InputFormState;
  iconRight?: React.ReactNode;
  error?: string;
  enableCapsLockWarning?: boolean;
  label?: string;
  showEyeIcon?: boolean;
  showPlaceholder?: boolean;
  touched?: boolean;
  description?: string;
  ariaLabel?: string;
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

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  (
    {
      state = "default",
      iconRight,
      className,
      error,
      enableCapsLockWarning = false,
      label,
      showEyeIcon = false,
      showPlaceholder = true,
      type,
      touched = false,
      description,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const formField = useFormField?.() || null;
    const [showValue, setShowValue] = useState(false);
    const [capsLock, setCapsLock] = useState(false);
    const [wasBlurred, setWasBlurred] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const reactId = useId();
    const inputType = showEyeIcon ? (showValue ? "text" : type) : type;
    const inputId = formField?.formItemId || props.id || `input-${reactId}`;
    const descriptionId = `${inputId}-description`;
    const messageId = `${inputId}-message`;
    const capsLockId = `${inputId}-capslock`;

    const handleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.getModifierState) {
        setCapsLock(e.getModifierState("CapsLock"));
      }
    };

    return (
      <div className={cn("flex flex-col w-full", className)} style={{ gap: 6 }}>
        <div className="flex flex-wrap justify-between gap-2">
          {label ? (
            <label className="text-[14px] text-[#272D36]" htmlFor={inputId}>
              {label}
            </label>
          ) : (
            <div className="h-[16px]"></div>
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
            {...props}
            ref={ref}
            onKeyUp={handleKeyEvent}
            onKeyDown={handleKeyEvent}
            onFocus={() => setCapsLock(false)}
            onBlur={(e) => {
              setCapsLock(false);
              setWasBlurred(true);
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setIsDirty(true);
              props.onChange?.(e);
            }}
            id={inputId}
            aria-describedby={
              [
                description && descriptionId,
                error && messageId,
                capsLock && capsLockId,
              ]
                .filter(Boolean)
                .join(" ") || undefined
            }
            aria-invalid={!!error}
            aria-label={ariaLabel || label}
            type={inputType}
            placeholder={showPlaceholder ? props.placeholder : ""}
            className={cn(
              "w-full h-[48px] rounded-[8px] bg-white px-4 py-3 text-[14px] leading-[16px] text-[#272D36] placeholder-[#6E7278] placeholder:text-[14px] placeholder:leading-[16px] border transition-all",
              stateClasses[state],
              className
            )}
          />
          {showEyeIcon && (
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-0 m-0 bg-transparent border-none cursor-pointer"
              style={{ color: "#5400D6" }}
              onClick={() => setShowValue((v) => !v)}
              aria-label={showValue ? "Ocultar valor" : "Mostrar valor"}
              aria-pressed={showValue}
            >
              {showValue ? (
                <EyeIcon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <EyeSlashIcon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          )}
          {!showEyeIcon && iconRight && (
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            >
              {iconRight}
            </span>
          )}
        </div>

        {(touched || wasBlurred || isDirty) && error && (
          <div
            id={messageId}
            role="alert"
            aria-live="polite"
            className={cn(
              "flex items-start gap-1 font-semibold text-[14px] leading-[16px]",
              messageColor[state]
            )}
          >
            {getMessageIcon(error, state)}
            <span>{error}</span>
          </div>
        )}

        {!error && state === "success" && (wasBlurred || isDirty) && (
          <div
            id={messageId}
            role="alert"
            aria-live="polite"
            className={cn(
              "flex items-start gap-1 font-semibold text-[14px] leading-[16px]",
              messageColor["success"]
            )}
          >
            {getMessageIcon(undefined, "success")}
            <span>Tudo certo!</span>
          </div>
        )}
      </div>
    );
  }
);

InputForm.displayName = "InputForm";
