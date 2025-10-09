import { cn } from "@/utils/ui";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { iconLeft, iconRight, className, ...props },
  ref
) {
  const hasIcons = iconLeft || iconRight;

  if (!hasIcons) {
    return (
      <input
        ref={ref}
        {...props}
        className={cn(
          "w-full p-4 rounded-lg border border-[#E9EAEB]",
          "focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1",
          className
        )}
      />
    );
  }

  return (
    <div className="relative w-full">
      <input
        ref={ref}
        {...props}
        className={cn(
          "w-full p-4 rounded-lg border border-[#E9EAEB]",
          "focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1",
          iconLeft ? "pl-12" : "",
          iconRight ? "pr-12" : "",
          className
        )}
      />
      {iconLeft && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {iconLeft}
        </div>
      )}
      {iconRight && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {iconRight}
        </div>
      )}
    </div>
  );
});
