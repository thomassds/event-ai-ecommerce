"use client";

import { cn } from "@/utils/ui";
import React from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  ariaLabel?: string;
  direction?: "horizontal" | "vertical";
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onChange,
      label,
      error,
      className,
      disabled = false,
      required = false,
      ariaLabel,
      direction = "vertical",
      ...props
    },
    ref
  ) => {
    const handleChange = (selectedValue: string) => {
      if (!disabled) {
        onChange?.(selectedValue);
      }
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {label && (
          <label className="block text-[14px] leading-[16px] text-[#272D36] mb-3">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div
          role="radiogroup"
          aria-label={ariaLabel || label}
          className={cn(
            "flex gap-4",
            direction === "vertical" ? "flex-col" : "flex-row flex-wrap"
          )}
        >
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex items-center gap-3 cursor-pointer",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="relative">
                <input
                  type="radio"
                  name={ariaLabel || label}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => handleChange(option.value)}
                  disabled={disabled}
                  className="sr-only"
                  aria-label={option.label}
                />
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 transition-all",
                    value === option.value
                      ? "border-primary bg-primary"
                      : "border-[#E9EAEB] bg-white hover:border-primary/50"
                  )}
                >
                  {value === option.value && (
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                </div>
              </div>
              <span className="text-[14px] leading-[16px] text-[#272D36] select-none">
                {option.label}
              </span>
            </label>
          ))}
        </div>

        {error && (
          <p className="mt-2 text-[12px] leading-[14px] text-[#D40000]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
