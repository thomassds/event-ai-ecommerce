"use client";

import { cn } from "@/utils/ui";
import { CaretDownIcon } from "@phosphor-icons/react";
import React, { useState, useRef, useEffect } from "react";

export type SelectState = "default" | "success" | "warning" | "error";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: readonly SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  state?: SelectState;
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  ariaLabel?: string;
}

const stateClasses: Record<SelectState, string> = {
  default: "border border-[#E9EAEB]",
  success: "border-2 border-[#015941]",
  warning: "border-2 border-[#674F00]",
  error: "border-2 border-[#D40000]",
};

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Selecione uma opção",
      label,
      state = "default",
      error,
      className,
      disabled = false,
      required = false,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (selectedValue: string) => {
      onChange?.(selectedValue);
      setIsOpen(false);
      setFocusedIndex(-1);
      setTimeout(() => {
        selectRef.current?.focus();
      }, 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (isOpen && focusedIndex >= 0) {
            handleSelect(options[focusedIndex].value);
          } else {
            setIsOpen(!isOpen);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex((prev) =>
              prev < options.length - 1 ? prev + 1 : 0
            );
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (isOpen) {
            setFocusedIndex((prev) =>
              prev > 0 ? prev - 1 : options.length - 1
            );
          }
          break;
        case "Escape":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case "Tab":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    };

    useEffect(() => {
      if (!isOpen) {
        setFocusedIndex(-1);
      }
    }, [isOpen]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const selectElement = selectRef.current;
        const listElement = listRef.current;
        const target = event.target as Node;

        if (
          selectElement &&
          listElement &&
          !selectElement.contains(target) &&
          !listElement.contains(target)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    return (
      <div
        className={cn(
          label ? "flex flex-col w-full" : "relative w-full",
          className
        )}
        style={label ? { gap: 3 } : undefined}
      >
        <div className="flex items-start">
          {label ? (
            <label className="text-[14px] text-[#272D36]">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          ) : (
            <div className="h-[16px]"></div>
          )}
        </div>

        <div className={label ? "relative" : ""}>
          <button
            ref={ref || selectRef}
            type="button"
            className={cn(
              "w-full h-[48px] px-4 py-3 text-left bg-white rounded-[8px] flex items-center justify-between",
              "text-[14px] leading-[16px] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
              stateClasses[state],
              disabled && "opacity-50 cursor-not-allowed",
              !selectedOption && "text-[#6E7278]"
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label={ariaLabel || label}
            disabled={disabled}
            {...props}
          >
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <CaretDownIcon
              size={16}
              className={cn(
                "transition-transform text-[#6E7278]",
                isOpen && "rotate-180"
              )}
            />
          </button>

          {isOpen && (
            <ul
              ref={listRef}
              className="absolute z-50 w-full mt-1 bg-white border border-[#E9EAEB] rounded-[8px] shadow-lg max-h-60 overflow-auto"
              role="listbox"
              aria-label={ariaLabel || label}
            >
              {options.map((option, index) => (
                <li
                  key={option.value}
                  className={cn(
                    "px-4 py-3 text-[14px] leading-[16px] text-[#272D36] cursor-pointer hover:bg-[#F5F5F5] transition-colors",
                    index === focusedIndex && "bg-[#F5F5F5]",
                    value === option.value &&
                      "bg-primary/10 text-primary font-medium"
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(option.value);
                  }}
                  role="option"
                  aria-selected={value === option.value}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {error && (
          <p className="text-[12px] leading-[14px] text-[#D40000]">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
