"use client";

import { cn } from "@/utils/ui";
import { OTPInput, SlotProps } from "input-otp";

interface OTPInputProps {
  maxLength?: number;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export function OTPInputComponent({
  maxLength = 4,
  value,
  onChange,
  error,
}: OTPInputProps) {
  return (
    <div className="space-y-4">
      <OTPInput
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        containerClassName="group flex items-center justify-center gap-3 has-[:disabled]:opacity-30"
        render={({ slots }) => (
          <>
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} hasError={!!error} />
            ))}
          </>
        )}
      />
      {error && <p className="text-[12px] text-[#D40000] mt-2">{error}</p>}
    </div>
  );
}

function Slot(props: SlotProps & { hasError?: boolean }) {
  return (
    <div
      className={cn(
        "relative w-20 h-20 text-[28px] font-semibold",
        "flex items-center justify-center",
        "transition-all duration-300",
        "border-2 rounded-[12px] bg-white",
        "border-[#E9EAEB]",
        "group-hover:border-[#017D5B]/50",
        "group-focus-within:border-[#017D5B]",
        "outline outline-0 outline-[#017D5B]/20",
        {
          "border-[#D40000]": props.hasError,
          "outline-4 outline-[#017D5B] border-[#017D5B]": props.isActive,
        }
      )}
    >
      <div className="group-has-[input[data-input-otp-placeholder-shown]]:opacity-20">
        {props.char ?? props.placeholderChar}
      </div>
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink z-10">
      <div className="w-px h-8 bg-[#272D36]" />
    </div>
  );
}
